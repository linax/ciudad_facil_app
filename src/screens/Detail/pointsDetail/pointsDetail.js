'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SpinnerCustom from '../../../components/common/Spinner/spinner';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '../../../components/common/Header/header';
import ModalWarning from '../../../components/common/ModalWarning/modalWarning';
import styles from './styles';
import API from '../../../API/ApiComm';

var image = 'car_1';

export default class PointsDetail extends Component {

	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
			title: 'Puntos de Evaluación',
			dataSource: ds.cloneWithRows([]),
			visible: false
		}
	}

	componentWillMount() {
		var type = global.type;
		switch(type) {
			case '1':
				this.setState({ title: 'Estacionamientos agregados' });
				break;
			case '2':
				this.setState({ title:  'Edificaciones agregadas'});
				break;
			case '3':
				this.setState({ title:  'Espacios públicos agregados'});
				break;
			case '4':
				this.setState({ title:  'Veredas y cruces agregados'});
				break;
			default:
				break;
		}

		this.setState({ visible: true });
		API.getEvaluationPointsByUser().then(json => {
			var data = json.data;
			var cont = 0;
			var filter = [];
			for (var i = 0; i < data.length; i++) {
				if( data[i].evp_typ == type) {
					filter[cont] = data[i];
					filter[cont].icon = this._setImageOfIcon(data[i].evp_typ, data[i].evp_eva_fin);
					cont += 1;
				}
			}

			if(filter.length != 0) this.setState({ dataSource: this.state.dataSource.cloneWithRows(filter) });
			this.setState({ visible: false });
		}).catch(error => {
        this.warning.modalBehavior();
        this.setState({ visible: false });
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

	_viewDetail(id) {
		var type = global.type.toString();
		global.id = id;
		global.setReload += 1;

	    switch(type){
	      case '1':
	        //Estacionamientos
	        Actions.ParkingDetail();
	        break;
	      case '2':
	        //Edificaciones
	        Actions.BuildDetail();
	        break;
	      case '3':
	        //Espacio público
	        Actions.PublicSpaceDetail();
	        break;
	      case '4':
	      case '5':
	        //V y C
	        Actions.SidewalkDetail();
	        break;
	    }
	}

	_renderCell(rowData) {
		return(
			<TouchableOpacity onPress={() => this._viewDetail(rowData.evp_id)}>
				<View>
					<View style={styles.rowContainer}>
						<Image style={styles.image} source={{ uri: rowData.icon}} />
						<Text style={styles.titleData}>{rowData.evp_nam}</Text>
						<Icon style={styles.showContent} name="chevron-right" size={18} color="#B6B8B3" />
					</View>
					<View style={styles.separatorLine} />
				</View>
			</TouchableOpacity>
		);
	}

  	render() {
    	return (
      	<View style={styles.container}>
      		<ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text="Tu sesión ha caducado, cierra y vuelve a iniciar sesión"/>
      		<SpinnerCustom visible={this.state.visible}/>
        	<Header title='Puntos de evaluación'/>

        	<View style={styles.titleContainer}>
        		<Text style={styles.title}>{this.state.title}</Text>
        	</View>

          <ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderCell.bind(this)} />
          <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text="Tu sesión ha caducado, cierra y vuelve a iniciar sesión"/>
      	</View>
    	);
  	}
}