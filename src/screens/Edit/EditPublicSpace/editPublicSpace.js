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
import ModalReload from '../../../components/common/ModalReload/modalReload';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';

import API from '../../../API/ApiComm';

import styles from './styles';
import SIStyles from './selectImageStyles.js';

var options = {
  esp_dir: '',
  esp_ema: null,
  esp_tel: '',
  esp_sub_cat: '',
  pev_ttl: '',
  vae: {
      "vae[0]": 1,
      "vae[1]": 1,
      "vae[2]": 1,
      "vae[3]": 1
  },
  eup_cmn: '',
  ima_img: ''
}

var category = 'Seleccionar...';
var subCategory = 'Seleccionar...';

var savedValues = {
  "value_13": false,
  "value_14": false,
  "value_15": false,
  "value_16": false,
  "value_17": false,
  "value_18": false,
  "value_19": false,
  "value_20": false
}

var image  = 'image_default';

var show = 0;

class Description extends Component {

  constructor(props) {
    super(props);

    this.subCategories = [];
    this.subCategoriesNames = [];

    this.state = {
      category: '',
      subCategory: '',
      editable: false,
      errorValidation: ''
    }

  }

  _selectedCategory(value) {

    this.setState({ category: value });
    var categories = this.props.categories;

    if (this.state.subCategory != '') {
      this.setState({ subCategory: '' });
    }

    var index = 0;
    var subcategories = [];
    this.subCategoriesNames = [];
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

    this.setState({ category: '' });

    Picker.init({
      pickerData: this.props.categoriesNames,
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

    Picker.init({
      pickerData: this.subCategoriesNames,
      onPickerConfirm: pickedValue => {
        this.setState({ subCategory: pickedValue.toString() });
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
      }
    }
  }

  _validateEmail(email) {
    if(!validator.validate(email) && email != '') {
      this.setState({ errorValidation: 'El correo ingresado no es válido' });
    } else {
      this.setState({ errorValidation: '' });
      options.esp_ema = email;
    }
  }

  render() {
    return(
        <KeyboardAwareScrollView style={styles.content} extraScrollHeight={65}>

          <Text style={styles.title}>Datos principales</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Nombre:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' defaultValue={options.pev_ttl} placeholder={global.name} style={styles.inputForm} onChangeText={(val) => {options.pev_ttl = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup2}>
            <Text style={styles.textForm}>Categoría:</Text>
            <View>
              <TextInput value={this.state.category} onFocus={this._showCategoriesPicker.bind(this)} placeholder={category} style={styles.picker}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup2}>
            <Text style={[styles.textForm]}>Sub-Categoría:</Text>
            <View>
              <TextInput value={this.state.subCategory} editable={this.state.editable} onFocus={this._showSubCategoriesPicker.bind(this)} placeholder={subCategory} style={styles.picker}></TextInput>
            </View>
          </View>

          <Text style={[styles.title, {marginTop: 25}]}>Datos de contacto del lugar (opcional)</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Dirección:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' defaultValue={options.esp_dir} style={styles.inputForm} placeholder={global.address} onChangeText={(val) => {options.esp_dir = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Teléfono:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' style={styles.inputForm} placeholder={global.phone} keyboardType="numeric" onChangeText={(val) => {options.esp_tel = Number(val)}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Correo electrónico:</Text>
            <View style={styles.contentInput}>
              <Text style={{fontWeight:'bold', fontSize: 16, color:'red'}}>{this.state.errorValidation}</Text>
              <TextInput underlineColorAndroid='transparent' style={styles.inputForm} defaultValue={options.esp_ema} placeholder={global.email} keyboardType="email-address" onChangeText={(value) => this._validateEmail(value)}></TextInput>
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
      update: {
        value_13: false,
        value_14: false,
        value_15: false,
        value_16: false,
        value_17: false,
        value_18: false,
        value_19: false,
        value_20: false
      }
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
          case 'value_14':
          case 'value_16':
          case 'value_18':
          case 'value_20':
              if (this.state.update[('value_') + (value - 1)]) {
                 update[('value_') + (value - 1)] = !this.state.update[('value_') + (value - 1)];
                 savedValues[('value_') + (value - 1)] = !savedValues[('value_') + (value - 1)];
              }
            break;
          case 'value_13':
          case 'value_15':
          case 'value_17':
          case 'value_19':
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
    }
  }

  renderEvaluations() {
    return this.props.evs.map((data, i) => {
      return(
        <View key={i}>
          <Text key={i} style={[styles.title, {marginTop: 10}]}>{data.title}</Text>
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
                buttonInnerColor={this.state.update['value_' + data.vie_id] || savedValues['value_' + data.vie_id] ? '#7F7F7F' : '#FFFFFF'}
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
            <Text style={SIStyles.textAdd}>Agregar</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

export default class AddPublicSpace extends Component {

  constructor(props) {
    super(props);

    this.categories = [];
    this.categoriesNames = [];

    this.evaluations = [];

    this.state = {
      visible: false,
    }
  }

  componentWillMount(){
    show = 0;
    this.setState({ visible: true });

      API.getCategoriesPublicSpace().then(json => {

        var j = json.data
        console.log(j);
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
        console.log(error);
      });

      API.getEvaluationAlternativesByPublicSpace().then(json => {

        var k = json.data

        if (k.length > 0) {

          for (var i = 0; i < k.length; i++) {

            var title = String(k[i].iev_des);
            var vie = k[i].vie;

            this.evaluations.push(
              {
                title: title,
                opts: vie
              }
            )
          }
        }
        this.setState({ visible: false });
      }).catch(error => {
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
        show = 0;
        image = this.state.image;
        this._didTapEditBuild();
        break;
      default:
        break;
    }
  }

  _didTapEditPublicSpace() {
    let data = {
      id: global.id,
      email: options.esp_ema,
      phone: options.esp_tel,
      sub: options.esp_sub_cat,
      name: options.pev_ttl,
      comment: options.eup_cmn,
      image: options.ima_img,
      zero: options.vae["vae[0]"],
      one: options.vae["vae[1]"],
      two: options.vae["vae[2]"],
      three: options.vae["vae[3]"],
      dir: options.edi_dir
    }
    this.setState({ visible: true });
    API.editPublicSpace(data).then(json =>{
      this.setState({ visible: false });
      this._clearObject();
      this.success.modalBehavior();
    }).catch(error => {
      this.setState({ visible: false });
      this._clearObject();
      this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
      this.warning.modalBehavior();
    });
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

  didTap(data) {
    show = data;
    this._nextView();
  }

  didTapFirst(){
    show = 1;
    this._backView();
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
        vae: {
            "vae[0]": null,
            "vae[1]": null,
            "vae[2]": null,
            "vae[3]": null
        },
        eup_cmn: '',
        ima_img: ''
      }
      savedValues = {
        "value_13": false,
        "value_14": false,
        "value_15": false,
        "value_16": false,
        "value_17": false,
        "value_18": false,
        "value_19": false,
        "value_20": false
      }
  }

  render () {
      switch(show) {
        case 0:
          return (
            <View style={styles.container}>
              <SpinnerCustom visible={this.state.visible}/>
              <HeaderAdd title='Editar espacio público' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
              <NavigationBar selected1="1" actionSecond={() => this._nextView()} actionLast={() => this.didTap(1)}/>
              <Description categories={this.categories} categoriesNames={this.categoriesNames}/>
            </View>
          );
          break;
      case 1:
        return (
          <View style={styles.container}>
            <HeaderAdd title='Editar espacio público' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
            <NavigationBar selected2="2" actionFirst={() => this._backView()} actionLast={() => this._nextView()}/>
            <Accesibility evs={this.evaluations}/>
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.container}>
            <SpinnerCustom visible={this.state.visible}/>
            <HeaderAdd title='Editar espacio público' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
            <NavigationBar selected3="3" actionFirst={() => this.didTapFirst()} actionSecond={() => this.didTap(0)}/>
            <SelectImage action={() => this._didTapEditPublicSpace()}/>
            <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
            <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="El espacio público ha sido editado" destine='main'/>
          </View>
        );
        default:
          break;
      }
  }
}