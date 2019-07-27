'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Modal from 'react-native-simple-modal';
import styles from './styles';

var image = 'build_1';

export default class ModalParkingDetail extends Component {

	constructor(props) {
		super(props);

	  this.state = {
	    	open: false,
        show: true,
	  }
  }

  _getType(type) {
    switch(type) {
      case 1:
        return 'Estacionamiento';
        break;
      case 2:
        return 'Edificación';
      case 3:
        return 'Espacio público';
      case 4:
        return 'Vereda o cruce';
      default:
        break;
    }
  }

  _getCalification(calification) {
    switch(calification) {
      case 1:
        return 'Malo';
        break;
      case 2:
        return 'Medio';
      case 3:
        return 'Bueno';
      default:
        break;
    }
  }

  _makeAction(type) {
    () => this.modalBehavior();
    switch(type) {
      case 1:
        Actions.ParkingDetail();
        break;
      case 2:
        Actions.BuildDetail();
        break;
      case 3:
        Actions.PublicSpaceDetail();
        break;
      case 4:
        Actions.SidewalkDetail();
        break;
    }
  }

  modalBehavior() {
    var behavior = !(this.state.open);
    this.setState({ open: behavior });
  }

  closeModal() {
    this.setState({ open: false})
  }

  _moreInfo() {
    this.closeModal()
    if(!global.isConnected) {
      this.props.noConnection();
    }
    else if (global.auth_token != null) {
      global.id = this.props.annotation.id;
      this._makeAction(this.props.annotation.type);
    } else {
      this.props.notLogged();
    }
  }

	render() {
		return(
            <Modal
               offset={this.state.offset}
               open={this.state.open}
               //modalDidClose={() => this.modalBehavior()}
               modalStyle={styles.modalStyle}
               >
               <View>
                  <View style={styles.headerModal}>
                    <Image source={{uri : this.props.annotation.image}} style={styles.icon}/>
                    <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', padding: 5, textAlign: 'center'}}>{this.props.annotation.name}</Text>
                    <Text style={{color: '#000000', fontSize: 16}}>{this._getType(this.props.annotation.type)}</Text>
                  </View>

                  <View style={styles.contentModal}>
                    <TouchableOpacity style={styles.moreInfo} onPress={() => this._moreInfo()}>
                      <Text style={styles.textMoreInfo}>Ver más información</Text>
                    </TouchableOpacity>
                  </View>

               </View>
            </Modal>
		);
	}
}