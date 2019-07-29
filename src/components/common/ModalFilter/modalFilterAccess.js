'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import userDefaults from '../../../userDefaults.js';

import styles from './styles';
import commonStyles from '../../../screens/commonStyles';

var radio_props = [
  {label: 'Buena', value: 2 },
  {label: 'Regular', value: 1 },
  {label: 'Mala', value: 0 }
];


export default class ModalSelectFilter extends Component  {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
      value: 2
		}
	}

  didTapClose(){
    this.modalBehavior();
    global.filter = this.state.value;
    this.setState({ value: 3 });
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
                    buttonColor={'#505050'}
                    animation={false}
                    buttonSize={15}
                  />
                </View>

          <View>
            <TouchableOpacity style={styles.accept} onPress={() => this.didTapClose()}>
              <Text style={[commonStyles.text, {fontWeight: 'bold'}]}>Filtrar</Text>
            </TouchableOpacity>
          </View>
      </Modal>
	  );
	}
};
