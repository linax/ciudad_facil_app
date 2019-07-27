'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import userDefaults from '../../../userDefaults.js';

import styles from './styles';

var radio_props = [
  {label: 'Tipo', value: 0 },
  {label: 'Accesibilidad', value: 1 },
  {label: 'Distancia', value: 2}
];


export default class ModalSelectFilter extends Component  {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
      value: 0
		}
	}

  didTapClose(){
    global.filter = this.state.value;
    this.props.filter();
  }

  didTapCloseFilter(){
    global.filter = 0;
    this.props.clearFilter();
    this.modalBehavior();
  }

	modalBehavior() {
	  var behavior = !(this.state.open);
	  this.setState({ open: behavior });
    this.setState({ value: 0 });
	}

	render() {
	  return (
      <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidClose={() => this.setState({open: false})}
          modalStyle={styles.modalContainer}
          >
          <View style={[styles.backgroundTitle, {backgroundColor: this.props.background}]}>
            <Text style={styles.title}><Icon name={this.props.icon} size={20} color="#FFFFFF"/> {this.props.title}</Text>
          </View>
                <View style={styles.containerSelection}>
                  <RadioForm
                    radio_props={radio_props}
                    onPress={(value) => {this.setState({value: value})}}
                    buttonColor={'#7F7F7F'}
                    animation={false}
                    buttonSize={13}
                  />
                </View>

          <View>
            <TouchableOpacity style={[styles.accept, {marginBottom: 5}]} onPress={() => this.didTapClose()}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Filtrar</Text>
            </TouchableOpacity>
          </View>
          { global.showClose &&
          <View>
            <TouchableOpacity style={[styles.accept, {marginBottom: 10}]} onPress={() => this.didTapCloseFilter()}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}><Icon name="close" size={18} color="#999999"/> Quitar filtro</Text>
            </TouchableOpacity>
          </View>
          }
      </Modal>
	  );
	}
};