'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import userDefaults from '../../../userDefaults.js';

import styles from './styles';

export default class ModalDisability extends Component  {

	constructor(props) {
		super(props);

    this.disabilityList = [
      {label: 'No', value: 5 },
      {label: 'Si - Fisica', value: 0 },
      {label: 'Si - Visual', value: 1 },
      {label: 'Si - Auditiva', value: 2},
      {label: 'Si - Psiquica', value: 3},
      {label: 'Si - Intelectual', value: 4}
    ];

		this.state = {
			open: false,
      value: 5
		}
	}

  didTapClose(){
    // 5 = no
    global.disabilityValue = this.state.value
    this.props.updateDisability(this.state.value);
    this.modalBehavior();
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
          <View style={[styles.backgroundTitle, {backgroundColor: this.props.background}]}>
            <Text style={styles.title}><Icon name={this.props.icon} size={20} color="#FFFFFF"/> {this.props.title}</Text>
          </View>
                <View style={styles.containerSelection}>
                  <RadioForm
                    radio_props={this.disabilityList}
                    onPress={(value) => {this.setState({value: value})}}
                    buttonColor={'#7F7F7F'}
                    animation={false}
                    buttonSize={13}
                  />
                </View>

          <View>
            <TouchableOpacity style={[styles.accept, {marginBottom: 5}]} onPress={() => this.didTapClose()}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Aceptar</Text>
            </TouchableOpacity>
          </View>
      </Modal>
	  );
	}
};