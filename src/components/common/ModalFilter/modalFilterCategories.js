'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import Picker from 'react-native-picker';

import userDefaults from '../../../userDefaults.js';
import API from '../../../API/ApiComm';

import styles from './styles';
import stylesCAT from './stylesCategories';

export default class ModalFilterCategories extends Component  {

	constructor(props) {
		super(props);

    this.categories = [];
    this.categoriesNames = [];
    this.subCategories = [];
    this.subCategoriesNames = [];

		this.state = {
			open: false,
      value: 2,
      category: '',
      subCategory: '',
      editable: false,
      disabled: true
		}
	}

  didTapClose() {
    this.categories = [];
    this.categoriesNames = [];
    this.subCategories = [];
    this.subCategoriesNames = [];
    this.modalBehavior();
    this.setState({
      category: '',
      subCategory: '',
      disabled: true
    });
    global.showClose = true;
    this.props.filter();
  }

  didTapFilterCategories() {
    this.categories = [];
    this.categoriesNames = [];
    this.subCategories = [];
    this.subCategoriesNames = [];
    this.setState({
      category: '',
      subCategory: '',
      disabled: true
    });
    global.filter = this.state.subCategory;
    this.props.filterCategory();
    this.didTapClose();
  }

	modalBehavior() {
	  var behavior = !(this.state.open);
	  this.setState({ open: behavior });
	}

  getBuildsCategories() {
    API.getCategoriesBuilding().then(json => {

      var j = json.data;
      this.categories = [];
      this.categoriesNames = [];

      if (j.length > 0) {
        for (var i = 0; i < j.length; i++) {
          var name = String(j[i].cat_nam);

          this.categoriesNames.push(
            name
          )

          this.categories.push(
            {
              name: name,
              subcategories: j[i].cat_sub
            }
          )
        }
      }

    }).catch(error => {
      console.log(error);
    });
  }

  _selectedBuildCategory(value) {

    this.setState({ category: value });
    var categories = this.categories;

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

  getPublicSpaceCategories() {
    API.getCategoriesPublicSpace().then(json => {

      var j = json.data;
      this.categories = [];
      this.categoriesNames = [];

      if (j.length > 0) {
        for (var i = 0; i < j.length; i++) {
          var name = String(j[i].cep_nam);

          this.categoriesNames.push(
            name
          )

          this.categories.push(
            {
              name: name,
              subcategories: j[i].cep_ces
            }
          )
        }
      }
    }).catch(error => {
      console.log(error);
    });
  }

  _selectedPublicSpaceCategory(value) {

    this.setState({ category: value });
    var categories = this.categories;

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
      pickerData: this.categoriesNames,
      onPickerConfirm: pickedValue => {
        if(global.filter == 2) {
          this._selectedBuildCategory(pickedValue.toString());
        } else {
          this._selectedPublicSpaceCategory(pickedValue.toString());
        }
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Selecciona categoría',
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
        this.setState({
          subCategory: pickedValue.toString(),
          disabled: false
        });
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Selecciona sub-categoría',
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Cancelar'
    });

    Picker.show()
  }

  showBuildsCategories() {
      return (
        <View>
          <View style={stylesCAT.formGroup3}>
            <Text style={stylesCAT.textForm}>Categoría:</Text>
            <View>
              <TextInput value={this.state.category} onFocus={this._showCategoriesPicker.bind(this)} placeholder="Seleccionar..." style={stylesCAT.picker}></TextInput>
            </View>
          </View>

          <View style={stylesCAT.formGroup3}>
            <Text style={[stylesCAT.textForm]}>Sub-Categoría:</Text>
            <View>
              <TextInput value={this.state.subCategory} editable={this.state.editable} onFocus={this._showSubCategoriesPicker.bind(this)} placeholder="Seleccionar..." style={stylesCAT.picker}></TextInput>
            </View>
          </View>
        </View>
      );
  }

  showPublicSpaceCategories() {
      return (
        <View>
          <View style={stylesCAT.formGroup3}>
            <Text style={stylesCAT.textForm}>Categoría:</Text>
            <View>
              <TextInput value={this.state.category} onFocus={this._showCategoriesPicker.bind(this)} placeholder="Seleccionar..." style={stylesCAT.picker}></TextInput>
            </View>
          </View>

          <View style={stylesCAT.formGroup3}>
            <Text style={[stylesCAT.textForm]}>Sub-Categoría:</Text>
            <View>
              <TextInput value={this.state.subCategory} editable={this.state.editable} onFocus={this._showSubCategoriesPicker.bind(this)} placeholder="Seleccionar..." style={stylesCAT.picker}></TextInput>
            </View>
          </View>
        </View>
      );
  }

  _showCategoriesSidewalkPicker() {

    Keyboard.dismiss();
    
    let data = ['Veredas', 'Cruces'];

    Picker.init({
      pickerData: data,
      onPickerConfirm: pickedValue => {
          var category = pickedValue.toString();
          this.setState({
            category: category,
            subCategory: category,
            disabled: false
          });
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Selecciona categoría',
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Cancelar'
    });

    Picker.show()
  }

  showSidewalkCategories() {
      return (
        <View style={stylesCAT.formGroup3}>
          <Text style={stylesCAT.textForm}>Categoría:</Text>
          <View>
            <TextInput value={this.state.category} onFocus={this._showCategoriesSidewalkPicker.bind(this)} placeholder="Seleccionar..." style={stylesCAT.picker}></TextInput>
          </View>
        </View>
      );
  }


  renderShow() {

    switch(global.filter) {
      case 2:
        this.getBuildsCategories();
        return this.showBuildsCategories();
        break;
      case 3:
        this.getPublicSpaceCategories()
        return this.showPublicSpaceCategories();
        break;
      case 4:
        // return this.showSidewalkCategories();
        break;
    }
  }

  didTapExit() {
    this.categories = [];
    this.categoriesNames = [];
    this.subCategories = [];
    this.subCategoriesNames = [];
    this.setState({ open: false, disabled: true, category: '', subCategory: '' });
  }

	render() {
	  return (
      <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidClose={() => this.didTapExit()}
          modalStyle={[styles.modalContainer, stylesCAT.modalRewrite]}
          >
          <View style={[styles.backgroundTitle, {backgroundColor: this.props.background}]}>
            <Text style={styles.title}><Icon name={this.props.icon} size={20} color="#FFFFFF"/> {this.props.title}</Text>
          </View>
                <View style={{padding: 10}}>
                  <Text style={{textAlign: 'center'}}>¿Buscas alguna categoría en particular?</Text>
                  {
                    this.renderShow()
                  }
                </View>

          <View>
            <TouchableOpacity style={styles.accept} disabled={this.state.disabled} onPress={() => this.didTapFilterCategories()}>
              <Text style={this.state.disabled ? {color: '#939597'} : {color: '#999999', fontWeight: 'bold'}}>Filtrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accept} onPress={() => this.didTapClose()}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Ver todos</Text>
            </TouchableOpacity>
          </View>
      </Modal>
	  );
	}
};