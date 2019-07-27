'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-simple-modal';

import styles from './styles';

export default class ModalInfoSidewalk extends Component  {

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
            <Text style={styles.title}><Icon name="info-circle" size={20} color="#FFFFFF"/> Información</Text>
          </View>
          <ScrollView style={styles.contentContainer}>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>1. ¿La vereda está en buen estado?</Text>
              <Text style={{marginBottom: 5}}>Sí. El pavimento en la vereda es seguro, estable, liso, antideslizante (en seco y mojado), sin elementos sueltos (en veredas de alto flujo debe tener al menos 1,50m libres, y las de bajo flujo, 1,20m).</Text>
              <Text style={{marginBottom: 5}}>No. La vereda no presenta las condiciones descritas.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>2. ¿La vereda posee el ancho adecuado?</Text>
              <Text style={{marginBottom: 5}}>Sí. La vereda permite el paso de dos personas juntas, de una persona en silla de ruedas o con bastones.</Text>
              <Text style={{marginBottom: 5}}>No. La vereda no posee las condiciones descritas.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>3. ¿La vereda está libre de obstáculos fijos?</Text>
              <Text style={{marginBottom: 5}}>Sí. No existen postes, señales de tránsitos, asientos fijos u otros elementos que interrumpan la circulación en la vereda.</Text>
              <Text style={{marginBottom: 5}}>No. La vereda posee obstáculos fijos que interrumpen la circulación.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>4. ¿La vereda está libre de obstáculos móviles?</Text>
              <Text style={{marginBottom: 5}}>Sí. No existen letreros, basureros u otros elementos fáciles de mover, que interrumpan la circulación en la vereda.</Text>
              <Text style={{marginBottom: 5}}>No. Existen obstáculos móviles en la vereda que interrumpen la circulación.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>5. ¿La vereda está bien iluminada? (Opcional)</Text>
              <Text style={{marginBottom: 5}}>Sí. La luz sea homogénea y no se generen zonas oscuras que dificulten el desplazamiento de las personas.</Text>
              <Text style={{marginBottom: 5}}>No. La vereda no se encuentra bien iluminada, dificultando el desplazamiento de las personas.</Text>
            </View>

          </ScrollView>

          <View>
            <TouchableOpacity style={styles.accept} onPress={() => this.setState({open: false})}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Aceptar</Text>
            </TouchableOpacity>
          </View>
      </Modal>
    );
  }
};