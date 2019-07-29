'use strict';

import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, AsyncStorage, Linking } from 'react-native';

import Modal from 'react-native-simple-modal';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box'
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Entypo';
import SpinnerCustom from '../../components/common/Spinner/spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import API from '../../API/ApiComm';
import ModalWarning from '../../components/common/ModalWarning/modalWarning';
import ModalInfoPrivacy from '../../components/common/ModalInfo/modalPrivacyLogin';
import userDefaults from '../../userDefaults.js';
import styles from './styles';
import commonStyles from '../commonStyles';

var authUrl = 'http://ciudad-facil.perceptum.cl/login/facebook';

var social = {
	facebook: {},
	twitter: {}
}

class Login extends Component {

	constructor(props) {
		super(props);

		this.provider = '';

		this.state = {
			email: '',
			password: '',
			fb_tkn: '',
			tw_tkn: '',
			user: [],
			credentials: [],
			open: false,
			disability: false,
			disability_type: 5,
			data: {},
			message: '',
			visible: false
		}
	}

	_LoginUser() {
		var data = {
			email: this.state.email,
			password: this.state.password
		};
		if (this.state.email == "" || this.state.password == "") {
			this.setState({ message: 'Debes ingresar usuario y contraseña.' });
			this.foo.modalBehavior();
			return
		}
		this.setState({ visible: true })
		API.postLoginUser(data).then(json => {
			this.setState({ visible: false })
		    try {
			    if (json.token != null) {
			      	AsyncStorage.setItem('auth_token', json.token);
			      	global.auth_token = json.token;
			      	Actions.Main();
			    } else {
			      	this.setState({ message: json.message });
			      	this.foo.modalBehavior();
			      }
			    } catch (error) {
			      console.log('AsyncStorage error: ' + error.message);
			    }
		}).catch(error => {
			this.setState({ visible: false })
			console.log(error)
			if (error == 'auth') {
				this.setState({ message: 'Usuario o password incorrectos' });
			} else {
				this.setState({ message: 'Ha ocurrido un problema' });
			}
			this.foo.modalBehavior();
		});
	}

	_makeLogin() {
		AsyncStorage.setItem('privacy', 'showed');
		//var url = 'http://ciudad-facil.perceptum.cl/redirect' // Dev
		var url = 'http://api.ciudadfacil.cl/redirect' // Prod
		if (this.provider === 'facebook' ) {
			url = url + '/facebook/'
		} else {
			url = url + '/twitter/'
		}

		Actions.Web({ url: url });

	}

	_socialLogin(provider) {
		this.provider = provider;
		AsyncStorage.getItem('privacy').then((keyValue) => {
			if(keyValue === null) {
				this.info.modalBehavior();
			} else {
				this._makeLogin();
			}
		});
	}

	_modalRegisterButton() {
		if (this.state.disability) {
			if (this.state.disability_type != 5) {
				this.setState({open: false});
				this.state.data.disability = this.state.disability;
				this.state.data.disability_type = this.state.disability_type;
				console.log(this.state.data);
				API.updateSocialUser(this.state.data).then(json => {
					console.log(json);
					Actions.Main();
				}).catch((error) => console.log ("Error:", error))
			}
		} else {
			this.setState({open: false});
			API.updateSocialUser(this.state.data).then(json =>{
				global.setReload = 0;
				Actions.Main();
			}).catch((error) => console.log("Error:", error))
		}
	}

	render() {
		return (
			<KeyboardAwareScrollView>
			<View style={styles.container}>
				<SpinnerCustom visible={this.state.visible}/>
				<View style={styles.containerLogo}>
					<View style={styles.containerClose}>
						<TouchableOpacity onPress={() => Actions.pop()}>
							<Icon name="cross" color="#FFFFFF" size={30}/>
						</TouchableOpacity>
					</View>
					<View><Image source={require('../../images/logo.png')}></Image></View>
				</View>

				<View style={styles.containerLogin}>

					<View style={styles.containerInput}>
						<TextInput
							style={styles.dataInput}
							placeholder="Email"
							onChangeText={(text) => this.setState({email : text})}
							underlineColorAndroid='transparent'
							autoCapitalize='none'
							>
						</TextInput>
						<Image source={require('../../images/user.png')} style={styles.icon}></Image>
					</View>

					<View style={styles.containerInput}>
						<TextInput
							style={styles.dataInput}
							placeholder="Contraseña"
							onChangeText={(val) => this.setState({password : val})}
							underlineColorAndroid='transparent'
							secureTextEntry={true}
							>
						</TextInput>
						<Image source={require('../../images/key.png')} style={styles.icon}></Image>
					</View>

					<TouchableOpacity style={styles.buttonLogin} onPress={() => this._LoginUser()}>
						<Text style={styles.textLogin}>Ingresar</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.containerSocial}>
			        {
			          Object.keys(social).map((provider, i) => {
			            return (
			              <TouchableOpacity
			                key={provider}
			                style={styles[provider]}
			                onPress={this._socialLogin.bind(this, provider)}>
			                <Text style={[styles.textLogin2]}>Login con {provider.split('-')[0]}</Text>
			              </TouchableOpacity>
			            );
			          })
			        }
				</View>
				<TouchableOpacity style={styles.registerContainer}  onPress={() => Actions.Register()}>
			        <Text style={styles.register}>¿Aún no tienes una cuenta? <Text style={{fontWeight: 'bold'}}>Regístrate</Text></Text>
			    </TouchableOpacity>
       			<ModalWarning ref={(foo) => { this.foo = foo; }}  icon="alert-circle" title="Error" background="#FD6B6B" text={this.state.message}/>
       			<ModalInfoPrivacy ref={(info) => { this.info = info; }} action={() => this._makeLogin()}/>
			</View>
			</KeyboardAwareScrollView>
		);
	}
}

export default Login;
