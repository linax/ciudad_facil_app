'use strict';
//Modal de detalles de edificación
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Modal from 'react-native-simple-modal';
import styles from './styles';
import commonStyles from '../../../screens/commonStyles';

var image = 'build_1';

export default class ModalDetail extends Component {

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

  _getCalification(calification, type, bano) { //0: no es baño, 1: es baño
    if (type != 4) {
      switch(calification) {
        case 0:
          return 'Malo';
          break;
        case 1:
          if (bano == 0) {
            return 'Bueno';
          }
          else{
            return 'Medio';
          }
          break;

        case 2:
          return 'Bueno';
          break;
        default:
          break;
      }
    }
  }

  _makeAction(type) {
    this.modalBehavior();
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
               modalStyle={styles.modalStyle}
               >
               <View>
                  <View style={[styles.headerModal]}>
                    <Image source={{uri : this.props.annotation.image}} style={styles.icon}/>
                    <Text style={[commonStyles.text, commonStyles.titleText, {padding: 10, textAlign: 'center'}]}>{this.props.annotation.name}</Text>
                    <Text style={commonStyles.text}>{this._getType(this.props.annotation.type)}</Text>
                  </View>

                  <View style={styles.contentModal}>
                      <Text style={[commonStyles.text, styles.textDescription]}>Acceso: <Text style={[commonStyles.text, {fontWeight: 'normal'}]}>{this.props.annotation.evp_eva && this._getCalification(this.props.annotation.evp_eva.edi_acc, this.props.annotation.type, 0)}</Text></Text>
                      <Text style={[commonStyles.text, styles.textDescription]}>Circulación: <Text style={[commonStyles.text, {fontWeight: 'normal'}]}>{this.props.annotation.evp_eva && this._getCalification(this.props.annotation.evp_eva.edi_mov, this.props.annotation.type, 0)}</Text></Text>
                      <Text style={[commonStyles.text, styles.textDescription]}>Baño: <Text style={[commonStyles.text, {fontWeight: 'normal'}]}>{this.props.annotation.evp_eva && this._getCalification(this.props.annotation.evp_eva.edi_bat, this.props.annotation.type, 1)}</Text></Text>
                      <Text style={[commonStyles.text, styles.textDescription]}>Seguridad: <Text style={[commonStyles.text, {fontWeight: 'normal'}]}>{this.props.annotation.evp_eva && this._getCalification(this.props.annotation.evp_eva.edi_sec, this.props.annotation.type, 0)}</Text></Text>
                      <Text style={[commonStyles.text, styles.textDescription]}>Información: <Text style={[commonStyles.text, {fontWeight: 'normal'}]}>{this.props.annotation.evp_eva && this._getCalification(this.props.annotation.evp_eva.edi_inf, this.props.annotation.type, 0)}</Text></Text>
                    <TouchableOpacity style={styles.moreInfo} onPress={() => this._moreInfo()}>
                      <Text style={commonStyles.buttonText}>Ver más</Text>
                    </TouchableOpacity>
                  </View>

               </View>
            </Modal>
		);
	}
}
