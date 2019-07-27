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
import NavigationBarDetail from '../../../components/common/NavigationBarDetail/navigationBarDetail';

export default class publicSpaceDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      address: 'Sin información',
      email: 'Sin información',
      phone: 'Sin información',
      permissions_d: false,
      permissions_u: false,
      image: 'image_default',
      visible: false,
      response: '',
      color: '#3CC882',
      description: 'Sin información',
      category: '',
      subCategory: '',
      creator: 'Sin información',
      isDetailSelected: true,
      accesibilityValue: 'Sin información',
      movilityValue: 'Sin información',
      usedValue: 'Sin información',
      informationValue: 'Sin información'
    }
  }

  componentWillMount() {
    this._getPublicSpaceDetail();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.refreshData && nextProps.refreshData) {
      this._getPublicSpaceDetail();
    }
  }

  _getPublicSpaceDetail() {
    this.setState({ visible: true });
    console.log(global.id);
    API.getDetailPublicSpace(global.id).then(json => {
      this._setInfo(json.data);
      console.log(json.data);
      this.setState({ visible: false });
    }).catch(error => {
        console.log(error);
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

  componentWillMount() {
    this._getPublicSpaceDetail()
  }

  _setInfo(data) {
    console.log(data);

    this.setState({
      name: data.pev_ttl,
      address: data.esp_dir,
      category: data.esp_cat,
      subCategory: data.esp_sub_cat,
      email: data.esp_ema,
      phone: data.esp_tel,
      permissions_d: (data.permissions && data.permissions.d) ? data.permissions.d : false,
      permissions_u: (data.permissions && data.permissions.u) ? data.permissions.u : false,
      image: (data.evals && data.evals.length > 0) ? data.evals[data.evals.length-1].ema_img[0] : "",
      description: (data.evals && data.evals.length > 0) ? data.evals[0].eup_cmn : "",
      creator: data.pev_usu_nbr,
      accesibilityValue: data.evp_eva.esp_acc,
      movilityValue: data.evp_eva.esp_des,
      usedValue: data.evp_eva.esp_uso,
      informationValue: data.evp_eva.esp_inf
    })

    global.name = data.pev_ttl;
    global.address = data.esp_dir;
    global.mail = data.esp_ema;
    global.phone = data.esp_tel;
    global.buildCategory = data.esp_cat;
    global.buildSubCategory = data.esp_sub_cat;
    global.buildName = data.pev_ttl;

  }

  _didTapDeletePublicSpace() {
    this.warning.modalBehavior();
  }

  _deletePublicSpace() {
    this.warning.modalBehavior();
    this.setState({ visible: true });
    API.deletePublicSpace(global.id).then(json => {
      global.id = '';
      this.setState({ visible: false });
      this.afterDelete.modalBehavior();
    }).catch(error => {
        this.setState({ visible: false });
        this.error.modalBehavior();
    });
  }

  _seeComments() {
    global.type = 3;
    Actions.Comments();
  }

  _seeEvaluations() {
    global.type = 3;
    Actions.Evals();
  }

  _getValueForNumber(number) {
    switch(number) {
        case 0:
          return 'Malo';
          break;
        /*case 1:
          return 'Medio';*/
        case 1:
          return 'Bueno';
        default:
          return '';
          break;
      }
  }

  renderDetails() {
    return (
      <View style={{padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Creado por:</Text>
            <Text>{this.state.creator}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Dirección:</Text>
            <Text>{this.state.address}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Teléfono de contacto:</Text>
            <Text>{this.state.phone}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Correo electrónico:</Text>
            <Text>{this.state.email}</Text>
          </View>

        </View>
      );
  }

  renderAccesibility() {
    return (
      <View style={{padding: 20}}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Acceso:</Text>
            <Text>{this._getValueForNumber(this.state.accesibilityValue)}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Circulación:</Text>
            <Text>{this._getValueForNumber(this.state.movilityValue)}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Uso:</Text>
            <Text>{this._getValueForNumber(this.state.usedValue)}</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={{fontSize: 15}}>Información:</Text>
            <Text>{this._getValueForNumber(this.state.informationValue)}</Text>
          </View>

        </View>
      );
  }


  render() {
    return (
      <View style={styles.container}>
        <SpinnerCustom visible={this.state.visible}/>
        <Header title='Información de espacio público'/>
        <ScrollView>
        <View style={styles.contentContainer}>
          <View style={[styles.md1]}>
            <Image
            source={{uri: this.state.image}}
            style={[styles.image]}
            resizeMode={'contain'}
            />
          </View>
          <View style={[styles.md2, {paddingTop: 0}]}>
            <Text style={{fontWeight: 'bold'}}>Nombre: </Text>
            <Text style={{marginBottom: 5}}>{this.state.name}</Text>
            <Text style={{fontWeight: 'bold'}}>Categoría:</Text>
            <Text style={{marginBottom: 5}}>{this.state.category}</Text>
            <Text style={{fontWeight: 'bold'}}>Subcategoría:</Text>
            <Text style={{marginBottom: 15}}>{this.state.subCategory}</Text>
          </View>
        </View>

        <View style={styles.commentContainer}>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>Descripción: <Text style={{fontWeight: 'normal'}}>{this.state.description}</Text></Text>
        </View>

        { this.state.permissions_u &&
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonActivity} onPress={() => Actions.AddPublicSpace({ isEditing: true })}>
            <Text style={styles.textButton}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonActivity} onPress={() => this._didTapDeletePublicSpace()}>
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

          <View style={{alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity style={styles.buttonShow} onPress={() => this._seeEvaluations()}>
              <Text style={styles.textButton}>Ver evaluaciones realizadas</Text>
            </TouchableOpacity>
          </View>

        <NavigationBarDetail selected1={this.state.isDetailSelected} selected2={!this.state.isDetailSelected} actionFirst={() => this.setState({ isDetailSelected: true })} actionSecond={() => this.setState({ isDetailSelected: false })}/>
        { this.state.isDetailSelected && this.renderDetails() }
        { !this.state.isDetailSelected && this.renderAccesibility() }

        </ScrollView>
      <ModalAfterDelete ref={(afterDelete) => { this.afterDelete = afterDelete; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="La espacio público ha sido eliminada" action={() => Actions.pop({ refresh: { refreshAnnotations: true } }) }/>
      <ModalWarning ref={(error) => { this.error = error; }}  icon="alert" title="Error" background={this.state.color} text={this.state.response}/>
      <ModalSession ref={(session) => { this.session = session; }}  icon="alert" title="Aviso" background={this.state.color} text={this.state.response}/>
      <ModalDelete ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text="¿Deseas eliminar esta edificación" action={() => this._deletePublicSpace()}/>
      </View>
    );
  }
}