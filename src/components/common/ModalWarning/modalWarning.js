'use strict';

import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Modal from 'react-native-simple-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

export default class ModalAdd extends Component  {

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

  onPress() {
    if (this.props.onPress) {
      this.props.onPress()
    }
    this.setState({open: false})
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
          <View style={styles.contentContainer}>
            <Text style={{textAlign: 'center'}}>{this.props.text}</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.accept} onPress={this.onPress.bind(this)}>
              <Text style={{fontWeight: 'bold', color: '#999999'}}>Aceptar</Text>
            </TouchableOpacity>
          </View>
      </Modal>
	  );
	}
};