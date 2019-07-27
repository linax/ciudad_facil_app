'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import validator from 'email-validator';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from '../../components/common/Modal/modal';
import Picker from 'react-native-picker';
import SpinnerCustom from '../../components/common/Spinner/spinner';

import Header from '../../components/common/Header/header';
import ModalWarning from '../../components/common/ModalWarning/modalWarning';
import ModalInfoPrivacy from '../../components/common/ModalInfo/modalInfoPrivacy';
import API from '../../API/ApiComm';

import styles from './styles';

class Register extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'names'    : '',
			'surname1' : '',
			'surname2' : '',
			'user_name': '',
			'email'    : '',
			'disability': false,
			'disability_type': 5,
			'password': '',
			'errorPass': '',
			'errorMail': '',
			'pressed1': false,
			'pressed2': false,
			'pressed3': false,
			'pressed4': false,
			'pressed5': false,
			'pressed6': false,
			'register': true,
			'disability_value': '',
			visible: false,
			errorMessage: "Se ha producido un error"
		}
	}

	_comparePasswords(passwordConfirmation) {
		if (this.state.password != passwordConfirmation) {
			this.setState({ errorPass : 'Las contraseñas no coinciden' });
		} else {
			this.setState({ errorPass: '' });
			this.setState({ register: false })
		}
	}

	_validateEmail(email) {
		if (!validator.validate(email)) {
			this.setState({ errorMail: 'Correo no válido' });
		} else {
			this.setState({ errorMail: '' });
			this.setState({ pressed5: true });
			this.setState({ email: email});
		}
	}

	_registerUser() {
		this.setState({ visible: true });
		var data = {
			names: this.state.names,
			surname1: this.state.surname1,
			surname2: this.state.surname2,
			user_name: this.state.user_name,
			email: this.state.email,
			disability: this.state.disability,
			disability_type: this.state.disability_type,
			password: this.state.password,
		};
		API.postRegisterUser(data).then(json =>{
			console.log(json);
			this.setState({ visible: false });
			this.warning2.modalBehavior();
		}).catch(error => {
			this._setErrorToShow(error.message)
			this.warning.modalBehavior();
			this.setState({ visible: false, error });
		});
	}

	_setErrorToShow(message) {
		console.log(message)
		if(error == 'no-connection') {
          	this.setState({ errorMessage: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
        }
		// Email usado
		else if (message.usu_eml && message.usu_eml.length > 0 && message.usu_eml[0] == "The usu eml has already been taken.") {
			this.setState({
				errorMessage: "El email de usuario ya esta siendo usado. Por favor elige otro."
			})
		} else if(message.usu_nbr_usr && message.usu_nbr_usr.length > 0 && message.usu_nbr_usr[0] == "The usu nbr usr has already been taken.") {
			this.setState({
				errorMessage: "El nombre de usuario ya esta siendo usado. Por favor elige otro."
			})
		} else {
			this.setState({
				errorMessage: "Se ha producido un error."
			})
		}
	}

  _showCategoriesPicker() {

  	Keyboard.dismiss();

  	if(this.state.disability) {
	    let data = ['Fisica', 'Visual', 'Auditiva', 'Psiquica', 'Intelectual'];

	    Picker.init({
	      pickerData: data,
	      onPickerConfirm: pickedValue => {
	          var value = pickedValue.toString();
	          var index = data.indexOf(value);
	          console.log(index);
	          this.setState({ disability_type: index, disability_value: value })
	      },
	      pickerConfirmBtnColor: [60,200,130,1],
	      pickerCancelBtnColor: [0,0,0,1],
	      pickerTitleText: 'Discapacidad',
	      pickerConfirmBtnText: 'Confirmar',
	      pickerCancelBtnText: 'Cancelar'
	    });

	    Picker.show()
	}
  }

  _accountCreated() {
  	Actions.pop()
  }

	componentDidMount() {
	    this.info.modalBehavior();
	}

	render() {
		return (
			<View style={styles.container}>
				<SpinnerCustom visible={this.state.visible}/>
				<Header title='Registro'/>

				<KeyboardAwareScrollView>

					<View style={styles.containerForm}>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Nombre:</Text>
							<TextInput underlineColorAndroid='transparent' onChangeText={(val) => this.setState({names: val, pressed1: true})} style={styles.dataInput}></TextInput>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Apellido Paterno:</Text>
							<TextInput underlineColorAndroid='transparent' onChangeText={(val) => this.setState({surname1: val, pressed2: true})} style={[styles.dataInput, this.state.pressed1 ? {} : {backgroundColor: '#bcbcbc'}]} editable={this.state.pressed1}></TextInput>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Apellido Materno:</Text>
							<TextInput underlineColorAndroid='transparent' onChangeText={(val) => this.setState({surname2: val, pressed3: true})} style={[styles.dataInput, this.state.pressed2 ? {} : {backgroundColor: '#bcbcbc'}]} editable={this.state.pressed2}></TextInput>
						</View>

						<View style={styles.separator}/>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Nombre de Usuario:</Text>
							<TextInput underlineColorAndroid='transparent' onChangeText={(val) => this.setState({user_name: val, pressed4: true})} style={[styles.dataInput, this.state.pressed3 ? {} : {backgroundColor: '#bcbcbc'}]} editable={this.state.pressed3}></TextInput>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Correo Electrónico:</Text>
							<TextInput underlineColorAndroid='transparent' keyboardType="email-address" onChangeText={(val) => this._validateEmail(val)} style={[styles.dataInput, this.state.pressed4 ? {} : {backgroundColor: '#bcbcbc'}]} editable={this.state.pressed4}></TextInput>
						</View>

						<Text style={styles.error}>{this.state.errorMail}</Text>

						<View style={styles.separator}/>

						<View style={styles.formGroup}>
							 <CheckBox
							     style={{flex: 1}}
							     rightText="Soy una persona con discapacidad"
							     onClick={(val) => this.setState({disability: !this.state.disability})}
							 />

              				<TextInput value={this.state.disability_value} onFocus={this._showCategoriesPicker.bind(this)} placeholder="Seleccionar una discapacidad" editable={this.state.disability} style={styles.picker}></TextInput>
						</View>

						<View style={styles.separator}/>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Contraseña:</Text>
							<TextInput underlineColorAndroid='transparent' onChangeText={(val) => this.setState({password: val, pressed6: true})} style={[styles.dataInput, this.state.pressed5 ? {} : {backgroundColor: '#bcbcbc'}]} editable={this.state.pressed5} secureTextEntry={true}></TextInput>
						</View>

						<View style={styles.formGroup}>
							<Text style={styles.textTitle}>Confirmar contraseña:</Text>
							<TextInput underlineColorAndroid='transparent' onChangeText={(val) => this._comparePasswords(val)} style={[styles.dataInput, this.state.pressed6 ? {} : {backgroundColor: '#bcbcbc'}]} editable={this.state.pressed6} secureTextEntry={true}></TextInput>
						</View>

						<Text style={styles.error}>{this.state.errorPass}</Text>

						<TouchableOpacity style={[styles.button, this.state.register ? {backgroundColor: '#bcbcbc'} : {backgroundColor: '#3CC882'}]} onPress={() => this._registerUser()} disabled={false}>
							<Text style={[styles.text, this.state.register ? {color:'#979797'} : {color: '#FFFFFF'}]}>Registrarse</Text>
						</TouchableOpacity>

					</View>
				</KeyboardAwareScrollView>
				<ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.errorMessage} />
				<ModalInfoPrivacy ref={(info) => { this.info = info; }} />
				<ModalWarning ref={(warning2) => { this.warning2 = warning2; }}  icon="check" title="Cuenta creada!" background="#3CC882" text="Cuenta creada exitosamente. Te hemos enviado un email para validar tu cuenta." onPress={() => this._accountCreated()}/>
			</View>
		);
	}
}

export default Register;