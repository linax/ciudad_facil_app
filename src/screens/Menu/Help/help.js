'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Modal from 'react-native-simple-modal';

import Header from '../../../components/common/Header/header';

import styles from './styles';

class Help extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			text: ''
		}
	}

	_showMeaning(icon) {
		this.setState({ open: true });
		switch(icon){
			case 'build':
				this.setState({ text: 'Lugar que describe una Edificación'});
				break;
			case 'car':
				this.setState({ text: 'Lugar que describe una Estacionamiento'});
				break;
			case 'corner':
				this.setState({ text: 'Lugar que describe una Vereda o Cruce'});
				break;
			case 'public_area':
				this.setState({ text: 'Lugar que describe un Area pública'});
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title='Ayuda'/>
				<ScrollView>
					<View style={styles.simbology}>
						<Text style={styles.content}>Presione sobre los iconos para saber su significado:</Text>
						<View style={styles.firstRowIcons}>
							<TouchableOpacity onPress={() => this._showMeaning('build')}><Image source={{ uri: 'build_1'}} style={styles.icon}/></TouchableOpacity>
							<TouchableOpacity onPress={() => this._showMeaning('car')}><Image source={{ uri: 'car_2'}} style={styles.icon}/></TouchableOpacity>
							<TouchableOpacity onPress={() => this._showMeaning('corner')}><Image source={{ uri: 'corner_0'}} style={styles.icon}/></TouchableOpacity>
							<TouchableOpacity onPress={() => this._showMeaning('public_area')}><Image source={{ uri: 'public_2'}} style={styles.icon}/></TouchableOpacity>
						</View>
						<View style={styles.secondRowIcons}>
						</View>
					</View>

					<View style={styles.addInfo}>
						<Text style={styles.title}>¿Cómo agregar marcadores?</Text>
						<Text style={styles.content}>Para agregar un nuevo marcador debe presionar por dos 
						segundos el mapa en la posición donde desee agregar el nuevo marcador.</Text>
					</View>

					<View style={styles.editInfo}>
						<Text style={styles.title}>¿Cómo eliminar o editar marcadores?</Text>
						<Text style={styles.content}>Sólo se pueden eliminar o editar marcadores que haya ingresado uno mismo.
						Para ellos, dirígete a la vista donde se despliega la información del marcador, y elige la opción eliminar
						o editar del menú superior izquierdo.</Text>
						<Text style={[styles.content, {marginBottom: 10, marginTop: 10}]}>A la información del marcador se puede ingresar de diferentes maneras</Text>
						<Text style={[styles.content, {marginBottom: 10}]}>- Presionando sobre un marcador en el mapa.</Text>
						<Text style={[styles.content, {marginBottom: 10}]}>- En la lista de lugares de interés.</Text>
						<Text style={[styles.content, {marginBottom: 10}]}>- En las listas de tu perfil.</Text>
					</View>
				</ScrollView>

				<Modal
	               open={this.state.open}
	               modalDidClose={() => this.setState({open: false})}
	               modalStyle={styles.modalStyle}
	               >
	                <View style={styles.textContainer}>
	                  <Text style={styles.text}>{this.state.text}</Text>
	                </View>

	                <View>
	                  <TouchableHighlight style={styles.add} onPress={() => this.setState({open:false})}>
	                    <Text style={styles.textMoreInfo}>Aceptar</Text>
	                  </TouchableHighlight>
	                </View>
            	</Modal>
			</View>
		);
	}
}

export default Help;
