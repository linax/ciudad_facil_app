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
  {label: '1 km.', value: 1 },
  {label: '2 km.', value: 2 },
  {label: '5 km.', value: 5 },
  {label: '10 km.', value: 10 },
  {label: '15 km.', value: 15 },
  {label: '20 km.', value: 20 },
  {label: '25 km.', value: 25 },
  {label: '30 km.', value: 30 },
  {label: '35 km.', value: 35 },
];


export default class ModalSelectFilter extends Component  {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
      value: 1
		}
	}

  didTapClose(){
    this.modalBehavior();
    global.filter = this.state.value;
    this.setState({ value: 1 });
    global.showClose = true;
    this.props.filter();
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
                    radio_props={radio_props}
                    onPress={(value) => {this.setState({value: value})}}
                    buttonColor={'#7F7F7F'}
                    animation={false}
                    buttonSize={15}
                  />
                </View>

          <View>
            <TouchableOpacity style={styles.accept} onPress={() => this.didTapClose()}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Filtrar</Text>
            </TouchableOpacity>
          </View>
      </Modal>
	  );
	}
};