'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SpinnerCustom from '../../../components/common/Spinner/spinner';

import Header from '../../../components/common/Header/header';
import ModalDelete from '../../../components/common/ModalDelete/modalDelete';
import ModalAfterDelete from '../../../components/common/ModalAfterDelete/modalAfterDelete';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalSession from '../../../components/common/ModalWarning/modalSession';
import API from '../../../API/ApiComm';
import styles from './styles';
import userDefaults from '../../../userDefaults.js';

var reserved;
var total;
var standar;

export default class ParkingDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: 'image_default',
      est_rsv: 0,
      est_ord: false,
      permissions_d: false,
      permissions_u: false,
      standar: '',
      visible: false,
      response: '',
      color: '#3CC882',
      creator: ''
    }
  }

  componentWillMount() {
    this.setState({ visible: true });
    API.getDetailParking(global.id).then(json => {
      this._setInfo(json.data);
      console.log(json.data);
      this.setState({ visible: false });
    }).catch(error => {
        this.setState({ visible: false });
        if(error == 'no-connection') {
          this.setState({ color: '#FD6B6B' });
          this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
          this.error.modalBehavior();
        }
        else if(error == 'auth') {
          this.setState({ response: 'Tu sesión ha caducado, cierra y vuelve a iniciar sesión' });
          this.setState({ color: '#3CC882' });
          this.session.modalBehavior();
        } else {
          this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
          this.setState({ color: '#FD6B6B' });
          this.error.modalBehavior();
        }
    });
  }

  _setInfo(data) {
    this.setState({
      name: data.pev_ttl,
      est_rsv: data.est_rsv,
      est_ord: data.est_ord,
      est_cmn: data.est_cmn,
      reserved: data.est_cnt_rsv,
      total: data.est_cnt_ttl,
      standar: 'No cumple'
    });

    global.name = data.pev_ttl;
    global.comments = data.est_cmn;
    global.ttl = data.est_cnt_ttl.toString();
    global.ttl_disc = data.est_cnt_rsv.toString();
    global.image = data.ime_img[0];

    if (data.ime_img.length != 0 && data.ime_img[0] != null) {
      this.setState({ image : data.ime_img[0] });
    }

    if (data.permissions.u && data.permissions.d) {
      this.setState({ permissions_d: data.permissions.d });
      this.setState({ permissions_u: data.permissions.u });
    }

    if (data.pev_usu_nbr != null) {
      this.setState({ creator: data.pev_usu_nbr })
    }

    reserved = data.est_cnt_rsv;
    total = data.est_cnt_ttl;

    if (data.est_cmp_ord == 1) {
      this.setState({standar: 'Cumple'});
    } else {
      this.setState({standar: 'No cumple'});
    }
  }

  _didTapDeleteParking() {
    this.warning.modalBehavior();
  }

  _deleteParking() {
    this.warning.modalBehavior();
    this.setState({ visible: true });
    API.deleteParking(global.id).then(json => {
      global.id = '';
      this.setState({ visible: false });
      this.afterDelete.modalBehavior();
    }).catch(error => {
        this.setState({ visible: false });
        this.error.modalBehavior();
    });
  }

  _seeComments() {
    global.type = 1;
    Actions.Comments();
  }

  _seeEvaluations() {
    global.type = 1;
    Actions.Evals();
  }

  render() {
    return (
      <View style={styles.container}>
        <SpinnerCustom visible={this.state.visible}/>
        <Header title=/*Información del*/'Estacionamiento'/>
        <ScrollView>
        <View style={styles.contentContainer}>
          <View style={[styles.md1]}>
            <Image
            source={{uri: this.state.image}}
            style={[styles.image]}
            resizeMode={'contain'}
            />
          </View>
          <View style={[styles.md2, {paddingTop: 20}]}>
            <Text style={{fontWeight: 'bold'}}>Nombre: </Text>
            <Text style={{marginBottom: 10}}>{this.state.name}</Text>
            <Text style={{fontWeight: 'bold'}}>Descripción:</Text>
            <Text style={{fontStyle: 'italic'}}>"{this.state.est_cmn}"</Text>
          </View>
        </View>

        { this.state.permissions_u &&
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonActivity} onPress={() => Actions.EditParking()}>
            <Text style={styles.textButton}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonActivity} onPress={() => this._didTapDeleteParking()}>
            <Text style={styles.textButton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        }

        <View style={{height: 1, backgroundColor: "#64606C", marginTop: 20}}></View>

          <View style={{alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity style={styles.buttonShow} onPress={() => this._seeComments()}>
              <Text style={styles.textButton}>Ver votos y comentarios</Text>
            </TouchableOpacity>
          </View>

        <View style={{padding: 20}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 20}}>Detalles de Estacionamiento:</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Creado por:</Text>
            <Text>{this.state.creator}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Estacionamientos disponibles:</Text>
            <Text>{this.state.total}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Estacionamientos para personas con discapacidad:</Text>
            <Text>{this.state.reserved}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Cumple con norma:</Text>
            <Text>{this.state.standar}</Text>
          </View>

        </View>


      </ScrollView>
      <ModalAfterDelete ref={(afterDelete) => { this.afterDelete = afterDelete; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="El estacionamiento ha sido eliminado" action={() => Actions.pop({ refresh: { refreshAnnotations: true } }) }/>
      <ModalSession ref={(session) => { this.session = session; }}  icon="alert" title="Aviso" background={this.state.color} text={this.state.response}/>
      <ModalWarning ref={(error) => { this.error = error; }}  icon="alert" title="Error" background={this.state.color} text={this.state.response}/>
      <ModalDelete ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text="¿Deseas eliminar este estacionamiento?" action={() => this._deleteParking()}/>
      </View>
    );
  }

}
