'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SpinnerCustom from '../../../components/common/Spinner/spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../../API/ApiComm';

import Header from '../../../components/common/Header/header';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalSession from '../../../components/common/ModalWarning/modalSession';
import ModalReload from '../../../components/common/ModalReload/modalReload';
import styles from './styles';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default class addParking extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: 'image_default',
      open: false,
      name: '',
      totalParkings: '',
      totalParkingsDiscapacity: '',
      comments: '',
      response: '',
      standar: false,
      visible: false
    }

  }

  selectPhotoTapped() {
    ImageHelper.selectImage({ width: 500, height: 500}, (response) => {
      this.setState({
        image: response
      })
    })
  }

  _calculateRuleParking(){
    var total = this.state.totalParkings;
    var totalD = this.state.totalParkingsDiscapacity;
    var response = false;
    if (1 <= total && total <= 20) {
      if (totalD >= 1) { response = true; }
    } else if (20 < total  && total <= 50) {
      if (totalD >= 2) { response = true; }
    } else if (50 < total && total <= 200) {
      if (totalD >= 3) { response = true; }
    } else if (200 < total && total <= 400) {
      if (totalD >= 4) { response = true; }
    } else {
      if (totalD >= Math.ceil(total/100)) { response = true; }
    }

    return response;
  }

  _didTapAddParking() {
    var name = this.state.name;
    var parkings = this.state.totalParkings;
    var discapacity_parkings = this.state.totalParkingsDiscapacity;
    var image = this.state.image;
    if (name == '' || parkings == '' || discapacity_parkings == '' && discapacity_parkings != 0) {
      this.setState({ response: 'Debes agregar el nombre, número total de estacionamientos y el número total destinado para personas con discapacidad' });
      this.warning.modalBehavior();
    } else if (image == 'image_default') {
      this.setState({ response: 'Debes agregar una imagen del estacionamiento' });
      this.warning.modalBehavior();
    }

    else if (parkings < discapacity_parkings) {
      this.setState({ response: 'El total de estacionamientos debe ser mayor a los estacionamientos disponibles para personas con discapacidad' });
      this.warning.modalBehavior();
    }

    else{
      var rule = this._calculateRuleParking();
      var data = {
        name : name,
        totalParking: parkings,
        totalDisability: discapacity_parkings,
        comment: this.state.comments,
        rule: rule,
        image: this.state.image,
        latitude: global.latitude,
        longitude: global.longitude
      }
      this.setState({ visible: true });
      API.addParking(data).then(json => {
        this.setState({ visible: false });
        this.success.modalBehavior();
      }).catch(error => {
        this.setState({ visible: false });
        console.log(error);
        if(error == 'no-connection') {
          this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
          this.warning.modalBehavior();
        }
        else if(error == 'auth') {
          this.session.modalBehavior();
        } else {
          this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
          this.warning.modalBehavior();
        }
      });
    }
  }

  finishAddBuild() {
    Actions.pop({ refresh: { refreshAnnotations: true } });
  }

  render() {
    return(
        <View style={styles.container}>
          <SpinnerCustom visible={this.state.visible}/>
          <Header title='Agregar estacionamiento'/>
          <KeyboardAwareScrollView style={styles.container}>

          <View style={styles.content}>

            <View style={styles.formGroup}>
              <Text style={[styles.textForm, {width: width * 0.2}]}>Nombre: </Text>
              <View style={styles.contentInput}>
                <TextInput underlineColorAndroid='transparent' style={[styles.inputForm, {width: width * 0.6, textAlign: 'left'}]} onChangeText={(val) => this.setState({name: val})}></TextInput>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.textForm}>Nº total de estacionamientos</Text>
              <View style={styles.contentInput}>
                <Icon name="car" size={18} color="#828387"/>
                <TextInput underlineColorAndroid='transparent' style={styles.inputForm} maxLength={3} keyboardType="numeric" onChangeText={(val) => this.setState({totalParkings: parseInt(val)})}></TextInput>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.textForm}>Nº de estacionamientos para personas con discapacidad</Text>
              <View style={styles.contentInput}>
                <Icon name="wheelchair" size={20} color="#828387"/>
                <TextInput underlineColorAndroid='transparent' style={styles.inputForm} keyboardType="numeric" maxLength={3} onChangeText={(val) => this.setState({totalParkingsDiscapacity: parseInt(val)})}></TextInput>
              </View>
            </View>

            <View style={styles.formGroup2}>
              <Text style={{color: '#979797', fontWeight: '700', marginBottom: 10}}>Descripción del lugar:</Text>
              <View style={styles.contentInput}>
                <TextInput underlineColorAndroid='transparent' style={styles.textArea} maxLength={150} multiline={true} onChangeText={(val) => this.setState({comments: val})}></TextInput>
              </View>
            </View>

            <View style={[styles.formGroup2, {alignItems: 'center'}]}>
              <TouchableOpacity style={{width: width * 0.6, height: height*0.2, alignItems: 'center'}} onPress={() => this.selectPhotoTapped()}>
                <Image
                source={{uri: this.state.image}}
                style={{width: width * 0.4, height: height* 0.2}}
                resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addPhoto} onPress={() => this.selectPhotoTapped()}>
                <Text style={{fontWeight: 'bold', color: '#3CC882', fontSize: 16}}>Agregar imagen</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addParking} onPress={() => this._didTapAddParking()}>
              <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 16}}>Agregar</Text>
            </TouchableOpacity>

          </View>
          </KeyboardAwareScrollView>

          <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
          <ModalSession ref={(session) => { this.session = session; }}  icon="alert" title="Aviso" background='#3CC882' text='Tu sesión ha caducado, vuelve a iniciar sesión'/>
          <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="El estacionamiento ha sido agregado" destine='main' reload={this.finishAddBuild}/>
        </View>
      );
  }
}