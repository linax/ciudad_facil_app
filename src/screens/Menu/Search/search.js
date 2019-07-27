'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, ListView, TouchableOpacity, Image, Alert } from 'react-native';
import SpinnerCustom from '../../../components/common/Spinner/spinner';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import HeaderFilter from '../../../components/common/HeaderFilter/headerFilter';
import config from '../../../userDefaults.js';
import styles from './styles';

import ModalFilter from '../../../components/common/ModalFilter/modalFilter';
import ModalFilterAccess from '../../../components/common/ModalFilter/modalFilterAccess';
import ModalFilterDistance from '../../../components/common/ModalFilter/modalFilterDistance';
import ModalFilterCategories from '../../../components/common/ModalFilter/modalFilterCategories';
import ModalSelectFilter from '../../../components/common/ModalSelectFilter/modalSelectFilter';

class Search extends Component {

	constructor(props) {
		super(props);

	    this.filtredDataByType = [];
	    this.filtredDataByAccess = [];
	    this.filtredDataByDistance = [];
      this.searchedArray = [];

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
			dataSource: ds.cloneWithRows([]),
			visible: false,
			annotations: [],
		    latitude: global.userLatitude,
		    longitude: global.userLongitude
		}
	}

	componentWillMount() {
		this.setState({
			visible: true
		});
		this._setDistance();
	}

	componentDidMount() {
		var anot = global.annotations;
    this.searchedArray = global.annotations;
		var len = anot.length;
		for (var i = 0; i < len; i++) {
			anot[i].icon = this._setImageOfIcon(anot[i].evp_typ, anot[i].evp_eva_fin);
		}
	    setTimeout(() => {
	      	this.setState({
	        	visible: false,
	        	dataSource: this.state.dataSource.cloneWithRows(global.annotations)
	      	});
	    }, 2000);
	}

	_setDistance() {
	    var lat = this.state.latitude;
	    var long = this.state.longitude;
	    var anot = global.annotations;
		var len = anot.length;
		for (var i = 0; i < len; i++) {
			anot[i].distance = this.getDistance(lat, long, anot[i].evp_lat, anot[i].evp_lon);
			anot[i].distance = Math.round(anot[i].distance);
		}

		global.annotations = anot;
	}

	setByDistance() {
		global.showClose = false;
		this.setState({ visible: true });
		var filtredData = this.searchedArray.slice(0);

    filtredData.sort(function(a, b) {
      return parseFloat(a.distance) - parseFloat(b.distance);
    });

		console.log(filtredData);

	    setTimeout(() => {
	      	this.setState({
	        	visible: false,
	        	dataSource: this.state.dataSource.cloneWithRows(filtredData)
	      	});
	    }, 1000);
	}

	_setMax(arr) {

	}

	_setImageOfIcon(type, evaluation) {
	    switch(type){
	      case 1:
	        return 'car_blue';
	        break;
	      case 2:
	        return 'build_' + evaluation;
	        break;
	      case 3:
	        return 'public_' + evaluation;
	        break;
	      case 4:
	        return 'corner_' + evaluation;
	        break;
	      default:
	        return 'https://cldup.com/CnRLZem9k9.png';
	    }
	}

	_didTapSearchPlace(value) {

		if (value === '') {
      this.searchedArray = global.annotations
			this.setState({ dataSource: this.state.dataSource.cloneWithRows(global.annotations) });
		} else {
    		var anots = global.annotations;
			var len = anots.length;
			var filter = [];
			var cont = 0;
			for (var i= 0; i < len; i++) {
				var name = anots[i].evp_nam;
				if(name.includes(value)) {
					filter[cont] = anots[i];
					cont++;
				}
			}
      this.searchedArray = filter
			this.setState({ dataSource: this.state.dataSource.cloneWithRows(filter) });
		}
	}

	getDistance(lat1, lon1, lat2, lon2) {
	  var R = 6371;
	  var dLat = (lat2 - lat1) * Math.PI / 180;
	  var dLon = (lon2 - lon1) * Math.PI / 180;
	  var a =
	     0.5 - Math.cos(dLat)/2 +
	     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
	     (1 - Math.cos(dLon))/2;

	  return R * 2 * Math.asin(Math.sqrt(a));
	}

	_viewDetail(id, ed_type) {
		var type = ed_type;
		global.id = id;
		global.setReload += 1;
	    switch(type){
	      case 1:
	        //Estacionamientos
	        Actions.ParkingDetail();
	        break;
	      case 2:
	        //Edificaciones
	        Actions.BuildDetail();
	        break;
	      case 3:
	        //Espacio público
	        Actions.PublicSpaceDetail();
	        break;
	      case 4:
	        //V y C
	        Actions.SidewalkDetail();
	        break;
	    }
	}

	_showSelectFilter() {
		this.select.modalBehavior();
	}

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
        this.setState({ annotations: [] });
        this.setState({visible: true});
        this.searchedArray = filtredData
        setTimeout(() => {
          this.setState({
            visible: false,
            dataSource: this.state.dataSource.cloneWithRows(filtredData)
          });
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
        this.setState({ annotations: [] });
        this.setState({visible: true});
        this.searchedArray = filtredData
        setTimeout(() => {
          this.setState({
            visible: false,
            dataSource: this.state.dataSource.cloneWithRows(filtredData)
          });
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
        this.setState({ annotations: [] });
        this.setState({visible: true});
        this.searchedArray = filtredData
        setTimeout(() => {
          this.setState({
            visible: false,
            dataSource: this.state.dataSource.cloneWithRows(filtredData)
          });
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
      this.setState({ annotations: [] });
      this.setState({visible: true});
      this.searchedArray = filtredData
      setTimeout(() => {
        this.setState({
          visible: false,
          dataSource: this.state.dataSource.cloneWithRows(filtredData)
        });
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
          this.setState({ annotations: [] });
          this.setState({visible: true});
          this.searchedArray = filtredData
          setTimeout(() => {
            this.setState({
              visible: false,
              dataSource: this.state.dataSource.cloneWithRows(filtredData)
            });

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
          this.setState({ annotations: [] });
          this.setState({visible: true});
          this.searchedArray = filtredData
          setTimeout(() => {
            this.setState({
              visible: false,
              dataSource: this.state.dataSource.cloneWithRows(filtredData)
            });
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
      this.setState({ annotations: [] });
      this.setState({visible: true});
      this.searchedArray = filtredData
      setTimeout(() => {
        this.setState({
          visible: false,
          dataSource: this.state.dataSource.cloneWithRows(filtredData)
        });
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
      this.setState({ annotations: [] });
      this.setState({visible: true});
      this.searchedArray = filtredData
      setTimeout(() => {
        this.setState({
          visible: false,
          dataSource: this.state.dataSource.cloneWithRows(filtredData)
        });

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
      this.setState({ annotations: [] });
      this.setState({visible: true});
      this.searchedArray = filtredData
      setTimeout(() => {
        this.setState({
          visible: false,
          dataSource: this.state.dataSource.cloneWithRows(filtredData)
        });

      }, 500);
    }
  }

  filterDataByDistance() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var filtredData = [];
            var annotations = global.annotations;
            var len = annotations.length;
            var cont = 0;
            var distance = 0;
            for (var i = 0; i < len; i++) {
              distance = this.getDistance(lat, long, annotations[i].evp_lat, annotations[i].evp_lon);
              if(distance <= global.filter) {
                filtredData[cont] = annotations[i];
                cont++;
              }
          }

          global.filter;
          this.setState({ annotations: [] });
          this.setState({visible: true});
          this.searchedArray = filtredData
          setTimeout(() => {
            this.setState({
              visible: false
          });
          console.log(lat+" "+long);
          this.setState({ dataSource: this.state.dataSource.cloneWithRows(filtredData) });
        }, 500);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  clearFilter(){
  	global.showClose = false;
    this.filtredDataByType = [];
    this.filtredDataByAccess = [];
    this.filtredDataByDistance = [];
    this.setState({ annotations: [] });
    this.setState({visible: true});
    setTimeout(() => {
      this.setState({
        visible: false,
        dataSource: this.state.dataSource.cloneWithRows(global.annotations)
      });

    }, 500);
  }

	_renderCell(rowData) {
		return(
			<TouchableOpacity onPress={() => this._viewDetail(rowData.evp_id, rowData.evp_typ)}>
				<View style={styles.rowContainer}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Image style={styles.image} source={{ uri: rowData.icon}} />
						<View>
							<Text style={styles.titleData}>{rowData.evp_nam}</Text>
							<Text style={{paddingLeft: 10}}>{rowData.distance} Km</Text>
						</View>
					</View>
					<View style={styles.showContent}>
						<Icon name="chevron-right" size={20} color="#B6B8B3" />
					</View>
				</View>
        <View style={styles.separatorLine} />
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<SpinnerCustom visible={this.state.visible}/>
				<HeaderFilter title='Buscar lugares' filter={() => this._showSelectFilter()}/>

				<View style={styles.containerInput}>
					<Text style={{fontSize: 16, marginTop: 10, marginBottom: 10}}>Busca el lugar que necesitas</Text>
					<View style={styles.containerTextInput}>
						<Icon name="search" size={25} color="#606060" />
						<TextInput underlineColorAndroid='transparent' style={styles.input} onChangeText={(value) => this._didTapSearchPlace(value)}></TextInput>
					</View>
					<TouchableOpacity style={styles.add} onPress={() => this.setByDistance()}>
							<Text style={styles.textDistance}>Ordenar por distancia</Text>
					</TouchableOpacity>
				</View>

				<ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderCell.bind(this)} />
       			<ModalSelectFilter ref={(select) => { this.select = select; }}  icon="filter" filter={() => this._selectFilter()} clearFilter={() => this.clearFilter()} title="Seleccionar filtro" background="#3CC882"/>
       			<ModalFilter ref={(filter) => { this.filter = filter; }}  icon="filter" filter={() => this.setCategories()} title="Filtrar" background="#3CC882"/>
       			<ModalFilterAccess ref={(access) => { this.access = access; }}  icon="filter" filter={() => this.filterDataByAccess()} title="Filtrar" background="#3CC882"/>
       			<ModalFilterDistance ref={(distance) => { this.distance = distance; }}  icon="filter" filter={() => this.filterDataByDistance()} title="Filtrar" background="#3CC882"/>
       			<ModalFilterCategories ref={(categories) => { this.categories = categories; }}  icon="filter" filter={() => this.filterData()} filterCategory={() => this.filterDataByCategory()} title="Filtrar por categoría" background="#3CC882"/>
			</View>
		);
	}
}

export default Search;