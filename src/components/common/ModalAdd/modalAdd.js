'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Modal from 'react-native-simple-modal';

import userDefaults from '../../../userDefaults.js';
import styles from './styles';

var radio_props = [
  {label: 'Edificación', value: 0 },
  {label: 'Espacios Públicos', value: 1 },
  {label: 'Veredas y Cruces', value: 2 },
  {label: 'Estacionamiento', value: 3 }
];

export default class ModalAdd extends Component  {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
      value: 0
		}
	}

  	_selectAdd() {
      this.setState({ open: false });
      if(!global.isConnected) {
        this.props.noConnection();
      }
      else if (global.auth_token != null) {
      	var destination = this.state.value;
      	switch(destination) {
        	case 0:
              this.setState({ value: 0, open: false });
          		Actions.AddBuild();
         		break;
        	case 1:
              this.setState({ value: 0, open: false  });
          		Actions.AddPublicSpace();
          		break;
        	case 2:
              this.setState({ value: 0, open: false  });
          		Actions.AddSidewalk();
          		break;
        	case 3:
              this.setState({ value: 0, open: false  });
          		Actions.AddParking();
         		break;
      		}
    	} else {
      	this.props.notLogged();
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
                <View style={styles.backgroundTitle}>
                  <Text style={styles.title}>Agregar Marcador</Text>
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
                  <TouchableOpacity style={styles.add} onPress={() => this._selectAdd()}>
                    <Text style={styles.textMoreInfo}>Agregar</Text>
                  </TouchableOpacity>
                </View>
            </Modal>
	  );
	}
};