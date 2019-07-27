'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import Mapbox, { MapView } from 'react-native-mapbox-gl';
import SpinnerCustom from '../../../components/common/Spinner/spinner';
import Picker from 'react-native-picker';

import Header from '../../../components/common/Header/header';
import HeaderAdd from '../../../components/common/HeaderAdd/headerAdd';
import NavigationBar from '../../../components/common/NavigationBar/navigationBar';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalSession from '../../../components/common/ModalWarning/modalSession';
import ModalReload from '../../../components/common/ModalReload/modalReload';
import ModalInfoCross from '../../../components/common/ModalInfo/modalInfoCross';
import ModalInfoSidewalk from '../../../components/common/ModalInfo/modalInfoSidewalk';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';


import API from '../../../API/ApiComm';

import styles from './styles';
import SIStyles from './selectImageStyles.js';
import FOStyles from './formStyles.js';

var show = 0;

var categories = ['Cruce', 'Vereda']

var asdf_props = [
  {label: '', value: 1 },
  {label: '', value: 0 },
];

Mapbox.setAccessToken(global.accessToken);

var options = {}

var ctgr = 'Seleccionar...';

var savedValues = []
var savedValuesCross = []
var savedValuesStart = []
var evaluationsArray = []

var image  = 'image_default';

class Description extends Component {

  constructor(props) {
    super(props);

    this.state = {
      category: ''
    };
  }

  componentDidMount() {
    if (options.vcr_tipo != null) {
          this.setState({
            category: categories[options.vcr_tipo]
          })
    }
  }

  _showCategoriesPicker() {
    let data = categories;

    Keyboard.dismiss();

    Picker.init({
      pickerData: data,
      onPickerConfirm: pickedValue => {
          var category = pickedValue.toString();
          ctgr = pickedValue.toString();
          this.setState({ category: category });
          if(category == 'Vereda'){
            options.vcr_tipo = 1;
          } else {
            options.vcr_tipo = 2;
          }
          evaluationsArray = []
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Categoría',
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Cancelar'
    });

    Picker.show()
  }

  render() {
    return(
        <KeyboardAwareScrollView style={styles.content}>

          <Text style={styles.title}>Datos principales</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Nombre:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' defaultValue={options.pev_ttl} style={styles.inputForm} onChangeText={(value) => {options.pev_ttl = value}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup3}>
            <Text style={styles.textForm}>Categoría:</Text>
            <View>
             {!this.props.isEditing && <TextInput value={this.state.category} onFocus={this._showCategoriesPicker.bind(this)} placeholder={"Seleccionar"} style={styles.picker}></TextInput>}
             {this.props.isEditing && <Text style={styles.textForm2}>{options.vcr_cat_text}</Text>}
            </View>
          </View>

          <View style={[SIStyles.formGroup2, {marginTop: 20}]}>
            <Text style={{color: '#979797', fontWeight: '700', marginBottom: 10}}>Descripción del lugar:</Text>
            <View style={SIStyles.contentInput}>
              <TextInput underlineColorAndroid='transparent' defaultValue={options.vcr_desc} maxLength={150} style={SIStyles.textArea} multiline={true} onChangeText={(value) => {options.vcr_desc = value}}></TextInput>
            </View>
          </View>

        </KeyboardAwareScrollView>
      );
  }
}

class AccesibilitySidewalk extends Component {

  constructor(props) {
    super(props);

    this.state = {
      update: [],
      center: {
        latitude: global.latitude,
        longitude: global.longitude
      },
      zoom: 20,
      annotation: [{
        id: 'Marker',
        coordinates: [global.latitude, global.longitude],
        type: 'point'
      }]
    }
  }

  componentDidMount() {
    if (evaluationsArray.length == 0) {
      this._getSidewalkAlternatives()
    }
    else {
      this.setState({ update: savedValues, evaluationsSidewalk: evaluationsArray });
    }
  }

  _getSidewalkAlternatives() {
        this.setState({ visible: true });
        var evaluationArray = []
        API.getEvaluationAlternativesBySidewalk().then(json => {
        console.log("sidewalk", json)
        var k = json.data

        if (k.length > 0) {

            for (var i = 0; i < k.length; i++) {

            var title = String(k[i].iev_des);
            var vie = k[i].vie;

            var isOptional = false
            if (title.toUpperCase().includes("OPCIONAL")) {
              savedValues[i] = "optional"
              isOptional = true
            }
            else {
              savedValues[i] = null
            }

            if(this.props.isEditingEvaluation) {
              var selectEval = (isOptional) ? "optional" : null
              for(var e = 0; e < options.evaluation.vae.length; e++) {
                var evalId = options.evaluation.vae[e].vie_id
                for (var viewIndex = 0; viewIndex < vie.length; viewIndex++) {
                  if (evalId == vie[viewIndex].vie_id) {
                    selectEval = evalId
                  }
                }
              }
              savedValues[i] = selectEval
            }

            evaluationArray.push(
              {
                title: title,
                opts: vie
              }
            )
          }
          savedValuesStart = savedValues
          evaluationsArray = evaluationArray
          this.setState({ visible: false, update: savedValues, evaluationsSidewalk: evaluationArray })
        }

      }).catch(error => {
        this.setState({ visible: false });
        console.log(error);
      });
  }

  _setValue(value, index) {
    var realIndex = Math.floor(index)
    var newUpdate = savedValues.slice(0)
    newUpdate[realIndex] = value 

    this.setState({
      update: newUpdate
    })
    
    savedValues = newUpdate
  }

  renderEvaluations() {
    if (this.state.evaluationsSidewalk && this.state.evaluationsSidewalk.length > 0) {
      return this.state.evaluationsSidewalk.map((data, i) => {
        return(
          <View key={i} style={FOStyles.formContainer}>
            <View style={FOStyles.textContainer}><Text key={i}>{data.title}</Text></View>
            <View style={FOStyles.inputContainer}>{ this.renderAlternatives(data.opts, i) }</View>
          </View>
        )
      })
    }
    else {
      return <View />
    }
  }

  renderAlternatives(opts, index) {
    return opts.map((data, i) => {
      return(
          <RadioForm key={i} formHorizontal={false} animation={true}>
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={data.vie_id}
                index={i}
                buttonSize={17}
                buttonInnerColor={(opts[i].vie_id == savedValues[index]) ? '#7F7F7F' : '#FFFFFF'}
                buttonOuterColor={'#7F7F7F'}
                isSelected={true}
                onPress={() => this._setValue(data.vie_id, index)}
              />
            </RadioButton>
          </RadioForm>
      )
    })
  }

  render() {
    return(
        <ScrollView style={styles.content}>
          <SpinnerCustom visible={this.state.visible}/>
          <View style={styles.mapView}>
            <MapView
              ref={map => { this._map = map; }}
              style={styles.map}
              initialCenterCoordinate={this.state.center}
              initialZoomLevel={this.state.zoom}
              initialDirection={0}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              showsUserLocation={false}
              annotations={this.state.annotation}
              styleURL={Mapbox.mapStyles.streets}
              />
          </View>

          <View style={styles.containerTitle}>
              <Text style={[styles.title]}>Evaluación accesibilidad</Text>
              <TouchableOpacity onPress={this.props.info}>
                <Icon name="info-circle" size={25} color="#000000"/>
              </TouchableOpacity>
          </View>

          <View style={styles.alternatives}>
            <View style={styles.containerConfirmation}>
              <Text>No</Text>
              <Text>Si</Text>
            </View>
          </View>

          {
            this.renderEvaluations()
          }

        </ScrollView>
      );
  }
}

class AccesibilityCross extends Component {

  constructor(props) {
    super(props);

    this.state = {
      update: [],
      center: {
        latitude: global.latitude,
        longitude: global.longitude
      },
      zoom: 20,
      annotation: [{
        id: 'Marker',
        coordinates: [global.latitude, global.longitude],
        type: 'point'
      }]
    }
  }

  componentWillMount() {
    if (evaluationsArray.length == 0) {
      this._getCrossAlternatives()
    }
    else {
      this.setState({ update: savedValues, evaluationsCross: evaluationsArray });
    }
  }

  _getCrossAlternatives() {
    this.setState({ visible: true });
    API.getEvaluationAlternativesByCross().then(json => {
        var evaluationArray = []
        var k = json.data

        if (k.length > 0) {

          for (var i = 0; i < k.length; i++) {

            var title = String(k[i].iev_des);
            var vie = k[i].vie;

            var isOptional = false
            if (title.toUpperCase().includes("OPCIONAL")) {
              savedValues[i] = "optional"
              isOptional = true
            }
            else {
              savedValues[i] = null
            }

            if(this.props.isEditingEvaluation) {
              var selectEval = (isOptional) ? "optional" : null
              for(var e = 0; e < options.evaluation.vae.length; e++) {
                var evalId = options.evaluation.vae[e].vie_id
                for (var viewIndex = 0; viewIndex < vie.length; viewIndex++) {
                  if (evalId == vie[viewIndex].vie_id) {
                    selectEval = evalId
                  }
                }
              }
              savedValues[i] = selectEval
            }

            evaluationArray.push(
              {
                title: title,
                opts: vie
              }
            )
          }
        }
        savedValuesStart = savedValues
        evaluationsArray = evaluationArray
        this.setState({ visible: false, update: savedValues, evaluationsCross: evaluationArray });

      }).catch(error => {
        this.setState({ visible: false });
        console.log(error);
      });
  }

  _setValue(value, index) {
    var realIndex = Math.floor(index)
    var newUpdate = savedValues.slice(0)
    newUpdate[realIndex] = value 

    this.setState({
      update: newUpdate
    })
    
    savedValues = newUpdate
  }

  updateSelected(savedValues) {
    this.setState({ update: savedValues})
  }

  renderEvaluations() {
    if (this.state.evaluationsCross && this.state.evaluationsCross.length > 0) {
      return this.state.evaluationsCross.map((data, i) => {
        return(
          <View key={i} style={FOStyles.formContainer}>
            <View style={FOStyles.textContainer}><Text key={i}>{data.title}</Text></View>
            <View style={FOStyles.inputContainer}>{ this.renderAlternatives(data.opts, i) }</View>
          </View>
        )
      })
    }
    else {
      return <View />
    }
  }

  renderAlternatives(opts, index) {
    return opts.map((data, i) => {
      return(
          <RadioForm key={i} formHorizontal={false} animation={true}>
            <RadioButton labelHorizontal={true} key={i}>
              <RadioButtonInput
                obj={data.vie_id}
                index={i}
                buttonSize={17}
                buttonInnerColor={(opts[i].vie_id == savedValues[index]) ? '#7F7F7F' : '#FFFFFF'}
                buttonOuterColor={'#7F7F7F'}
                isSelected={true}
                onPress={() => this._setValue(data.vie_id, index)}
              />
            </RadioButton>
          </RadioForm>
      )
    })
  }

  render() {
    return(
        <ScrollView style={styles.content}>
          <SpinnerCustom visible={this.state.visible}/>
          <View style={styles.mapView}>
            <MapView
              ref={map => { this._map = map; }}
              style={styles.map}
              initialCenterCoordinate={this.state.center}
              initialZoomLevel={this.state.zoom}
              initialDirection={0}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              showsUserLocation={false}
              annotations={this.state.annotation}
              styleURL={Mapbox.mapStyles.streets}
              />
          </View>

          <View style={styles.containerTitle}>
              <Text style={[styles.title]}>Evaluación accesibilidad</Text>
              <TouchableOpacity onPress={this.props.info}>
                <Icon name="info-circle" size={25} color="#000000"/>
              </TouchableOpacity>
          </View>

          <View style={styles.alternatives}>
            <View style={styles.containerConfirmation}>
              <Text>No</Text>
              <Text>Sí</Text>
            </View>
          </View>

          {
            this.renderEvaluations()
          }

        </ScrollView>
      );
  }
}

class SelectImage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: options.ima_img
    }
  }

  selectPhotoTapped() {
    ImageHelper.selectImage({ width: 500, height: 500}, (response) => {
      this.setState({
        image: response
      })
      image = response
      options.ima_img = response
    })
  }

  _imageReturn() {
    if (this.state.image === '') {
      return image;
    } else {
      return this.state.image;
    }
  }

  render() {
    let buttonTitle = (this.props.showButton) ? 'Aceptar' : 'Guardar'
    return(
      <KeyboardAwareScrollView>
        <View style={SIStyles.container}>
        <View style={SIStyles.formGroup2}>
              <Text style={{color: '#979797', fontWeight: '700', marginBottom: 10}}>Comentario:</Text>
              <View style={SIStyles.contentInput}>
                <TextInput underlineColorAndroid='transparent' defaultValue={options.vcr_comment} style={SIStyles.textArea} multiline={true} maxLength={150}  onChangeText={(val) => options.vcr_comment = val}></TextInput>
              </View>
        </View>
          <TouchableOpacity style={[SIStyles.containerPhoto, { marginTop: 10}]} onPress={() => this.selectPhotoTapped()}>
            <Image
            source={{uri: this._imageReturn()}}
            style={SIStyles.image}
            resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto} onPress={() => this.selectPhotoTapped()}>
            <Text style={SIStyles.textAddImage}>Agregar Imagen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBuild} onPress={this.props.action}>
            <Text style={SIStyles.textAdd}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default class AddSidewalk extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      evaluationsSidewalk: [],
      evaluationsCross: [],
      response: 'Se ha producido un error, intentelo más tarde'
    }

    if (props.isEditing) {
      options = {
        vcr_cat_text: global.buildCategory,
        vcr_tipo: (global.buildCategory == 'Vereda') ? 1 : 2,
        vcr_desc: global.description,
        pev_ttl: global.name,
        start_vcr_cat_text: global.buildCategory,
        start_vcr_tipo: (global.buildCategory == 'Vereda') ? 1 : 2,
        start_vcr_desc: global.description,
        start_pev_ttl: global.name,
        ima_img: ''
      }
    }
    else {
      let ima_img = (this.props.isEditingEvaluation && this.props.evaluation.ema_img.length > 0) ? this.props.evaluation.ema_img[0] : ''
      let comment = (this.props.isEditingEvaluation) ? this.props.evaluation.eup_cmn : ''
      options = {
        ima_img: ima_img,
        start_ima_img: ima_img,
        vcr_tipo_text: '',
        vcr_tipo: (this.props.isEditingEvaluation) ? ((global.buildCategory == 'Vereda') ? 1 : 2) : null,
        vcr_desc: '',
        vcr_comment:  comment,
        start_vcr_comment: comment,
        pev_ttl: '',
        vcr_cat_text: '',
        evaluation: this.props.evaluation
      }
    }

  }

  componentWillMount() {
    savedValues = []
    savedValuesStart = []
    evaluationsArray = []
    if(this.props.isEditingEvaluation) {
      show=1;
    }
    else {
      show = 0;
    }

  }

  isEvaluationArrayValid() {
    for (var index = 0; index < savedValues.length ; index++) {
        var value = savedValues[index]
        if (value == null) {
          return false
        }
      }
    return true
  }

  _nextView() {
    if(this.props.isEditingEvaluation) {
      switch(show) {
        case 1:
          show += 1;
          this.forceUpdate();
        break;
        case 2:

        break;
      }
    }
    else {
    switch (show) {
      case 0:
        if (options.pev_ttl != '' && options.vcr_tipo != null) {
          show += 1;
          this.forceUpdate();
        } else this.first.modalBehavior();
        break;
      case 1:
        if (this.isEvaluationArrayValid()) {
          show += 1;
          this.forceUpdate();
        } else this.alternativeModal.modalBehavior();
        break;
      case 2:
        image = this.state.image;
        if (image != 'image_default') {
          this._didTapAddSidewalk();
        } else this.second.modalBehavior();
        break;
      default:
        break;
    }
  }
  }

  _clearObject(){
      ctgr = 'Seleccionar...';
      image  = 'image_default';
      options = {
        vcr_tipo: null,
        vcr_desc: '',
        pev_ttl: '',
        vae: {},
        ima_img: ''
      }
      savedValues = []
  }

  _backView() {
    if(this.props.isEditingEvaluation) {
        if (show == 1) {
            this._clearObject();
            Actions.pop();
        } else {
            show -= 1;
            this.forceUpdate();
        }
    }
    else {
      if (show == 0) {
        this._clearObject();
        Actions.pop();
      } else {
        show -= 1;
        this.forceUpdate();
      }
    }
  }

  getEvaluationArray() {
    var data = {}
      for (var i = 0; i < savedValues.length; i++) {
        if (savedValues[i] != "optional") {
          data["vae["+i+"]"] = savedValues[i]
        }
      }
    return data
  }

  _didTapAddSidewalk() {
    //options.ima_img = image;
    let data = {
      name: options.pev_ttl,
      latitude: global.latitude,
      longitude: global.longitude,
      comment: options.vcr_comment,
      description: options.vcr_desc,
      vae: this.getEvaluationArray(),
      type: options.vcr_tipo,
      ima_img: options.ima_img
    }
    if (image == 'image_default') {
      this.second.modalBehavior();
    } else {
      this.setState({ visible: true });
      API.addSidewalk(data).then(json =>{
        this.setState({ visible: false });
        this._clearObject();
        this.success.modalBehavior();
      }).catch(error => {
        this.setState({ visible: false });
        this._clearObject();
        if(error == 'no-connection') {
          this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
          this.warning.modalBehavior();
        }
        else if(error == 'auth') {
          this.session.modalBehavior();
        } else {
          this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
          this.warning.modalBehavior();
        }
      });
    }
  }

  didTap(data) {
    if(this.props.isEditingEvaluation && data == 0) {
      this._backView();
    }
    else {
      show = data;
      this._nextView();
    }
  }

  didTapFirst(){
    show = 1;
    this._backView();
  }

  finishAddBuild() {
    Actions.pop({ refresh: { refreshAnnotations: true } });
  }

  finishEditBuild() {
    Actions.pop({ refresh: { refreshData: true }});
  }

  finishEditEvaluations() {
    Actions.pop({ refresh: { refreshData: true }});
  }

  isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
  }

  saveChanges() {
      var data = {}
      if(options.vcr_tipo != options.start_vcr_tipo) {
        data['vcr_tip'] = options.vcr_tipo
      }
      if(options.pev_ttl !=  "" && options.pev_ttl != options.start_pev_ttl) {
        data['pev_ttl'] = options.pev_ttl
      }
      if(options.vcr_desc != options.start_vcr_desc) {
        data['vcr_des'] = options.vcr_desc
      }

      if (this.isEmpty(data)) {
        Actions.pop()
        return
      }

      data['id'] = global.id

      this.setState({ visible: true });
      API.editSidewalk(data).then(json =>{
        this.setState({ visible: false });
        this.successEdit.modalBehavior();
      }).catch(error => {
        console.log(error)
        this.setState({ visible: false });
        this.first.modalBehavior();
      });
  }

  saveChangeEvaluations() {
    var data = {}
    if (savedValues != savedValuesStart) {
      data["vae"] = this.getEvaluationArray()
    }
    if (options.ima_img != options.start_ima_img) {
      data["ima_img"] = { "ima_img[0]": options.ima_img }
    }
    if(options.vcr_desc != options.start_vcr_desc) {
      data['vcr_des'] = options.vcr_desc
    }
    if(options.vcr_comment != options.start_vcr_comment) {
      data['eup_cmn'] = options.vcr_comment
    }

    console.log("data", data)

    if (this.isEmpty(data)) {
        Actions.pop()
        return
    }

    data['id'] = global.id

    this.setState({ visible: true });
      API.editSidewalk(data).then(json =>{
        this.setState({ visible: false });
        this.success.modalBehavior();
      }).catch(error => {
        console.log(error)
        this.setState({ visible: false, response: 'Ha ocurrido un error editando la evaluación' });
        this.warning.modalBehavior();
      });
  }

  _getTitle() {
    var veredaOCruce = (options.vcr_tipo && categories[options.vcr_tipo]) ? categories[options.vcr_tipo] : 'vereda o cruce'
    if(this.props.isEditing) {
      return 'Editar '+veredaOCruce
    }
    else if (this.props.isEditingEvaluation) {
      return 'Editando evaluación'
    }
    else {
      return 'Agregar vereda o cruce'
    }
  }

  render () {
    var title = this._getTitle()
    var errorModal = (this.props.isEditing) ? 'Ha ocurrido un error editando el cruce' : 'Debes agregar un nombre y una categoría'
    switch(show) {
      case 0:
        return (
          <View style={styles.container}>
            <SpinnerCustom visible={this.state.visible}/>
            <HeaderAdd
                isEditing={this.props.isEditing}
                title={title}
                actionBack={() => this._backView()} 
                actionNext={() => this._nextView()} 
                saveChanges={() => this.saveChanges()}
            />
            { 
                !this.props.isEditing && <NavigationBar 
                disable3={true} 
                selected2={this.props.isEditingEvaluation} 
                selected1={!this.props.isEditingEvaluation} 
                actionSecond={() => this._nextView()} 
                actionLast={() => this.didTap(1)} 
                isEditingEvaluation={this.props.isEditingEvaluation}/>
            }
            <Description isEditing={this.props.isEditing} />
            <ModalWarning 
                ref={(first) => { this.first = first; }}  
                icon="alert" 
                title="Error" 
                background="#FD6B6B" 
                text={errorModal}
            />
            <ModalSession 
                ref={(session) => { this.session = session; }}  
                icon="alert" 
                title="Aviso" 
                background='#3CC882' 
                text='Tu sesión ha caducado, vuelve a iniciar sesión'
            />
            <ModalReload ref={(success) => { this.successEdit = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="La vereda o cruce ha sido editada" destine='main' reload={this.finishEditBuild}/>
          </View>
        );
        break;
      case 1:
        if( options.vcr_tipo == 2) {
          return (
            <View style={styles.container}>
                <HeaderAdd 
                    title={title} 
                    actionBack={() => this._backView()} 
                    actionNext={() => this._nextView()}
                />
                <NavigationBar 
                    selected2="2" 
                    actionFirst={() => this._backView()} 
                    actionLast={() => this._nextView()} 
                    isEditingEvaluation={this.props.isEditingEvaluation}
                />
                <AccesibilityCross 
                    ref={(aC) => { this.accesibilityComponent = aC; }} 
                    evs={this.state.evaluationsCross} info={()  => this.info.modalBehavior()} 
                    isEditingEvaluation={this.props.isEditingEvaluation}
                />
                <ModalInfoCross 
                    ref={(info) => { this.info = info; }} 
                />
                <ModalWarning 
                    ref={(alternativeModal) => { this.alternativeModal = alternativeModal; }}  
                    icon="alert" 
                    title="Error" 
                    background="#FD6B6B" 
                    text='Debes seleccionar todas las alternativas'
                />
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
                <HeaderAdd 
                    title={title} 
                    actionBack={() => this._backView()} 
                    actionNext={() => this._nextView()}
                />
                <NavigationBar 
                    selected2="2" 
                    actionFirst={() => this._backView()} 
                    actionLast={() => this._nextView()} 
                    isEditingEvaluation={this.props.isEditingEvaluation}
                />
                <AccesibilitySidewalk 
                    ref={(aC) => { this.accesibilityComponent = aC; }} 
                    evs={this.state.evaluationsSidewalk} 
                    info={()  => this.info.modalBehavior()} 
                    isEditingEvaluation={this.props.isEditingEvaluation}
                />
                <ModalInfoSidewalk 
                    ref={(info) => { this.info = info; }} 
                />
                <ModalWarning 
                    ref={(alternativeModal) => { this.alternativeModal = alternativeModal; }}   
                    icon="alert" 
                    title="Error"   
                    background="#FD6B6B"  
                    text='Debes seleccionar todas las alternativas'
                />
            </View>
          );
        }
        break;
      case 2:
        return (
          <View style={styles.container}>
            <SpinnerCustom visible={this.state.visible}/>
            <HeaderAdd 
                title={title} 
                actionBack={() => this._backView()} 
                actionNext={() => this._nextView()} 
                saveChanges={() => this.saveChangeEvaluations()} 
                isEditing={this.props.isEditingEvaluation} 
                hideRightButton={this.props.isEditingEvaluation}
            />
            <NavigationBar 
                selected3="3" 
                actionFirst={() => this.didTapFirst()} 
                actionSecond={() => this.didTap(0)} 
                isEditingEvaluation={this.props.isEditingEvaluation}
            />
            <SelectImage 
                action={this.props.isEditingEvaluation ? () => this.saveChangeEvaluations() : () => this._didTapAddSidewalk()} 
                howButton={!this.props.isEditingEvaluation}
            />
            <ModalWarning 
                ref={(second) => { this.second = second; }} 
                icon="alert"
                title="Error"
                background="#FD6B6B"
                text='Debes agregar una imagen y un comentario'
            />
            <ModalWarning 
                ref={(warning) => { this.warning = warning; }}  
                icon="alert"
                title="Error"
                background="#FD6B6B"
                text={this.state.response}
            />
            { 
                !this.props.isEditingEvaluation && <ModalReload ref={(success) => { this.success = success; }}  
                icon="alert-circle"
                title="Aviso"
                background="#3CC882"
                text="La vereda o cruce ha sido agregada" 
                destine='main' reload={this.finishAddBuild}/>
            }
            { 
                this.props.isEditingEvaluation && <ModalReload ref={(success) => { this.success = success; }}  
                icon="alert-circle"
                title="Aviso"
                background="#3CC882"
                text="La evaluación ha sido corregida con éxito." 
                destine='main' 
                reload={this.finishEditEvaluations}/>
            }
          </View>
        );
        break;
      default:
        break;
    }
  }
}
