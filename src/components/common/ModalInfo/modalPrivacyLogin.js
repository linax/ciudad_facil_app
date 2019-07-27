'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-simple-modal';

import styles from './styles';

export default class ModalInfoPrivacy extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  modalBehavior() {
    var behavior = !(this.state.open);
    this.setState({ open: behavior });
  }

  render() {
    return (
      <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidClose={() => this.setState({open: false})}
          modalStyle={styles.modalContainer}
          >
          <View style={[styles.backgroundTitle, {backgroundColor: "#3CC882"}]}>
            <Text style={styles.title}><Icon name="info-circle" size={20} color="#FFFFFF"/> Privacidad</Text>
          </View>
          <ScrollView style={styles.contentContainer}>

            <View style={styles.textForm}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Política de Privacidad:</Text>
          <Text style={{textAlign: 'justify',fontSize: 14, marginBottom: 20}}>Ciudad Fácil es una aplicación desarrollada por la AsociacIón Ciudad Fácil  en el año 2014 para permitir  que usuarios de dispositivos móviles con sistema operativo Android  de diferentes partes del mundo puedan marcar edificaciones, espacios públicos, veredas, cruces y estacionamientos, respondiendo una breve pauta para evaluar su nivel de accesibilidad.</Text>
          <Text style={{textAlign: 'justify',fontSize: 14, marginBottom: 10}}>Recientemente, Asociación Ciudad Fácil ha recibido el apoyo del Servicio Nacional de la Discapacidad, de Chile, para que ésta aplicación pueda ser utilizada no sólo en dispositivos  Android, sino también en iOS.</Text>
          <Text style={{fontWeight: 'bold', fontSize: 14, marginTop:10}}>Datos personales usados en la aplicación:</Text>
          <Text style={{textAlign: 'justify',fontSize: 14, marginBottom: 10}}>Esta aplicación utilizará datos personales de los usuarios tales como: perfil de redes sociales, nombre, correo electrónico y tipo de discapacidad. Dicha información será resguardada por la asociación con carácter confidencial. Sólo excepcionalmente, los datos referentes a discapacidad se usarán para realizar estudios estadísticos en esta materia.</Text>
          <Text style={{fontWeight: 'bold', fontSize: 14, marginTop:10}}>Datos de evaluaciones y marcadores:</Text>
          <Text style={{textAlign: 'justify',fontSize: 14, marginBottom: 10}}>Cada lugar agregado, evaluado y comentado en la aplicación tendrá asociado el usuario que realizó esta acción y de esta forma, el nombre del usuario será visible por medio de la aplicación.
Los datos relativos a la evaluación de los distintos puntos en el mapa podrán ser divulgados públicamente por la organización a través de análisis, publicación de datos y estadísticas.</Text>
            </View>

          </ScrollView>

          <View>
            <TouchableOpacity style={styles.accept} onPress={() => this.props.action()}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Acepto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accept} onPress={() => this.setState({open: false})}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>No acepto</Text>
            </TouchableOpacity>
          </View>
      </Modal>
    );
  }
};