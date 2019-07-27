'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../../API/ApiComm';
import SpinnerCustom from '../../../components/common/Spinner/spinner';

import Header from '../../../components/common/Header/header';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import ModalReload from '../../../components/common/ModalReload/modalReload';
import styles from './styles';
import ImageHelper from '../../../components/common/Helpers/ImageHelper';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default class EditParking extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: global.image,
      start_image: global.image,
      open: false,
      name: global.name,
      start_name: global.name,
      totalParkings: global.ttl,
      start_totalParkings: global.ttl,
      totalParkingsDiscapacity: global.ttl_disc,
      start_totalParkingsDiscapacity: global.ttl_disc,
      comments: global.comments,
      start_comments: global.comments,
      response: '',
      standar: false,
      visible: false
    }

  }

  componentDidMount() {
    this.advertisment.modalBehavior();
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

  _didTapEditParking() {
    var data = '';
    var name = this.state.name;
    var parkings = this.state.totalParkings;
    var discapacity_parkings = this.state.totalParkingsDiscapacity;
    var image = this.state.image;
    var comments = this.state.comments;
    console.log("state", this.state)
    if (this.state.name == this.state.start_name && 
      this.state.totalParkings == this.state.start_totalParkings && 
      this.state.totalParkingsDiscapacity == this.state.start_totalParkingsDiscapacity && 
      this.state.image == this.state.start_image && 
      this.state.comments == this.state.start_comments) {
      this.warning.modalBehavior();
    } else if (parkings != '' && discapacity_parkings != '' && (parkings < discapacity_parkings) || (discapacity_parkings != '' && (global.ttl < discapacity_parkings))) {
      this.setState({ response: 'El total de estacionamientos debe ser mayor a los estacionamientos disponibles para personas con discapacidad' });
      this.error.modalBehavior();
    }
    else {
      if (this.state.image === 'image_default') {
        image = '';
      } else {
        image = this.state.image;
      }
      var rule = this._calculateRuleParking();
      var data = {
        id: global.id,
        name : name,
        totalParking: parkings,
        totalDisability: discapacity_parkings,
        comment: this.state.comments,
        rule: this.state.standar,
        image: image
      }
      this.setState({ visible: true });
      global.name = '';
      global.comments = '';
      global.ttl = '';
      global.ttl_disc = '';
      API.editParking(data).then(json => {
        global.id = '';
        this.setState({ visible: false });
        this.success.modalBehavior();
      }).catch(error => {
        this.setState({ visible: false });
        if(error == 'no-connection') {
          this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
        }
        else if(error == 'auth') {
          this.setState({ response: 'Tu sesión ha caducado, cierra y vuelve a iniciar sesión' });
        } else {
          this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
        }
        this.error.modalBehavior();
      });
    }
  }

  render() {
    return(
        <ScrollView style={styles.container}>
          <SpinnerCustom visible={this.state.visible}/>
          <Header title='Editar estacionamiento'/>

          <View style={styles.content}>

            <View style={styles.formGroup}>
              <Text style={[styles.textForm, {width: width * 0.2}]}>Nombre: </Text>
              <View style={styles.contentInput}>
                <TextInput underlineColorAndroid='transparent' defaultValue={global.name} style={[styles.inputForm, {width: width * 0.6, textAlign: 'left'}]} onChangeText={(val) => this.setState({name: val})}></TextInput>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.textForm}>Nº total de estacionamientos</Text>
              <View style={styles.contentInput}>
                <Icon name="car" size={18} color="#828387"/>
                <TextInput underlineColorAndroid='transparent' defaultValue={global.ttl} keyboardType="numeric" style={styles.inputForm} maxLength={3} onChangeText={(val) => this.setState({totalParkings: parseInt(val)})}></TextInput>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.textForm}>Nº de estacionamientos para personas con discapacidad</Text>
              <View style={styles.contentInput}>
                <Icon name="wheelchair" size={20} color="#828387"/>
                <TextInput style={styles.inputForm} maxLength={3} defaultValue={global.ttl_disc} keyboardType="numeric" onChangeText={(val) => this.setState({totalParkingsDiscapacity: parseInt(val)})}></TextInput>
              </View>
            </View>

            <View style={styles.formGroup2}>
              <Text style={{color: '#979797', fontWeight: '700', marginBottom: 10}}>Descripción del lugar:</Text>
              <View style={styles.contentInput}>
                <TextInput underlineColorAndroid='transparent' style={styles.textArea} defaultValue={global.comments} maxLength={150} multiline={true} onChangeText={(val) => this.setState({comments: val})}></TextInput>
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
                <Text style={{fontWeight: 'bold', color: '#3CC882', fontSize: 16}}>Agregar Imagen</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addParking} onPress={() => this._didTapEditParking()}>
              <Text style={{fontWeight: 'bold', color: '#FFFFFF', fontSize: 16}}>Editar</Text>
            </TouchableOpacity>

          </View>

          <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="El estacionamiento ha sido editado" destine='main'/>
          <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={"No haz ingresado ningún dato"}/>
          <ModalWarning ref={(error) => { this.error = error; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
          <ModalWarning ref={(advertisment) => { this.advertisment = advertisment; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="Solo agrega los campos que deseas editar"/>
        </ScrollView>
      );
  }
}