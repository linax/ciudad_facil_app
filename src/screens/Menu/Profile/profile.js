'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';

import { Actions } from 'react-native-router-flux';
import SpinnerCustom from '../../../components/common/Spinner/spinner';

import Header from '../../../components/common/Header/header';
import EvaluateButton from '../../../components/common/EvaluateButton/evaluateButton';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalSession from '../../../components/common/ModalWarning/modalSession';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';
import AsyncStorageHelper from '../../../components/common/Helpers/AsyncStorageHelper';

import styles from './styles';

import API from '../../../API/ApiComm';

class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			name: '',
			apl: '',
			response: '',
			visible: false,
			image: 'avatar',
			color: '#3CC882'
		}
	}

	selectPhotoTapped() {

		ImageHelper.selectImage({ width: 500, height: 500}, (response) => {
			this.setState({
				image: response
			})
			this.postImage(response);
		})
	}

	componentWillMount() {
		this.setState({ visible: true });
		this._getData();
	}

	postImage(data) {
		this.setState({ visible: true });
		API.postUserImage(data).then(json => {
			this.setState({ visible: false });
	        this.success.modalBehavior();
		}).catch(error => {
			console.log(error);
			this.setState({ visible: false });
			if(error == 'no-connection') {
          		this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
        	}
        	else {
        		this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
        	}
	        this.error.modalBehavior();
		});
	}

	_getData() {
		API.getUserDetails().then(json => {
			var data = json.data;
			console.log("user", data);
			this.setState({
				username: (data.usu_nbr_usr != null) ? data.usu_nbr_usr : '',
				email: (data.usu_eml != null) ? data.usu_eml : '',
				apl: (data.usu_apl_ptr != null) ? data.usu_apl_ptr : '',
				name: (data.usu_nmb != null) ? data.usu_nmb : ''
			});

			if (data.usu_img != null) {
				this.setState({ image: data.usu_img });
			}
			global.discapacity = (data.usu_tpo_dsc != null) ? data.usu_tpo_dsc : ''
			global.user_name = (data.usu_nbr_usr != null) ? data.usu_nbr_usr : ''
			global.names = (data.usu_nmb != null) ? data.usu_nmb : ''
			global.surname1 = (data.usu_apl_ptr != null) ? data.usu_apl_ptr : ''
			global.surname2 = (data.usu_apl_mtr != null) ? data.usu_apl_mtr : ''

			AsyncStorageHelper.setName(global.names)
			AsyncStorageHelper.setUsername(global.user_name)

			this.setState({ visible: false });
			}).catch(error => {
	        this.setState({ visible: false });
	        if(error == 'no-connection') {
          		this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
          		this.error.modalBehavior();
        	}
	        else if(error == 'auth') {
		          this.setState({ response: 'Tu sesión ha caducado, cierra y vuelve a iniciar sesión' });
		          this.session.modalBehavior();
	        } else {
	          this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
	          this.error.modalBehavior();
	        }
	    });
	}

	render() {
		return (
			<View style={styles.container}>
				<SpinnerCustom visible={this.state.visible}/>
				<Header title='Perfil de usuario'/>

				<ScrollView>
					<View style={styles.profile}>
						<TouchableOpacity style={styles.avatar} onPress={() => this.selectPhotoTapped()}>
							<Image source={{uri: this.state.image}} style={styles.avatar}>
								<View style={styles.changePhoto}>
									<Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>Cambiar foto</Text>
								</View>
							</Image>
						</TouchableOpacity>
						<Text style={{fontWeight: 'bold', color: '#606060', marginBottom: 5}}>{this.state.username}</Text>
						<Text style={{color: '#606060', marginBottom: 5}}>{this.state.name} {this.state.apl}</Text>
						<Text style={{ color: '#A2A2A2' }}>{this.state.email}</Text>

						<TouchableOpacity style={styles.editProfile} onPress={() => Actions.EditProfile()}>
							<Text style={styles.textEdit}>Editar perfil</Text>
						</TouchableOpacity>

						<Text style={styles.title}>Ver evaluaciones realizadas:</Text>

						<EvaluateButton imgName={require('../../../images/profile/building.png')}  title="Edificaciones" type="2"/>
						<EvaluateButton imgName={require('../../../images/profile/public-space.png')} title="Espacio público" type="3"/>
						<EvaluateButton imgName={require('../../../images/profile/cross.png')} title="Veredas y cruces" type="4"/>
						<EvaluateButton imgName={require('../../../images/profile/parking.png')} title="Estacionamientos" type="1"/>
					</View>
				</ScrollView>
				<ModalSession ref={(session) => { this.session = session; }}  icon="alert" title="Aviso" background={this.state.color} text={this.state.response}/>
     			<ModalWarning ref={(error) => { this.error = error; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
     			<ModalWarning ref={(success) => { this.success = success; }}  icon="alert" title="Aviso" background="#3CC882" text="Tu foto de perfil se ha agregado con éxito"/>
			</View>
		);
	}
}

export default Profile;