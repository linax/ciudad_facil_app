'use strict';

import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, AsyncStorage, ActivityIndicator, Text, Alert, NetInfo } from 'react-native';

import Mapbox, { MapView } from 'react-native-mapbox-gl';
import Icon from 'react-native-vector-icons/FontAwesome';
import SpinnerCustom from '../../components/common/Spinner/spinner';
import { Actions, ActionConst } from 'react-native-router-flux';

import Header from '../../components/common/headerMain/headerMain';
import ModalDetail from '../../components/common/ModalDetail/modalDetail';
import ModalParkingDetail from '../../components/common/ModalParkingDetail/modalParkingDetail';
import ModalPublicDetail from '../../components/common/ModalPublicDetail/modalPublicDetail';
import ModalAdd from '../../components/common/ModalAdd/modalAdd';
import ModalWarning from '../../components/common/ModalWarning/modalWarning';
import ModalFilter from '../../components/common/ModalFilter/modalFilter';
import ModalFilterAccess from '../../components/common/ModalFilter/modalFilterAccess';
import ModalFilterDistance from '../../components/common/ModalFilter/modalFilterDistance';
import ModalFilterCategories from '../../components/common/ModalFilter/modalFilterCategories';
import ModalSelectFilter from '../../components/common/ModalSelectFilter/modalSelectFilter';
import userDefaults from '../../userDefaults.js';
import API from '../../API/ApiComm';
import styles from './styles';
import InternetStatusView from '../../components/common/InternetStatusView/InternetStatusView';

Mapbox.setAccessToken(global.accessToken);

var width = Dimensions.get('window').width;
global.buttonSize = 45;

export default class MainMap extends Component {

  constructor(props) {
    super(props);

    this.filtredDataByType = [];
    this.filtredDataByAccess = [];
    this.filtredDataByDistance = [];

    this.state = {
      isLoaded: false,
      zoom: 11,
      annotations: [],
      selectedAnnotation: [],
      value: 0,
      visible: false,
      center: {
        latitude: -39.8143284,
        longitude: -73.2234442
      },
      showButtons: !global.visibilityMap,
      errorMessage: 'Se ha producido un error'
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('visibility_map').then((keyValue) => {
      global.visibilityMap = (keyValue == 'true');
    });
  }

  componentDidMount() {
    if(global.zoom != null) {
      this.setState({ zoom: global.zoom });
    } else {
      this.setState({ zoom: 11 });
    }

    this._getPoints();

    setTimeout(() => {
        this._centerMap();
    }, 2000);    
    
  }

  componentWillUpdate(nextProps, nextStates) {
    if (nextStates.showButtons == global.visibilityMap) {
      this.updateButtonsConfig()
    }
  }

  updateButtonsConfig() {
    this.setState({
      showButtons: !global.visibilityMap
    });
  }

  _setImageOfIcon(type, evaluation) {
    switch(type){
      case 1:
        //Estacionamientos
        return 'car_blue';
        break;
      case 2:
        //Edificaciones
        return 'build_' + evaluation;
        break;
      case 3:
        //Espacio público
        return 'public_' + evaluation;
        break;
      case 4:
        //V y C
        return 'corner_' + evaluation;
        break;
      default:
        return 'https://cldup.com/CnRLZem9k9.png';
    }
  }

  onOpenAnnotation = (annotation) => {
    var id = annotation.id;
    for (var i = 0; i < (global.annotations).length; i++) {
      if ((global.annotations[i]).evp_id == id ) {
        var annotation = global.annotations[i];
      }
    }

    var image = this._setImageOfIcon(annotation.evp_typ, annotation.evp_eva_fin);

    this.setState({
      selectedAnnotation: {
        id: annotation.evp_id,
        name: annotation.evp_nam,
        type: annotation.evp_typ,
        evp_eva: annotation.evp_eva,
        final: annotation.evp_eva_fin,
        image: image
      }
    });

    if(annotation.evp_typ == 1 || annotation.evp_typ == 4) {
      global.setReload += 1;
      this.fii.modalBehavior();
      }
    else if(annotation.evp_typ == 3) {
      global.setReload += 1;
      this.fuu.modalBehavior();
    } else {
      global.setReload += 1;
      this.foo.modalBehavior();
    }
  };

  _changeZoom(zoom){
    var actualZoom = this.state.zoom + zoom;
    this.setState({
      zoom: actualZoom
    });
    global.zoom = actualZoom + zoom;
    this._map.setZoomLevel(actualZoom);
  }

  async _centerMap(){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                           'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({
                            center: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        });
                        this._map.setCenterCoordinate(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => this.setState({ error: error.message }),
                    { 
                        enableHighAccuracy: true, 
                        timeout: 20000, 
                        maximumAge: 60000 
                    }
                );

                global.userLatitude = this.state.center.latitude;
                global.userLongitude = this.state.center.longitude;
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
        
    }

  _getPoints() {
    this.setState({ visible: true })
    API.getEvaluationPoints().then(json => {
      json = json.data;
      global.annotations = json;
      this._setData(json);
      this.setState({ visible: false })
    }).catch(error => {
      this.setState({ visible: false })
    });
  }

  _setData(json) {
      var annotationsArray = []
      for (var i = 0; i < json.length; i++) {
        var id = String(json[i].evp_id);
        var icon = this._setImageOfIcon(json[i].evp_typ, json[i].evp_eva_fin);
        var latitude = parseFloat(json[i].evp_lat);
        var longitude = parseFloat(json[i].evp_lon);

        var annotation = {
          coordinates: [latitude, longitude],
          type: 'point',
          title: json[i].evp_nam,
          annotationImage: {
            source: { uri: icon },
            height: 35,
            width: 35
          },
          id: id
        }

        annotationsArray.push(annotation)
      }
      this.setState({
        annotations: annotationsArray
      })
  }

  showNotLogged(error) {
    this.setState({ noSessionError: error})
    this.warning.modalBehavior();
  }

  showNotConnection() {
    this.setState({ errorMessage: "Sin conexión a internet, por favor verifica tu conexión para continuar."})
    this.error.modalBehavior();
  }

  addMarker = (data) => {
    global.setReload += 1;
    global.latitude = data.latitude;
    global.longitude = data.longitude;
    this.add.modalBehavior();
  }

  //Seleccion de tipo de filtro
  didTapFilterData() {
    this.setState({ visible: true });
    API.getUserDetails().then(json => {
        this.setState({ visible: false });
        this.select.modalBehavior();
    }).catch(error => {
        this.setState({ visible: false });
        if(error == 'no-connection') {
          this.setState({ errorMessage: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
          this.error.modalBehavior();
        }
        else if(error == 'auth') {
          this.showNotLogged("Debes iniciar sesión para poder filtrar")
        } else {
          this.setState({ errorMessage: 'Se ha producido un error'})
          this.error.modalBehavior();
        }
    });
  }

  //Obtengo el filtro
  _selectFilter() {
    this.select.modalBehavior();
    if(global.filter == 1){
      this.access.modalBehavior();
    }
    if (global.filter == 0) {
      this.filter.modalBehavior();
    }
    if (global.filter == 2) {
      this.distance.modalBehavior();
    }
  }

  filterData() {

    var j = (this.filtredDataByAccess).length;
    var k = (this.filtredDataByDistance).length;
    console.log(j);
    console.log(k);
    if ( j != 0 ) {
        var filtredData = [];
        var annotations = this.filtredDataByAccess;
        var len = annotations.length;
        var cont = 0;
        for (var i = 0; i < len; i++) {
          if(annotations[i].evp_typ == global.filter) {
            filtredData[cont] = annotations[i];
            cont++;
          }
        }

        global.filter;
        this.setState({visible: true});
        setTimeout(() => {
          this.setState({
            visible: false
          });

          this._setData(filtredData);
        }, 500);
    } else if (k != 0) {
        var filtredData = [];
        var annotations = this.filtredDataByDistance;
        var len = annotations.length;
        var cont = 0;
        for (var i = 0; i < len; i++) {
          if(annotations[i].evp_typ == global.filter) {
            filtredData[cont] = annotations[i];
            cont++;
          }
        }

        global.filter;
        this.setState({ visible: true });
        setTimeout(() => {
          this.setState({
            visible: false
          });

          this._setData(filtredData);
        }, 500);
    } else if (k != 0 && j != 0) {
        var filtredData = [];
        var annotations = this.filtredDataByAccess;
        var len = annotations.length;
        var cont = 0;
        for (var i = 0; i < len; i++) {
          if(annotations[i].evp_typ == global.filter) {
            filtredData[cont] = annotations[i];
            cont++;
          }
        }

        global.filter;
        this.setState({ visible: true });
        setTimeout(() => {
          this.setState({
            visible: false
          });

          this._setData(filtredData);
        }, 500);
    }else {
      var filtredData = [];
      var annotations = global.annotations;
      var len = annotations.length;
      var cont = 0;
      for (var i = 0; i < len; i++) {
        if(annotations[i].evp_typ == global.filter) {
          filtredData[cont] = annotations[i];
          this.filtredDataByType[cont] = annotations[i];
          cont++;
        }
      }

      global.filter;
      this.setState({visible: true});
      setTimeout(() => {
        this.setState({
          visible: false
        });

        this._setData(filtredData);
      }, 500);
    }
  }

  filterDataByAccess() {

    var j = (this.filtredDataByType).length;
    var k = (this.filtredDataByDistance).length;
    if (j != 0) {
          var filtredData = [];
          var annotations = this.filtredDataByType;
          var len = annotations.length;
          var cont = 0;
          for (var i = 0; i < len; i++) {
            if(annotations[i].evp_eva_fin == global.filter && annotations[i].evp_typ != 1) {
              filtredData[cont] = annotations[i];
              cont++;
            }
          }

          global.filter;
          this.setState({visible: true});
          setTimeout(() => {
            this.setState({
              visible: false
            });

            this._setData(filtredData);
          }, 500);
    } else if (k != 0) {
          var filtredData = [];
          var annotations = this.filtredDataByDistance;
          var len = annotations.length;
          var cont = 0;
          for (var i = 0; i < len; i++) {
            if(annotations[i].evp_eva_fin == global.filter && annotations[i].evp_typ != 1) {
              filtredData[cont] = annotations[i];
              this.filtredDataByAccess[cont] = annotations[i];
              cont++;
            }
          }

          global.filter;
          this.setState({visible: true});
          setTimeout(() => {
            this.setState({
              visible: false
            });

            this._setData(filtredData);
          }, 500);
    }else {
      var filtredData = [];
      var annotations = global.annotations;
      var len = annotations.length;
      var cont = 0;
      for (var i = 0; i < len; i++) {
        if(annotations[i].evp_eva_fin == global.filter && annotations[i].evp_typ != 1) {
          filtredData[cont] = annotations[i];
          this.filtredDataByAccess[cont] = annotations[i];
          cont++;
        }
      }

      global.filter;
      this.setState({visible: true});
      setTimeout(() => {
        this.setState({
          visible: false
        });

        this._setData(filtredData);
      }, 500);
    }
  }

  filterDataByCategory() {
    var j = (this.filtredDataByType).length;
    var k = (this.filtredDataByDistance).length;
    if (k != 0 && j != 0) {
      var filtredData = [];
      var annotations = this.filtredDataByAccess;
      var len = annotations.length;
      var cont = 0;
      for (var i = 0; i < len; i++) {
        if(annotations[i].evp_sub_cat == global.filter) {
          filtredData[cont] = annotations[i];
          this.filtredDataByType[cont] = annotations[i];
          cont++;
        }
      }

      global.filter;
      this.setState({visible: true});
      setTimeout(() => {
        this.setState({
          visible: false
        });

        this._setData(filtredData);
      }, 500);
    }
    else {
      var filtredData = [];
      var annotations = global.annotations;
      var len = annotations.length;
      var cont = 0;
      for (var i = 0; i < len; i++) {
        if(annotations[i].evp_sub_cat == global.filter) {
          filtredData[cont] = annotations[i];
          this.filtredDataByType[cont] = annotations[i];
          cont++;
        }
      }

      global.filter;
      this.setState({visible: true});
      setTimeout(() => {
        this.setState({
          visible: false
        });

        this._setData(filtredData);
      }, 500);
    }
  }

  filterDataByDistance() {
      var lat = this.state.center.latitude;
      var long = this.state.center.longitude;
      var filtredData = [];
      var annotations = global.annotations;
      var len = annotations.length;
      var cont = 0;
      var distance = 0;
      for (var i = 0; i < len; i++) {
        distance = this.getDistance(lat, long, annotations[i].evp_lat, annotations[i].evp_lon);
        if(distance <= global.filter) {
          filtredData[cont] = annotations[i];
          this.filtredDataByDistance[cont] = annotations[i];
          cont++;
        }
      }

      global.filter;
      this.setState({visible: true});
      setTimeout(() => {
        this.setState({
          visible: false
      });
      console.log(lat+" "+long);
      this._setData(filtredData);
    }, 500);
  }

  getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
       0.5 - Math.cos(dLat)/2 +
       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
       (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
  }



  // Limpia filtros
  clearFilter(){
    global.showClose = false;
    this.filtredDataByType = [];
    this.filtredDataByAccess = [];
    this.filtredDataByDistance = [];
    this.setState({visible: true});
    setTimeout(() => {
      this.setState({
        visible: false
      });

      this._setData(global.annotations);
    }, 500);
  }

  setCategories(){
    if(global.filter == 1  || global.filter == 4){
      this.filterData();
    } else {
      this.setState({ visible: true });
      this.categories.modalBehavior();
      setTimeout(() => {
        this.setState({ visible: false });
        }, 2000);
    }
  }


  render() {
    AsyncStorage.getItem('button_size').then((keyValue) => { global.buttonSize = parseInt(keyValue) });
    return(
      <View style={{flex: 1}}>
        <SpinnerCustom visible={this.state.visible}/>
        <Header title='Ciudad Fácil' action={this.props.openDrawer} filter={() => this.didTapFilterData()} size='18'/>
        <View style={styles.container}>
        <MapView
          ref={map => { this._map = map; }}
          style={styles.map}
          initialCenterCoordinate={this.state.center}
          initialZoomLevel={this.state.zoom}
          initialDirection={0}
          rotateEnabled={false}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          styleURL={Mapbox.mapStyles.streets}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onLongPress={this.addMarker}
          annotationsPopUpEnabled={false}
          logoIsHidden={false}
        />


        { this.state.showButtons &&
        <View style={styles.box1}>
            <TouchableOpacity style={[styles.button, {width: 46}, {height: 46}]} underlayColor='rgba(151,151,151,0.9)' onPress={() => Actions.Help()}>
              <Icon name="question" size={23} />
            </TouchableOpacity>
        </View>
        }

        { this.state.showButtons &&
        <View style={styles.box2}>
            <TouchableOpacity style={[styles.button, {width: 46}, {height: 46}]} underlayColor='rgba(151,151,151,0.9)' onPress={() => this._changeZoom(2)}>
              <Icon name="plus" size={23} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {width: 46}, {height: 46}]} underlayColor='rgba(151,151,151,0.9)' onPress={() => this._changeZoom(-2)}>
              <Icon name="minus" size={23} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {width: 46}, {height: 46}]} underlayColor='rgba(151,151,151,0.9)' onPress={() => this._centerMap()}>
              <Icon name="crosshairs" size={23} />
            </TouchableOpacity>
        </View>
        }
       </View>
       <InternetStatusView
              textToDisplay="Has perdido la conexión a internet, por favor verifica tu conexión." style={styles.internetBar}/>

       <ModalDetail annotation={this.state.selectedAnnotation} ref={(foo) => { this.foo = foo; }} notLogged={() => this.showNotLogged("Debes iniciar sesión para ver detalles")} noConnection={() => this.showNotConnection()}/>
       <ModalParkingDetail annotation={this.state.selectedAnnotation} ref={(fii) => { this.fii = fii; }} notLogged={() => this.showNotLogged("Debes iniciar sesión para ver detalles")} noConnection={() => this.showNotConnection()}/>
       <ModalPublicDetail annotation={this.state.selectedAnnotation} ref={(fuu) => { this.fuu = fuu; }} notLogged={() => this.showNotLogged("Debes iniciar sesión para ver detalles")} noConnection={() => this.showNotConnection()}/>
       <ModalAdd ref={(add) => { this.add = add; }} notLogged={() => this.showNotLogged("Debes iniciar sesión para agregar un marcador")} noConnection={() => this.showNotConnection()}/>

       <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Aviso" background="#3CC882" text={this.state.noSessionError}/>
       <ModalWarning ref={(version) => { this.version = version; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="Existe una nueva versión disponible de Ciudad Fácil, actualizala!"/>
       <ModalWarning ref={(error) => { this.error = error; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.errorMessage}/>

       <ModalSelectFilter ref={(select) => { this.select = select; }}  icon="filter" filter={() => this._selectFilter()} clearFilter={() => this.clearFilter()} title="Seleccionar filtro" background="#3CC882"/>
       <ModalFilter ref={(filter) => { this.filter = filter; }}  icon="filter" filter={() => this.setCategories()} title="Filtrar" background="#3CC882"/>
       <ModalFilterAccess ref={(access) => { this.access = access; }}  icon="filter" filter={() => this.filterDataByAccess()} title="Filtrar" background="#3CC882"/>
       <ModalFilterDistance ref={(distance) => { this.distance = distance; }}  icon="filter" filter={() => this.filterDataByDistance()} title="Filtrar" background="#3CC882"/>
       <ModalFilterCategories ref={(categories) => { this.categories = categories; }}  icon="filter" filter={() => this.filterData()} filterCategory={() => this.filterDataByCategory()} title="Filtrar por categoría" background="#3CC882"/>

    </View>
    );
  }
}
