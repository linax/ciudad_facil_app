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

import Mapbox, { MapView } from 'react-native-mapbox-gl';

Mapbox.setAccessToken(global.accessToken);

export default class sidewalkDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: 'Cruce',
      comment: 'Sin comentario',
      senadisComment: null,
      permissions_d: false,
      permissions_u: false,
      image: 'image_default',
      annotation: [],
      color: '#3CC882',
      zoom: 11,
      visible: false,
      center: {
        latitude: -39.8143284,
        longitude: -73.2234442
      },
      categoryId: 2,
      creator: ''
    }
  }

  componentWillMount() {
    this._getSidewalDetail();
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.refreshData && nextProps.refreshData) {
      this._getSidewalDetail();
    }
  }

  _getSidewalDetail() {
    this.setState({ visible: true });
    API.getDetailSidewalk(global.id).then(json => {
      console.log(json.data);
      this._setInfo(json.data);
      this.setState({ visible: false });
    }).catch(error => {
        this.setState({ visible: false });
        if(error == 'no-connection') {
          this.setState({ color: '#FD6B6B' });
          this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
          this.error.modalBehavior();
        }
        else if(error == 'auth') {
          this.setState({ response: 'Tu sesión ha caducado, vuelve a iniciar sesión' });
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
    console.log(data);
    this.setState({ name: data.pev_ttl });
    this.setState({ permissions_d: data.permissions.d });
    this.setState({ permissions_u: data.permissions.u });

    if (data.vcr_des != null) {
      this.setState({ comment: data.vcr_des });
    }

    if (data.vcr_tip == 1) {
      this.setState({
        category: 'Vereda',
        categoryId: 1
      });
    }

    if (data.pev_ltt != null && data.pev_lng != null) {
      this._map.setCenterCoordinate(parseFloat(data.pev_ltt), parseFloat(data.pev_lng));
      this.setState({
        annotation: [{
          id: 'Marker',
          coordinates: [parseFloat(data.pev_ltt), parseFloat(data.pev_lng)],
          type: 'point'
        }]
      })
    }

    if (data.vcr_cmn_snd != null ) {
      this.setState({ senadisComment: data.vcr_cmn_snd });
    }

    if (data.evals[0].ema_img[0] != null) {
      this.setState({ image: (data.evals && data.evals.length > 0) ? data.evals[data.evals.length-1].ema_img[0] : "" });
    }

    if (data.pev_usu_nbr != null) {
      this.setState({ creator: data.pev_usu_nbr })
    }

    global.name = data.pev_ttl;
    global.description = data.vcr_des;
    global.latitude = Number(data.pev_ltt);
    global.longitude = Number(data.pev_lng);
    global.buildCategory = this.state.category
  }

  _didTapDeleteSidewalk() {
    this.warning.modalBehavior();
  }

  _deleteSidewalk() {
    this.warning.modalBehavior();
    this.setState({ visible: true });
    API.deleteSidewalk(global.id).then(json => {
      global.id = '';
      this.setState({ visible: false });
      this.afterDelete.modalBehavior();
    }).catch(error => {
        this.setState({ visible: false });
        this.error.modalBehavior();
    });
  }

  _seeComments() {
    global.type = 4;
    Actions.Comments();
  }

  _seeEvaluations() {
    global.type = 4;
    global.category = this.state.categoryId;
    Actions.Evals();
  }

  render() {
    let popParams = (this.props.refreshData) ? { refresh: { refreshAnnotations: true } } : {}
    return (
      <View style={styles.container}>
        <SpinnerCustom visible={this.state.visible}/>
        <Header title='Información de vereda o cruce' popParams={popParams}/>
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
            <Text style={{marginBottom: 10}}>{this.state.name}</Text>
            <Text style={{fontWeight: 'bold'}}>Categoría:</Text>
            <Text style={{marginBottom: 15}}>{this.state.category}</Text>
          </View>
        </View>

        { this.state.senadisComment &&
          <View style={[styles.commentContainer, this.state.senadisComment ? {height: 40} : {height: 0}]}>
              <Text style={{fontWeight: 'bold', marginBottom: 10}}>Comentario Senadis: <Text style={{fontWeight: 'normal'}}>{this.state.senadisComment}</Text></Text>
          </View>
        }

        <View style={styles.commentContainer}>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>Descripción: <Text style={{fontWeight: 'normal'}}>{this.state.comment}</Text></Text>
        </View>

        <View style={styles.commentContainer}>
            <Text style={{fontWeight: 'bold', marginBottom: 10}}>Creado por: <Text style={{fontWeight: 'normal'}}>{this.state.creator}</Text></Text>
        </View>

        { this.state.permissions_u &&
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonActivity} onPress={() => Actions.AddSidewalk({ isEditing: true })}>
            <Text style={styles.textButton}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonActivity} onPress={() => this._didTapDeleteSidewalk()}>
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

          <View style={{alignItems: 'center', marginTop: 10, marginBottom: 20}}>
            <TouchableOpacity style={styles.buttonShow} onPress={() => this._seeEvaluations()}>
              <Text style={styles.textButton}>Ver evaluaciones realizadas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapView}>
            <MapView
              ref={map => { this._map = map; }}
              style={styles.map}
              initialZoomLevel={this.state.zoom}
              initialCenterCoordinate={this.state.center}
              initialDirection={0}
              rotateEnabled={true}
              scrollEnabled={true}
              zoomEnabled={true}
              showsUserLocation={false}
              annotations={this.state.annotation}
              styleURL={Mapbox.mapStyles.streets}
              />
          </View>

      </ScrollView>
      <ModalAfterDelete ref={(afterDelete) => { this.afterDelete = afterDelete; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="La vereda o cruce ha sido eliminada" action={() => Actions.pop({ refresh: { refreshAnnotations: true } }) }/>
      <ModalWarning ref={(error) => { this.error = error; }}  icon="alert" title="Error" background={this.state.color} text={this.state.response}/>
      <ModalSession ref={(session) => { this.session = session; }}  icon="alert" title="Aviso" background={this.state.color} text={this.state.response}/>
      <ModalDelete ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text="¿Deseas eliminar esta vereda o cruce?" action={() => this._deleteSidewalk()}/>
      </View>
    );
  }
}