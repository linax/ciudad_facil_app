'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../../components/common/Header/header';

import styles from './styles';
import commonStyles from '../../commonStyles';

class About extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title='Acerca de'/>
				<ScrollView style={{padding: 20}}>
					<Text style={[commonStyles.text, commonStyles.titleText]}>Acerca de</Text>
					<Text style={[commonStyles.text]}>La aplicación Ciudad Fácil, en su versión 2.0, fue desarrollada por la Asociación Ciudad Fácil, organización sin fines de lucro, con domicilio en Valdivia, y con apoyo del Servicio Nacional de la Discapacidad.</Text>

					<View style={styles.imageContainer}>
						<Image style={[styles.image1, {resizeMode: 'contain'}]} source={require('../../../images/img1.png')}/>
						<Image style={[styles.image2, {resizeMode: 'contain'}]} source={require('../../../images/img2.png')}/>
					</View>

					<Text>Sitio Ciudad fácil: http://ciudadfacil.cl/</Text>

					<View style={{height: 1, backgroundColor: '#505050', marginTop: 20, marginBottom: 20}} />

					<Text style={[commonStyles.text, commonStyles.titleText]}>Créditos</Text>
					<Text style={[commonStyles.text, {marginBottom:10}]}>Mapas: </Text>
					<Text style={[commonStyles.text]}><Icon name="copyright" size={14}/> Colaboradores de OpenStreetMap</Text>
					<Text style={[commonStyles.text]}>Utilizamos <Icon name="copyright" size={14}/> Mapbox en ReactNative (Mapbox iOS SDK, Mapbox Android SDK)</Text>
					<Text style={[commonStyles.text]}>Íconos extraídos del sitio flaticon, con licencia Creative Commons:</Text>

					<View style={styles.imageContainer}>
						<Image style={[styles.image2, {resizeMode: 'contain'}]} source={require('../../../images/icon1.png')}/>
						<Image style={[styles.image2, {resizeMode: 'contain'}]} source={require('../../../images/icon2.png')}/>
						<Image style={[styles.image2, {resizeMode: 'contain'}]} source={require('../../../images/icon3.png')}/>
					</View>

				</ScrollView>

			</View>
		);
	}
}

export default About;
