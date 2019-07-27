'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Picker from 'react-native-picker';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpinnerCustom from '../../../components/common/Spinner/spinner';

import Mapbox, { MapView } from 'react-native-mapbox-gl';

import Header from '../../../components/common/Header/header';
import HeaderAdd from '../../../components/common/HeaderAdd/headerAdd';
import NavigationBar from '../../../components/common/NavigationBar/navigationBar';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalReload from '../../../components/common/ModalReload/modalReload';
import ModalInfoCross from '../../../components/common/ModalInfo/modalInfoCross';
import ModalInfoSidewalk from '../../../components/common/ModalInfo/modalInfoSidewalk';
import API from '../../../API/ApiComm';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';

import styles from './styles';
import SIStyles from './selectImageStyles.js';
import FOStyles from './formStyles.js';

var show = 0;

var asdf_props = [
  {label: '', value: 1 },
  {label: '', value: 0 },
];

Mapbox.setAccessToken(global.accessToken);

var options = {
  vcr_tipo: null,
  vcr_desc: '',
  pev_ttl: null,
  vae: {
      "vae[0]": 1,
      "vae[1]": 1,
      "vae[2]": 1,
      "vae[3]": 1,
      "vae[4]": 1,
      "vae[5]": 1,
  },
  ima_img: ''
}

var ctgr = 'Seleccionar...';

var savedValues = {
  "value_21": false,
  "value_22": false,
  "value_23": false,
  "value_24": false,
  "value_25": false,
  "value_26": false,
  "value_27": false,
  "value_28": false,
  "value_29": false,
  "value_30": false,
  "value_31": false,
  "value_32": false,
  "value_33": false,
  "value_34": false,
  "value_35": false,
  "value_36": false,
  "value_37": false,
  "value_38": false,
  "value_39": false,
  "value_40": false,
  "value_41": false,
  "value_42": false,
  "value_43": false,
  "value_44": false
}

var image  = 'image_default';

class Description extends Component {

  constructor(props) {
    super(props);

    this.state = {
      category: ''
    };
  }

  _showCategoriesPicker() {

    Keyboard.dismiss();

    let data = ['Veredas', 'Cruces'];

    Picker.init({
      pickerData: data,
      onPickerConfirm: pickedValue => {
          var category = pickedValue.toString();
          ctgr = pickedValue.toString();
          this.setState({ category: category });
          if(category == 'Veredas'){
            options.vcr_tipo = 1;
          } else {
            options.vcr_tipo = 0;
          }
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
        <ScrollView style={styles.content}>

          <Text style={styles.title}>Datos principales</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Nombre:</Text>
            <View style={styles.contentInput}>
              <TextInput placeholder={global.name} defaultValue={options.pev_ttl} underlineColorAndroid='transparent' style={styles.inputForm} onChangeText={(val) => {options.pev_ttl = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup3}>
            <Text style={styles.textForm}>Categoría:</Text>
            <View>
              <TextInput value={this.state.category} onFocus={this._showCategoriesPicker.bind(this)} placeholder={ctgr} style={styles.picker}></TextInput>
            </View>
          </View>

        <View style={[SIStyles.formGroup2, {marginTop: 20}]}>
              <Text style={{color: '#979797', fontWeight: '700', marginBottom: 10}}>Descripción del lugar:</Text>
              <View style={SIStyles.contentInput}>
                <TextInput maxLength={150} placeholder={global.comments} defaultValue={options.vcr_desc} underlineColorAndroid='transparent' style={SIStyles.textArea} multiline={true} onChangeText={(val) => {options.vcr_desc = val}}></TextInput>
              </View>
        </View>

        </ScrollView>
      );
  }
}

class AccesibilitySidewalk extends Component {

  constructor(props) {
    super(props);

    this.state = {
      update: {
        value_21: false,
        value_22: false,
        value_23: false,
        value_24: false,
        value_25: false,
        value_26: false,
        value_27: false,
        value_28: false,
        value_29: false,
        value_30: false
      },
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

  _setValue(value, index) {
    var update = {};

    for (var key in this.state.update) {

      if (key == ('value_' + value)) {
        update[key] = !this.state.update[key];
        savedValues[key] = !savedValues[key];
      } else {
        update[key] = this.state.update[key];
        savedValues[key] = savedValues[key];
      }
    }

    for (var key in this.state.update) {

      if ( key == ('value_' + value)) {
        switch(key) {
          case 'value_22':
          case 'value_24':
          case 'value_26':
          case 'value_28':
          case 'value_30':
              if (this.state.update[('value_') + (value - 1)]) {
                 update[('value_') + (value - 1)] = !this.state.update[('value_') + (value - 1)];
                 savedValues[('value_') + (value - 1)] = !savedValues[('value_') + (value - 1)];
              }
            break;
          case 'value_21':
          case 'value_23':
          case 'value_25':
          case 'value_27':
          case 'value_29':
              if (this.state.update[('value_') + (value + 1)]) {
                update[('value_') + (value + 1)] = !this.state.update[('value_') + (value + 1)];
                savedValues[('value_') + (value + 1)] = !savedValues[('value_') + (value + 1)];
              }
            break;
        }
      }
    }

    this.setState({ update });

    var ops = options.vae;
    switch(index) {
        case 0:
          ops["vae[0]"] = value;
          break;
        case 1:
          ops["vae[1]"] = value;
          break;
        case 2:
          ops["vae[2]"] = value;
          break;
        case 3:
          ops["vae[3]"] = value;
          break;
        case 4:
          ops["vae[4]"] = value;
          break;
    }
  }

  renderEvaluations() {
    return this.props.evs.map((data, i) => {
      return(
        <View key={i} style={FOStyles.formContainer}>
          <View style={FOStyles.textContainer}><Text key={i}>{data.title}</Text></View>
          <View style={FOStyles.inputContainer}>{ this.renderAlternatives(data.opts, i) }</View>
        </View>
      )
    })
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
                buttonInnerColor={this.state.update['value_' + data.vie_id] || savedValues['value_' + data.vie_id] ? '#7F7F7F' : '#FFFFFF'}
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
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginRight: 15}}>Si</Text>
              <Text style={{fontSize: 16, marginRight: 10}}>No</Text>
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
      update: {
        value_31: false,
        value_32: false,
        value_33: false,
        value_34: false,
        value_35: false,
        value_36: false,
        value_37: false,
        value_38: false,
        value_39: false,
        value_40: false,
        value_41: false,
        value_42: false,
        value_43: false,
        value_44: false
      },
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

  _setValue(value, index) {
    console.log(value);
    var update = {};

    for (var key in this.state.update) {

      if (key == ('value_' + value)) {
        update[key] = !this.state.update[key];
        savedValues[key] = !savedValues[key];
      } else {
        update[key] = this.state.update[key];
        savedValues[key] = savedValues[key];
      }
    }

    for (var key in this.state.update) {

      if ( key == ('value_' + value)) {
        switch(key) {
          case 'value_32':
          case 'value_34':
          case 'value_36':
          case 'value_38':
          case 'value_40':
          case 'value_42':
          case 'value_44':
              if (this.state.update[('value_') + (value - 1)]) {
                 update[('value_') + (value - 1)] = !this.state.update[('value_') + (value - 1)];
                 savedValues[('value_') + (value - 1)] = !savedValues[('value_') + (value - 1)];
              }
            break;
          case 'value_31':
          case 'value_33':
          case 'value_35':
          case 'value_37':
          case 'value_39':
          case 'value_41':
          case 'value_43':
              if (this.state.update[('value_') + (value + 1)]) {
                update[('value_') + (value + 1)] = !this.state.update[('value_') + (value + 1)];
                savedValues[('value_') + (value + 1)] = !savedValues[('value_') + (value + 1)];
              }
            break;
        }
      }
    }

    this.setState({ update });

    var ops = options.vae;
    switch(index) {
        case 0:
          ops["vae[0]"] = value;
          break;
        case 1:
          ops["vae[1]"] = value;
          break;
        case 2:
          ops["vae[2]"] = value;
          break;
        case 3:
          ops["vae[3]"] = value;
          break;
        case 4:
          ops["vae[4]"] = value;
          break;
        case 5:
          ops["vae[5]"] = value;
          break;
    }
  }

  renderEvaluations() {
    return this.props.evs.map((data, i) => {
      return(
        <View key={i} style={FOStyles.formContainer}>
          <View style={FOStyles.textContainer}><Text key={i}>{data.title}</Text></View>
          <View style={FOStyles.inputContainer}>{ this.renderAlternatives(data.opts, i) }</View>
        </View>
      )
    })
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
                buttonInnerColor={this.state.update['value_' + data.vie_id] || savedValues['value_' + data.vie_id] ? '#7F7F7F' : '#FFFFFF'}
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
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, marginRight: 15}}>Si</Text>
              <Text style={{fontSize: 16, marginRight: 10}}>No</Text>
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
      image: ''
    }
  }

  selectPhotoTapped() {
    ImageHelper.selectImage({ width: 500, height: 500}, (response) => {
      this.setState({
        image: response
      })
      image = response
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
    return(
      <View style={SIStyles.container}>
          <TouchableOpacity style={SIStyles.containerPhoto} onPress={() => this.selectPhotoTapped()}>
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
            <Text style={SIStyles.textAdd}>Agregar</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

export default class EditSidewalk extends Component {

  constructor(props) {
    super(props);

    this.evaluationsSidewalk = [];
    this.evaluationsCross = [];

    this.state = {
      visible: false
    }
  }

  componentWillMount() {
    show = 0;
    this.setState({ visible: true });

    API.getEvaluationAlternativesBySidewalk().then(json => {

        var k = json.data

        if (k.length > 0) {

          for (var i = 0; i < k.length; i++) {

            var title = String(k[i].iev_des);
            var vie = k[i].vie;

            this.evaluationsSidewalk.push(
              {
                title: title,
                opts: vie
              }
            )
          }
        }

    }).catch(error => {
        this.setState({ visible: false });
        console.log(error);
    });

    API.getEvaluationAlternativesByCross().then(json => {

        var k = json.data

        if (k.length > 0) {

          for (var i = 0; i < k.length; i++) {

            var title = String(k[i].iev_des);
            var vie = k[i].vie;

            this.evaluationsCross.push(
              {
                title: title,
                opts: vie
              }
            )
          }
        }

        this.setState({ visible: false });

    }).catch(error => {
        this.setState({ visible: false });
        console.log(error);
    });
  }

  _nextView() {
    switch (show) {
      case 0:
        show += 1;
        this.forceUpdate();
        break;
      case 1:
        show += 1;
        this.forceUpdate();
        break;
      case 2:
        image = this.state.image;
        this._didTapEditSidewalk();
        break;
      default:
        break;
    }
  }

  _backView() {
    if (show == 0) {
      this._clearObject();
      Actions.pop();
    } else {
      show -= 1;
      this.forceUpdate();
    }
  }

  _didTapEditSidewalk() {
    let data = {
      id: global.id,
      name: name,
      latitude: global.latitude,
      longitude: global.longitude,
      comment: 'asdf',
      image: image,
      state: state,
      space: space,
      fixed: fixed,
      mobile: mobile,
      light: light,
      type: category
    }
    this.setState({ visible: true });
    API.editSidewalk(data).then(json =>{
      this.setState({ visible: false });
      this._clearObject();
      this.success.modalBehavior();
    }).catch(error => {
      console.log(error)
      this.setState({ visible: false });
      this._clearObject();
      this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
      this.warning.modalBehavior();
    });
  }

  _clearObject(){
      ctgr = 'Seleccionar...';
      image  = 'image_default';
      options = {
        vcr_tipo: null,
        vcr_desc: '',
        pev_ttl: null,
        vae: {
            "vae[0]": 1,
            "vae[1]": 1,
            "vae[2]": 1,
            "vae[3]": 1,
            "vae[4]": 1,
            "vae[5]": 1,
        },
        ima_img: ''
      }
      savedValues = {
            "value_21": false,
            "value_22": false,
            "value_23": false,
            "value_24": false,
            "value_25": false,
            "value_26": false,
            "value_27": false,
            "value_28": false,
            "value_29": false,
            "value_30": false,
            "value_31": false,
            "value_32": false,
            "value_33": false,
            "value_34": false,
            "value_35": false,
            "value_36": false,
            "value_37": false,
            "value_38": false,
            "value_39": false,
            "value_40": false,
            "value_41": false,
            "value_42": false,
            "value_43": false,
            "value_44": false
      }
  }

  didTap(data) {
    show = data;
    this._nextView();
  }

  didTapFirst(){
    show = 1;
    this._backView();
  }

  render () {
    switch(show) {
      case 0:
        return (
          <View style={styles.container}>
            <HeaderAdd title='Editar vereda o cruce' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
            <NavigationBar selected1="1" actionSecond={() => this._nextView()} actionLast={() => this.didTap(1)}/>
            <Description />
            <ModalWarning ref={(first) => { this.first = first; }}  icon="alert" title="Error" background="#FD6B6B" text='Debes agregar un nombre y una categoría'/>
          </View>
        );
        break;
      case 1:
        if( options.vcr_tipo == 0) {
          return (
            <View style={styles.container}>
              <HeaderAdd title='Agregar vereda o cruce' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
              <NavigationBar selected2="2" actionFirst={() => this._backView()} actionLast={() => this._nextView()}/>
              <AccesibilityCross evs={this.evaluationsCross} info={()  => this.info.modalBehavior()}/>
              <ModalInfoCross ref={(info) => { this.info = info; }} />
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <HeaderAdd title='Agregar vereda o cruce' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
              <NavigationBar selected2="2" actionFirst={() => this._backView()} actionLast={() => this._nextView()}/>
              <AccesibilitySidewalk evs={this.evaluationsSidewalk} info={()  => this.info.modalBehavior()}/>
              <ModalInfoSidewalk ref={(info) => { this.info = info; }} />
            </View>
          );
        }
        break;
      case 2:
        return (
          <View style={styles.container}>
            <SpinnerCustom visible={this.state.visible}/>
            <HeaderAdd title='Editar vereda o cruce' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
            <NavigationBar selected3="3" actionFirst={() => this.didTapFirst()} actionSecond={() => this.didTap(0)}/>
            <SelectImage action={() => this._didTapEditSidewalk()}/>
            <ModalWarning ref={(second) => { this.second = second; }}  icon="alert" title="Error" background="#FD6B6B" text='Debes agregar una imagen'/>
            <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text='Se ha producido un error'/>
            <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="La vereda o cruce ha sido editada" destine='main'/>
          </View>
        );
        break;
      default:
        break;
    }
  }
}