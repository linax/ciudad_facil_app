'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-simple-modal';

import styles from './styles';

export default class ModalInfoCross extends Component  {

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
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>1. ¿Existe rebaje en la esquina?</Text>
              <Text style={{marginBottom: 5}}>Sí. Hay rampa, o, la vereda y la calle están a nivel.</Text>
              <Text style={{marginBottom: 5}}>No. La vereda no presenta las condiciones descritas.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>2. ¿La rampa en el cruce o esquina está en buen estado?</Text>
              <Text style={{marginBottom: 5}}>Sí. El pavimento en la rampa es seguro y estable, liso, antideslizante (en seco y mojado) y sin elementos sueltos.</Text>
              <Text style={{marginBottom: 5}}>No. No hay rampa en el cruce y/o no presenta las condiciones descritas.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>3. ¿La pendiente en la rampa del cruce es suave?</Text>
              <Text style={{marginBottom: 5}}>Sí. En un metro de largo sube una altura de hasta 12 centímetros, y puede fácilmente desplazarse por ella una persona en silla de ruedas.</Text>
              <Text style={{marginBottom: 5}}>No. La pendiente de la rampa no cuenta con las medidas descritas.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>4. ¿El cruce tiene el ancho adecuado?</Text>
              <Text style={{marginBottom: 5}}>Sí. Por la parte caminable del rebaje pueden pasar 2 personas (mínimo 1,20 metros de ancho).</Text>
              <Text style={{marginBottom: 5}}>No. No cuenta con el ancho adecuado.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>5. ¿El rebaje del cruce se encuentra libre de cualquier obstáculo?</Text>
              <Text style={{marginBottom: 5}}>Sí. No se generan pozas, no hay elementos como postes, señales de tránsito u otros que impidan pasar, y la diferencia de altura entre la rampa y la calle no es mayor a 1 centímetro (aproximadamente 2 dedos “acostados”).</Text>
              <Text style={{marginBottom: 5}}>No. En el rebaje existen obstáculos como los descritos.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>6. ¿El rebaje tiene piso de alerta?</Text>
              <Text style={{marginBottom: 5}}>Sí. El rebaje posee baldosas o pavimentos con textura de botones, ubicadas en la parte alta del rebaje, y no en el plano diagonal.</Text>
              <Text style={{marginBottom: 5}}>No. El rebaje no posee piso de alerta como el descrito.</Text>
            </View>

            <View style={styles.textForm}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>7. ¿El cruce tiene semáforo sonoro? (opcional)</Text>
              <Text style={{marginBottom: 5}}>Sí tiene semáforo sonoro</Text>
              <Text style={{marginBottom: 5}}>No tiene semáforo sonoro y si tiene un semáforo normal.</Text>
              <Text style={{marginBottom: 5}}>No tiene ningún tipo de semáforo.</Text>
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