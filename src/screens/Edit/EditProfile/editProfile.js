'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native';

import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import Picker from 'react-native-picker';
import SpinnerCustom from '../../../components/common/Spinner/spinner';

import API from '../../../API/ApiComm';

import Header from '../../../components/common/Header/header';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalReload from '../../../components/common/ModalReload/modalReload';
import AsyncStorageHelper from '../../../components/common/Helpers/AsyncStorageHelper';

import styles from './styles';

class Profile extends Component {

	constructor(props) {
		super(props);

		this.data = ['Fisica', 'Visual', 'Auditiva', 'Psiquica', 'Intelectual'];

		this.state = {
			names  : null,
			surname1 : null,
			surname2 : null,
			user_name: null,
			disability: (global.discapacity != null),
			startDisability: (global.discapacity != null),
			disability_type: 5,
			visible: false,
			disability_value: this.data[global.discapacity],
			startDisabilityValue: this.data[global.discapacity],
			errorText: "Se ha producido un error"
		}
	}

    componentDidMount() {
        this.advertisment.modalBehavior();
    }

    _updateUser(){
    	var disability_type = (this.state.disability) ? this.state.disability_type : 0
    	var disability = (disability_type == 5) ? false : this.state.disability

    	var data = {}

    	if (this.state.user_name != null) {
    		data["usu_nbr_usr"] = this.state.user_name
    	}
    	if (this.state.names != null) {
    		data["usu_nmb"] = this.state.names
    	}
    	if (this.state.surname1 != null) {
    		data["usu_apl_ptr"] = this.state.surname1
    	}
    	if (this.state.surname2 != null) {
    		data["usu_apl_mtr"] = this.state.surname2
    	}
    	if (this.state.disability != this.state.startDisability || this.state.disability_value != this.state.startDisabilityValue) {
    		data["usu_dsc"] = disability
    		data["usu_tpo_dsc"] = disability_type
    	}
    	console.log("data", data)

    	this.setState({ visible: true });
    	API.updateUser(data).then(json => {
    		if (data["usu_nbr_usr"]) {
    			global.user_name = data["usu_nbr_usr"]
    			AsyncStorageHelper.setUsername(data["usu_nbr_usr"])
    		}
    		if (data["usu_nmb"]) {
    			global.names = data["name"]
    			AsyncStorageHelper.setName(data["name"])
    		}
    		if (data["usu_apl_ptr"]) {
    			global.surname1 = data["surname1"]
    		}
    		if (data["usu_apl_mtr"]) {
    			global.surname2 = data["surname2"]
    		}

    		this.setState({ visible: false });
    		this.success.modalBehavior();
    	}).catch(error => {
    		if(error == 'no-connection') {
          		this.setState({ errorText: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
        	}
    		else if (error.message && error.message.usu_nbr_usr && error.message.usu_nbr_usr.length > 0 && error.message.usu_nbr_usr[0] == "The usu nbr usr has already been taken.") {
    			this.setState({
    				errorText: "El nombre de usuario ya esta ocupado."
    			})
    		}
    		this.setState({ visible: false });
    		console.log(error);
			this.warning.modalBehavior();
    	});
    }

  _showCategoriesPicker() {

  	Keyboard.dismiss();

  	if(this.state.disability) {
  		//var selectedValue = (this.state.disability_value == "") ? this.data[0] : this.state.disability_value;
	    Picker.init({
	      pickerData: this.data,
	      onPickerConfirm: pickedValue => {
	          var value = pickedValue.toString();
	          var index = this.data.indexOf(value);
	          console.log(index);
	          this.setState({ disability_type: index, disability_value: value })
	      },
	      pickerConfirmBtnColor: [60,200,130,1],
	      pickerCancelBtnColor: [0,0,0,1],
	      pickerTitleText: 'Discapacidad',
	      pickerConfirmBtnText: 'Confirmar',
	      pickerCancelBtnText: 'Cancelar',
	    });

	    Picker.show()
	}
  }

  renderTextInputDisability() {
  	if (this.state.disability) {
  		return (
  			<TextInput value={this.state.disability_value} onFocus={this._showCategoriesPicker.bind(this)} placeholder={this.state.disability_value} editable={this.state.disability} style={styles.picker}></TextInput>
  		)
  	}
  	else {
  		return null
  	}
  }

	render() {
		return (
			<View style={styles.container}>
				<SpinnerCustom visible={this.state.visible}/>
				<Header title='Editar perfil'/>

				<ScrollView style={styles.containerForm}>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Nombre:</Text>
							<TextInput underlineColorAndroid='transparent' placeholder={global.names} onChangeText={(val) => this.setState({names: val})} style={styles.dataInput}></TextInput>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Apellido Paterno:</Text>
							<TextInput underlineColorAndroid='transparent' placeholder={global.surname1} onChangeText={(val) => this.setState({surname1: val})} style={styles.dataInput} editable={this.state.pressed1}></TextInput>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Apellido Materno:</Text>
							<TextInput underlineColorAndroid='transparent' placeholder={global.surname2} onChangeText={(val) => this.setState({surname2: val})} style={styles.dataInput} editable={this.state.pressed2}></TextInput>
						</View>

						<View style={styles.separator}/>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Nombre de Usuario:</Text>
							<TextInput underlineColorAndroid='transparent' placeholder={global.user_name} onChangeText={(val) => this.setState({user_name: val})} style={styles.dataInput} editable={this.state.pressed3}></TextInput>
						</View>

						<View style={styles.separator}/>

						<View style={styles.formGroup}>
							 <CheckBox
							     style={{flex: 1}}
							     rightText="Soy una persona con discapacidad"
							     isChecked={this.state.disability}
							     onClick={(val) => this.setState({disability: !this.state.disability})}
							 />
							 {this.renderTextInputDisability()}
						</View>

						<View style={styles.separator}/>

						<TouchableOpacity style={[styles.button, {backgroundColor: '#3CC882'}]} onPress={() => this._updateUser()} disabled={false}>
							<Text style={[styles.text, {color: '#FFFFFF'}]}>Actualizar</Text>
						</TouchableOpacity>

				</ScrollView>

				<ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="Se han actualizado tus datos" destine='main' reload={() => Actions.pop({popNum: 2})}/>
				<ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.errorText}/>
				<ModalWarning ref={(advertisment) => { this.advertisment = advertisment; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="Solo agrega los campos que deseas editar"/>
			</View>
		);
	}
}

export default Profile;