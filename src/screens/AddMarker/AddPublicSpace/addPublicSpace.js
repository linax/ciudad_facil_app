'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import ModalDropdown from 'react-native-modal-dropdown';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpinnerCustom from '../../../components/common/Spinner/spinner';
import Picker from 'react-native-picker';
import validator from 'email-validator';

import Header from '../../../components/common/Header/header';
import HeaderAdd from '../../../components/common/HeaderAdd/headerAdd';
import NavigationBar from '../../../components/common/NavigationBar/navigationBar';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalSession from '../../../components/common/ModalWarning/modalSession';
import ModalReload from '../../../components/common/ModalReload/modalReload';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';

import API from '../../../API/ApiComm';

import styles from './styles';
import SIStyles from './selectImageStyles.js';


var options = {}

var category = 'Seleccionar...';
var subCategory = 'Seleccionar...';

var savedValues = []
var savedValuesStart = []

var image  = 'image_default';

var show = 0;

class Description extends Component {

  constructor(props) {
    super(props);

    this.subCategories = [];
    this.subCategoriesNames = [];

    this.state = {
      category: options.esp_cat,
      subCategory: options.esp_sub_cat_text,
      editable: false,
      errorValidation: ''
    }

  }

  componentDidMount() {
    if (options.category != '' && options.subCategory != '') {
      this.setState({
        category: options.category,
        subCategory: options.subCategory
      })
    }
  }

  _selectedCategory(value) {

    options.category = value;
    options.esp_cat = value
    options.esp_sub_cat = ''
    options.esp_sub_cat_text = ''
    this.setState({ category: value });
    var categories = this.props.categories;

    if (this.state.subCategory != '' || options.edi_sub_cat_text != '') {
      this.setState({ subCategory: '' });
    }

    var index = 0;
    var subcategories = [];
    this.subCategoriesNames = [];
    this.subCategories = [];
    for (var i = 0; i < categories.length; i++) {
      var name = categories[i].name;

      if (name == value) {
        subcategories = categories[i].subcategories
      }
    }

  if (subcategories.length > 0) {

    for (var i = 0; i < subcategories.length; i++) {

      var id = String(subcategories[i].ces_id);
      var name = String(subcategories[i].ces_nam);

      this.subCategories.push(
        {
          id: id,
          name: name,
        }
      )

      this.subCategoriesNames.push(
       name
      )
    }

    this.setState({ editable: true });
  }

  }

  _showCategoriesPicker() {

    Keyboard.dismiss();

    var selectedValue;
    if (this.props.categoriesNames.includes(this.state.category)) {
      selectedValue = this.state.category
    }
    else {
      selectedValue = this.props.categoriesNames[0]
    }
    console.log("selectedValue", selectedValue)

    Picker.init({
      pickerData: this.props.categoriesNames,
      selectedValue: [selectedValue],
      onPickerConfirm: pickedValue => {
        category = pickedValue.toString();
        this._selectedCategory(pickedValue.toString())
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Categoría',
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Cancelar'
    });

    Picker.show()
  }

  _showSubCategoriesPicker() {

    Keyboard.dismiss();

    var selectedValue;
    if (this.subCategoriesNames.includes(this.state.subCategory)) {
      selectedValue = this.state.subCategory
    }
    else {
      selectedValue = this.subCategoriesNames[0]
    }

    Picker.init({
      selectedValue: [selectedValue],
      pickerData: this.subCategoriesNames,
      onPickerConfirm: pickedValue => {
        subCategory = pickedValue.toString();
        this._setSubCategoryValue(pickedValue.toString());
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Subcategoría',
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Cancelar'
    });

    Picker.show()
  }

  _setSubCategoryValue(value) {
    var len = (this.subCategories).length;
    for (var k = 0; k < len; k++) {
      if(value == this.subCategories[k].name) {
        options.esp_sub_cat = parseInt(this.subCategories[k].id);
        options.esp_sub_cat_text = this.subCategories[k].name
        options.subCategory = this.subCategories[k].name
        this.setState({ subCategory: this.subCategories[k].name });
      }
    }
  }

  _validateEmail(email) {
    if(!validator.validate(email) && email != '') {
      this.setState({ errorValidation: 'El correo ingresado no es válido' });
      options.esp_ema = null;
    } else {
      this.setState({ errorValidation: '' });
      options.esp_ema = email;
    }
  }

  _setPhoneValue(phone) {
    options.esp_tel = phone;
  }

  _getValueCategoryPlaceHolder(value) {
    if (value == undefined || value == '' || value == ' ') {
      return "Seleccionar"
    }
    else {
      return value
    }
  }

  render() {
    return(
        <KeyboardAwareScrollView style={styles.content} extraScrollHeight={65}>

          <Text style={styles.title}>Datos principales</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Nombre:</Text>
            <View style={styles.contentInput}>
              <TextInput defaultValue={options.esp_name} underlineColorAndroid='transparent' style={styles.inputForm} onChangeText={(val) => {options.pev_ttl = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup2}>
            <Text style={styles.textForm}>Categoría:</Text>
            <View>
              <TextInput onFocus={this._showCategoriesPicker.bind(this)} value={this._getValueCategoryPlaceHolder(options.esp_cat)} style={styles.picker}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup2}>
            <Text style={[styles.textForm]}>Sub-Categoría:</Text>
            <View>
              <TextInput editable={this.state.editable} onFocus={this._showSubCategoriesPicker.bind(this)} value={this._getValueCategoryPlaceHolder(options.esp_sub_cat_text)} style={styles.picker}></TextInput>
            </View>
          </View>

          <Text style={[styles.title, {marginTop: 25}]}>Datos de contacto del lugar (opcional)</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Dirección:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' defaultValue={options.esp_dir} style={styles.inputForm} onChangeText={(val) => {options.esp_dir = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Teléfono:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' defaultValue={options.esp_tel} style={styles.inputForm} keyboardType="numeric" onChangeText={(val) => {options.esp_tel = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Correo electrónico:</Text>
            <View style={styles.contentInput}>
              <Text style={{fontWeight:'bold', fontSize: 16, color:'red'}}>{this.state.errorValidation}</Text>
              <TextInput underlineColorAndroid='transparent' defaultValue={options.esp_ema} style={styles.inputForm} keyboardType="email-address" onChangeText={(value) => this._validateEmail(value)}></TextInput>
            </View>
          </View>

        </KeyboardAwareScrollView>
      );
  }
}

class Accesibility extends Component {

  constructor(props) {
    super(props);

    this.state = {
      update: []
    }
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
    return this.props.evs.map((data, i) => {
      return(
        <View key={i}>
          <Text key={i} style={[styles.title, {marginTop: 40}]}>{data.title}</Text>
          { this.renderAlternatives(data.opts, i) }
        </View>
      )
    })
  }

  renderAlternatives(opts, index) {
    return opts.map((data, i) => {
      return(
          <RadioForm key={i} formHorizontal={false} animation={true} style={styles.radioForm}>
            <RadioButton labelHorizontal={true} key={i} style={styles.radioContainer}>
              <RadioButtonInput
                obj={data.vie_id}
                index={i}
                buttonSize={17}
                buttonInnerColor={(opts[i].vie_id == savedValues[index]) ? '#7F7F7F' : '#FFFFFF'}
                buttonOuterColor={'#7F7F7F'}
                isSelected={true}
                onPress={() => this._setValue(data.vie_id, index)}
              />
              <View style={styles.labelContainer}>
                <Text style={styles.labelFormar}>{data.vie_dsc}</Text>
              </View>
            </RadioButton>
          </RadioForm>
      )
    })
  }

  render() {
    return(
        <KeyboardAwareScrollView style={styles.content}>

        {
          this.renderEvaluations()
        }

        </KeyboardAwareScrollView>
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
      options.ima_img = response
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
    let buttonTitle = (this.props.showButton) ? 'Aceptar' : 'Guardar'
    return(
      <KeyboardAwareScrollView>
        <View style={SIStyles.container}>
        <View style={SIStyles.formGroup2}>
              <Text style={{color: '#979797', fontWeight: '700', marginBottom: 10}}>Descripción del lugar:</Text>
              <View style={SIStyles.contentInput}>
                <TextInput underlineColorAndroid='transparent' defaultValue={options.eup_cmn} style={SIStyles.textArea} multiline={true} maxLength={150}  onChangeText={(val) => options.eup_cmn = val}></TextInput>
              </View>
        </View>
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
            <Text style={SIStyles.textAdd}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default class AddPublicSpace extends Component {

  constructor(props) {
    super(props);

    this.categories = [];
    this.categoriesNames = [];

    this.evaluations = [];

    if (props.isEditing) {
      // Editando
      options = {
        esp_dir: global.address,
        esp_ema: global.mail,
        esp_tel: global.phone,
        esp_sub_cat: global.buildSubCategory,
        esp_sub_cat_text: global.buildSubCategory,
        esp_cat: global.buildCategory,
        esp_name: global.name,
        start_esp_dir: global.address,
        start_esp_ema: global.mail,
        start_esp_tel: global.phone,
        start_esp_sub_cat: global.buildSubCategory,
        start_esp_cat: global.buildCategory,
        start_esp_name: global.name,
        pev_ttl: '',
        eup_cmn: '',
        ima_img: '',
        category: '',
        subcategory: '',
        edi_pub: false
      }
    }
    else {
      // Creando
      let eup_cmn = (this.props.isEditingEvaluation) ? this.props.evaluation.eup_cmn : ''
      let ima_img = (this.props.isEditingEvaluation && this.props.evaluation.ema_img.length > 0) ? this.props.evaluation.ema_img[0] : ''
      options = {
        esp_dir: '',
        esp_ema: '',
        esp_pub: false,
        esp_tel: '',
        esp_sub_cat: '',
        pev_ttl: '',
        ima_img: ima_img,
        start_ima_img: ima_img,
        category: '',
        subcategory: '',
        evaluation: this.props.evaluation,
        eup_cmn: eup_cmn,
        start_eup_cmn: eup_cmn
      }
    }

    this.state = {
      visible: false,
    }
  }

  componentWillMount(){
    savedValues = []
    savedValuesStart = []
    if(this.props.isEditingEvaluation) {
      show=1;
    }
    else {
    	show = 0;
    }
    this.setState({ visible: true });

      API.getCategoriesPublicSpace().then(json => {
		this.setState({ visible: false });
        var j = json.data
        if (j.length > 0) {

          for (var i = 0; i < j.length; i++) {

            var id = String(j[i].cep_id);
            var name = String(j[i].cep_nam);

            this.categories.push(
              {
                id: id,
                name: name,
                subcategories: j[i].cep_ces
              }
            )

            this.categoriesNames.push(
              name
            )
          }
        }
      }).catch(error => {
        this.setState({ visible: false });
        console.log(error);
      });
	if (!this.props.isEditing) {
      API.getEvaluationAlternativesByPublicSpace().then(json => {

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


            this.evaluations.push(
              {
                title: title,
                opts: vie
              }
            )
          }
        }
        this.accesibilityComponent.updateSelected(savedValues);
        savedValuesStart = savedValues
        this.setState({ visible: false, update: savedValues });
      }).catch(error => {
        console.log(error);
        this.setState({ visible: false });
      });
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

  getEvaluationArray() {
    var data = {}
    for (var i = 0; i < savedValues.length; i++) {
      if (savedValues[i] != "optional") {
        data["vae["+i+"]"] = savedValues[i]
      }
    }
    return data
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
        if (options.pev_ttl != '' && options.esp_sub_cat != '') {
          if(options.esp_ema == null && !validator.validate(options.esp_ema)) {
            this.second.modalBehavior();
          } else {
            show += 1;
            this.forceUpdate();
          }
        } else this.first.modalBehavior();
        break;
      case 1:
        var ops = options.vae;
        if (this.isEvaluationArrayValid()) {
          show += 1;
          this.forceUpdate();
        } else this.third.modalBehavior();
        break;
      case 2:
        if (image != 'image_default') {
          this._didTapAddPublicSpace();
        } else this.second.modalBehavior();
        break;
      default:
        break;
    }
  }
  }

  _didTapAddPublicSpace() {
    options.ima_img = image;
    let data = {
      email: options.esp_ema,
      phone: (options.esp_tel).toString(),
      sub: options.esp_sub_cat,
      name: options.pev_ttl,
      latitude: global.latitude,
      longitude: global.longitude,
      comment: options.eup_cmn,
      image: options.ima_img,
      vae: this.getEvaluationArray(),
      dir: options.esp_dir
    }
    if (image == 'image_default') {
      this.four.modalBehavior();
    } else {
      this.setState({ visible: true });
      API.addPublicSpace(data).then(json =>{
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

  _clearObject(){
      category = 'Seleccionar...';
      subCategory = 'Seleccionar...';
      image  = 'image_default';
      options = {
        esp_dir: '',
        esp_ema: '',
        esp_tel: '',
        esp_sub_cat: '',
        pev_ttl: '',
        vae: {},
        eup_cmn: '',
        ima_img: '',
        category: '',
        subcategory: ''
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
      if(options.esp_dir != options.start_esp_dir) {
        data['esp_dir'] = options.esp_dir
      }
      if(options.esp_ema != options.start_esp_ema) {
        data['esp_ema'] = options.esp_ema
      }
      if(options.esp_tel != options.start_esp_tel) {
        data['esp_tel'] = options.esp_tel
      }
      if(options.esp_sub_cat != options.start_esp_sub_cat) {
        data['esp_sub_cat'] = options.esp_sub_cat
      }
      if(options.pev_ttl !=  "" && options.pev_ttl != options.start_edi_name) {
        data['pev_ttl'] = options.pev_ttl
      }

      if (this.isEmpty(data)) {
        Actions.pop()
        return
      }
      data['id'] = global.id

      this.setState({ visible: true });
      API.editPublicSpace(data).then(json =>{
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
    if (options.eup_cmn != options.start_eup_cmn) {
      data["eup_cmn"] = options.eup_cmn
    }
    console.log("data", data)

    if (this.isEmpty(data)) {
        Actions.pop()
        return
    }

    data['id'] = global.id

    this.setState({ visible: true });
      API.editPublicSpace(data).then(json =>{
        this.setState({ visible: false });
        this.success.modalBehavior();
      }).catch(error => {
        console.log(error)
        this.setState({ visible: false, response: 'Ha ocurrido un error editando la evaluación' });
        this.warning.modalBehavior();
      });
  }

  _getTitle() {
    if(this.props.isEditing) {
      return 'Editar espacio público'
    }
    else if (this.props.isEditingEvaluation) {
      return 'Editando evaluación'
    }
    else {
      return 'Agregar espacio público'
    }
  }

  render () {
    var title = this._getTitle()
    var errorModal = (this.props.isEditing) ? 'Ha ocurrido un error editando el espacio público' : 'Debes agregar un nombre, una categoría y una sub-categoría'
      switch(show) {
        case 0:
          return (
            <View style={styles.container}>
              <SpinnerCustom visible={this.state.visible}/>
	            <HeaderAdd isEditing={this.props.isEditing} title={title} actionBack={() => this._backView()} actionNext={() => this._nextView()} saveChanges={() => this.saveChanges()}/>
	            { !this.props.isEditing && <NavigationBar disable3={true} selected2={this.props.isEditingEvaluation} selected1={!this.props.isEditingEvaluation} actionSecond={() => this._nextView()} actionLast={() => this.didTap(1)} isEditingEvaluation={this.props.isEditingEvaluation}/>}
              <Description categories={this.categories} categoriesNames={this.categoriesNames}/>
              <ModalWarning ref={(first) => { this.first = first; }}  icon="alert" title="Error" background="#FD6B6B" text={errorModal}/>
              <ModalWarning ref={(second) => { this.second = second; }}  icon="alert" title="Error" background="#FD6B6B" text='Debes agregar un mail válido'/>
              <ModalSession ref={(session) => { this.session = session; }}  icon="alert" title="Aviso" background='#3CC882' text='Tu sesión ha caducado, vuelve a iniciar sesión'/>
              <ModalReload ref={(success) => { this.successEdit = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="El espacio público ha sido editado" destine='main' reload={this.finishEditBuild}/>
            </View>
          );
          break;
      case 1:
        return (
          <View style={styles.container}>
            <HeaderAdd title={title} actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
            <NavigationBar selected2="2" actionFirst={() => this._backView()} actionLast={() => this._nextView()} isEditingEvaluation={this.props.isEditingEvaluation}/>
            <Accesibility ref={(aC) => { this.accesibilityComponent = aC; }} evs={this.evaluations} />
            <ModalWarning ref={(third) => { this.third = third; }}  icon="alert" title="Error" background="#FD6B6B" text='Debes agregar todos las alternativas obligatorias'/>
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.container}>
            <SpinnerCustom visible={this.state.visible}/>
            <HeaderAdd title={title} actionBack={() => this._backView()} actionNext={() => this._nextView()} saveChanges={() => this.saveChangeEvaluations()} isEditing={this.props.isEditingEvaluation} hideRightButton={this.props.isEditingEvaluation}/>
            <NavigationBar selected3="3" actionFirst={() => this.didTapFirst()} actionSecond={() => this.didTap(0)} isEditingEvaluation={this.props.isEditingEvaluation}/>
            <SelectImage action={this.props.isEditingEvaluation ? () => this.saveChangeEvaluations() : () => this._didTapAddPublicSpace()}showButton={!this.props.isEditingEvaluation}/>
            <ModalWarning ref={(four) => { this.four = four; }}  icon="alert" title="Error" background="#FD6B6B" text='Debes agregar una imagen'/>
            <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
            { !this.props.isEditingEvaluation && <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="El espacio público ha sido agregado" destine='main' reload={this.finishAddBuild}/>}
            { this.props.isEditingEvaluation && <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="La evaluación ha sido corregida con éxito." destine='main' reload={this.finishEditEvaluations}/>}
          </View>
        );
        default:
          break;
      }
  }
}