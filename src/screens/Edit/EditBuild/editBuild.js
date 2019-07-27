'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
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
import API from '../../../API/ApiComm';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';

import styles from './styles';
import SIStyles from './selectImageStyles.js';

var options = {
  edi_dir: global.address,
  edi_ema: global.email,
  edi_pub: false,
  edi_tel: global.phone,
  edi_sub_cat: global.buildSubCategory,
  edi_cat: global.buildCategory,
  edi_name: global.buildName,
  pev_ttl: '',
  vae: {
    "vae[0]": null,
    "vae[1]": null,
    "vae[2]": null,
    "vae[3]": null,
    "vae[4]": null,
  },
  eup_cmn: '',
  ima_img: '',
  category: '',
  subcategory: ''
}

var category = 'Seleccionar...';
var subCategory = 'Seleccionar...';

var savedValues = {
  "value_1" : false,
  "value_4" : false,
  "value_5" : false,
  "value_6" : false,
  "value_7" : false,
  "value_8" : false,
  "value_9" : false,
  "value_10": false,
  "value_11": false,
  "value_12": false
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

      var id = String(subcategories[i].sub_id);
      var name = String(subcategories[i].sub_nam);

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
        options.edi_sub_cat = parseInt(this.subCategories[k].id);
      }
    }
  }

  _validateEmail(email) {
    if(!validator.validate(email) && email != '') {
      this.setState({ errorValidation: 'El correo ingresado no es válido' });
    } else {
      this.setState({ errorValidation: '' });
      options.edi_ema = email;
    }
  }

  render() {
    return(
        <KeyboardAwareScrollView style={styles.content} extraScrollHeight={65}>

          <Text style={styles.title}>Datos principales</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Nombre:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' placeholder={global.buildName} style={styles.inputForm} onChangeText={(val) => {options.pev_ttl = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup2}>
            <Text style={styles.textForm}>Categoría:</Text>
            <View>
              <TextInput value={this.state.category} onFocus={this._showCategoriesPicker.bind(this)} placeholder={global.buildCategory} style={styles.picker}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup2}>
            <Text style={[styles.textForm]}>Sub-Categoría:</Text>
            <View>
              <TextInput value={this.state.subCategory} editable={this.state.editable} onFocus={this._showSubCategoriesPicker.bind(this)} placeholder={global.buildSubCategory}  style={styles.picker}></TextInput>
            </View>
          </View>

          <Text style={[styles.title, {marginTop: 25}]}>Datos de contacto del lugar (opcional)</Text>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Dirección:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' placeholder={global.address} style={styles.inputForm} onChangeText={(val) => {options.edi_dir = val}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Teléfono:</Text>
            <View style={styles.contentInput}>
              <TextInput underlineColorAndroid='transparent' placeholder={global.phone} style={styles.inputForm} keyboardType="numeric" onChangeText={(val) => {options.edi_tel = Number(val)}}></TextInput>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Correo electrónico:</Text>
            <View style={styles.contentInput}>
              <Text style={{fontWeight:'bold', fontSize: 16, color:'red'}}>{this.state.errorValidation}</Text>
              <TextInput underlineColorAndroid='transparent' placeholder={global.mail} style={styles.inputForm} keyboardType="email-address" onChangeText={(value) => this._validateEmail(value)}></TextInput>
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
        value_1: false,
        value_4: false,
        value_5: false,
        value_6: false,
        value_7: false,
        value_8: false,
        value_9: false,
        value_10: false,
        value_11: false,
        value_12: false,
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
          case 'value_1':
            if(this.state.update['value_4']) {
              update['value_4'] = !this.state.update['value_4'];
              savedValues['value_4'] = !savedValues['value_4'];
            }
            break;
          case 'value_4':
            if(this.state.update['value_1']) {
              update['value_1'] = !this.state.update['value_1'];
              savedValues['value_1'] = !savedValues['value_1'];
            }
            break;
          case 'value_6':
          case 'value_8':
          case 'value_10':
          case 'value_12':
              if (this.state.update[('value_') + (value - 1)]) {
                 update[('value_') + (value - 1)] = !this.state.update[('value_') + (value - 1)];
                 savedValues[('value_') + (value - 1)] = !savedValues[('value_') + (value - 1)];
              }
            break;
          case 'value_5':
          case 'value_7':
          case 'value_9':
          case 'value_11':
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

export default class AddBuild extends Component {

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
    console.log("builData", global.builData)
    show = 0;
    this.setState({ visible: true });

      API.getCategoriesBuilding().then(json => {

        var j = json.data

        if (j.length > 0) {

          for (var i = 0; i < j.length; i++) {

            var id = String(j[i].cat_id);
            var name = String(j[i].cat_nam);

            this.categories.push(
              {
                id: id,
                name: name,
                subcategories: j[i].cat_sub
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

      API.getEvaluationAlternativesByBuilding().then(json => {

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

  componentDidMount() {
    this.advertisment.modalBehavior();
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

  _didTapEditBuild() {
    options.ima_img = image;
    let data = {
      id: global.id,
      email: options.edi_ema,
      phone: options.edi_tel,
      sub: options.edi_sub_cat,
      name: options.pev_ttl,
      latitude: global.latitude,
      longitude: global.longitude,
      comment: options.eup_cmn,
      image: options.ima_img,
      zero: options.vae["vae[0]"],
      one: options.vae["vae[1]"],
      two: options.vae["vae[2]"],
      three: options.vae["vae[3]"],
      four: options.vae["vae[4]"],
      dir: options.edi_dir
    }
    this.setState({ visible: true });
    API.editBuild(data).then(json =>{
        this.setState({ visible: false });
        this._clearObject();
        this.success.modalBehavior();
    }).catch(error => {
        this.setState({ visible: false });
        this._clearObject();
        this.setState({ response: 'Se ha producido un error, intentelo más tarde' })
        this.warning.modalBehavior();
    });
  }

  _clearObject(){
      category = 'Seleccionar...';
      subCategory = 'Seleccionar...';
      image  = 'image_default';
      options = {
        edi_dir: '',
        edi_ema: '',
        edi_pub: false,
        edi_tel: '',
        edi_sub_cat: '',
        pev_ttl: '',
        vae: {
            "vae[0]": null,
            "vae[1]": null,
            "vae[2]": null,
            "vae[3]": null,
            "vae[4]": null,
        },
        eup_cmn: '',
        ima_img: '',
        category: '',
        subcategory: ''
      }
      savedValues = {
        "value_1" : false,
        "value_4" : false,
        "value_5" : false,
        "value_6" : false,
        "value_7" : false,
        "value_8" : false,
        "value_9" : false,
        "value_10": false,
        "value_11": false,
        "value_12": false
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
              <SpinnerCustom visible={this.state.visible}/>
              <HeaderAdd title='Editar edificación' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
              <NavigationBar selected1="1" actionSecond={() => this._nextView()} actionLast={() => this.didTap(1)}/>
              <Description categories={this.categories} categoriesNames={this.categoriesNames}/>
              <ModalWarning ref={(first) => { this.first = first; }}  icon="alert" title="Error" background="#FD6B6B" text='Al seleccionar una categoría, debes elegir una sub-categoría'/>
              <ModalWarning ref={(advertisment) => { this.advertisment = advertisment; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="Solo agrega los campos que deseas editar"/>
            </View>
          );
          break;
      case 1:
        return (
          <View style={styles.container}>
            <HeaderAdd title='Editar edificación' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
            <NavigationBar selected2="2" actionFirst={() => this._backView()} actionLast={() => this._nextView()}/>
            <Accesibility evs={this.evaluations}/>
          </View>
        );
        break;
      case 2:
        return (
          <View style={styles.container}>
            <SpinnerCustom visible={this.state.visible}/>
            <HeaderAdd title='Editar edificación' actionBack={() => this._backView()} actionNext={() => this._nextView()}/>
            <NavigationBar selected3="3" actionFirst={() => this.didTapFirst()} actionSecond={() => this.didTap(0)}/>
            <SelectImage action={() => this._didTapEditBuild()}/>
            <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text='Se ha producido un error'/>
            <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="La edificación ha sido editada" destine='main'/>
          </View>
        );
        default:
          break;
      }
  }
}