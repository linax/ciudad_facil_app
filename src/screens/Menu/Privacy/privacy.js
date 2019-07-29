'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-simple-modal';

import Header from '../../../components/common/Header/header';

import styles from './styles';
import commonStyles from '../../commonStyles';

class Privacy extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title='Privacidad'/>
				<ScrollView style={{padding: 20, marginBottom: 20}}>
					<Text style={[commonStyles.text, {fontWeight: 'bold', fontSize: 14}]}>Política de Privacidad:</Text>
					<Text style={[commonStyles.text, {textAlign: 'justify',fontSize: 14, marginBottom: 20}]}>Ciudad Fácil es una aplicación desarrollada por la AsociacIón Ciudad Fácil  en el año 2014 para permitir  que usuarios de dispositivos móviles con sistema operativo Android  de diferentes partes del mundo puedan marcar edificaciones, espacios públicos, veredas, cruces y estacionamientos, respondiendo una breve pauta para evaluar su nivel de accesibilidad.</Text>
					<Text style={[commonStyles.text, {textAlign: 'justify',fontSize: 14, marginBottom: 10}]}>Recientemente, Asociación Ciudad Fácil ha recibido el apoyo del Servicio Nacional de la Discapacidad, de Chile, para que ésta aplicación pueda ser utilizada no sólo en dispositivos  Android, sino también en iOS.</Text>
					<Text style={[commonStyles.text, {fontWeight: 'bold', fontSize: 14, marginTop:10}]}>Datos personales usados en la aplicación:</Text>
					<Text style={[commonStyles.text, {textAlign: 'justify',fontSize: 14, marginBottom: 10}]}>Esta aplicación utilizará datos personales de los usuarios tales como: perfil de redes sociales, nombre, correo electrónico y tipo de discapacidad. Dicha información será resguardada por la asociación con carácter confidencial. Sólo excepcionalmente, los datos referentes a discapacidad se usarán para realizar estudios estadísticos en esta materia.</Text>
					<Text style={[commonStyles.text, {fontWeight: 'bold', fontSize: 14, marginTop:10}]}>Datos de evaluaciones y marcadores:</Text>
					<Text style={[commonStyles.text, {textAlign: 'justify',fontSize: 14, paddingBottom: 20}]}>Cada lugar agregado, evaluado y comentado en la aplicación tendrá asociado el usuario que realizó esta acción y de esta forma, el nombre del usuario será visible por medio de la aplicación.
Los datos relativos a la evaluación de los distintos puntos en el mapa podrán ser divulgados públicamente por la organización a través de análisis, publicación de datos y estadísticas.</Text>
				</ScrollView>

			</View>
		);
	}
}

export default Privacy;
