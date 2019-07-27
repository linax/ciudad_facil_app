'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default class ModalAfterDelete extends Component  {

	constructor(props) {
		super(props);

		this.state = {
			open: false
		}
	}

	modalBehavior() {
	  var behavior = !(this.state.open);
	  this.setState({ open: behavior });
	}

  close(){
    if (this.props.action != undefined) {
      this.props.action()
    }
  }

	render() {
	  return (
      <Modal
          offset={this.state.offset}
          open={this.state.open}
          modalDidClose={() => this.close()}
          modalStyle={styles.modalContainer}
          >
          <View style={[styles.backgroundTitle, {backgroundColor: this.props.background}]}>
            <Text style={styles.title}><Icon name={this.props.icon} size={20} color="#FFFFFF"/> {this.props.title}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={{textAlign: 'center'}}>{this.props.text}</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.accept} onPress={() => this.close()}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Aceptar</Text>
            </TouchableOpacity>
          </View>
      </Modal>
	  );
	}
};