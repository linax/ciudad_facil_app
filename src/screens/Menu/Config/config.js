'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, ScrollView, Image, TouchableHighlight, AsyncStorage, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-check-box';
import ModalDropdown from 'react-native-modal-dropdown';

import Header from '../../../components/common/Header/header';
import config from '../../../userDefaults.js';
import styles from './styles';
import commonStyles from '../../commonStyles';
import Picker from 'react-native-picker';


class Configure extends Component {

	constructor(props) {
		super(props);

		this.dataZoom = ['1x', '2x', '3x'];
    	this.valuesZoom = [45, 60, 75];

		this.state = {
			show: global.visibilityMap,
			reload: global.reload,
			size: global.buttonSize
		}
	}

	async _onValueChange(item, selectedValue) {
	    try {
	      await AsyncStorage.setItem(item, selectedValue);
	    } catch (error) {
	      console.log('AsyncStorage error: ' + error.message);
	    }
	}

	_showZoom() {
		if (this.state.show) {
			this.setState({ show: false });
		} else {
			this.setState({ show: true });
		}
	}

	_saveConfiguration() {
		this._onValueChange('time_reload', (this.state.reload).toString());
		global.reload = Number(this.state.reload);
		this._onValueChange('visibility_map', (this.state.show).toString());
		global.visibilityMap = (this.state.show)
		//AsyncStorage.getItem('visibility_map').then((keyValue) => { global.visibilityMap =  (keyValue === 'true') });
		this._onValueChange('button_size', (this.state.size).toString());
		global.buttonSize =  Number(this.state.size);
	    Actions.pop({refresh: {reloadComponent: true }});
	}

  _showPickerRefresh() {
    let data = ['10 min', '30 min', '1 Hora', '1.5 Hrs', '2 Hrs'];
    let values = [600000, 1800000, 3600000, 5400000, 7200000]

    Keyboard.dismiss();

    Picker.init({
      pickerData: data,
      onPickerConfirm: pickedValue => {
      	let index = data.indexOf(pickedValue.toString())
      	this.setState({ reload: values[index] });
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Actualizar',
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Cancelar'
    });

    Picker.show()
  }

  _showPickerZoom() {
    Keyboard.dismiss();

    Picker.init({
      pickerData: this.dataZoom,
      onPickerConfirm: pickedValue => {
      	let index = this.dataZoom.indexOf(pickedValue.toString())
      	this.setState({ size: this.valuesZoom[index] });
      },
      pickerConfirmBtnColor: [60,200,130,1],
      pickerCancelBtnColor: [0,0,0,1],
      pickerTitleText: 'Zoom',
      pickerConfirmBtnText: 'Confirmar',
      pickerCancelBtnText: 'Cancelar'
    });

    Picker.show()
  }

  _getTextOfZoom() {
  	let indexZoom = this.valuesZoom.indexOf(this.state.size)
  	if (indexZoom != -1) {
  		return this.dataZoom[indexZoom].toString()
  	}
  	else {
  		return '1x'
  	}
  }

	render() {
		return (
			<View style={styles.container}>
				<Header title='Configuración'/>

				<ScrollView>
					<View style={styles.contentContainer}>

						<View style={styles.showZoom}>
							 <CheckBox
							     style={{flex: 1, borderColor:'#7F7F7F'}}
							     leftText="No mostrar botones de zoom:"
							     leftTextStyle={[styles.textConfig, commonStyles.text]}
							     onClick={() => this._showZoom()}
							     isChecked={this.state.show}
							     checkedImage={<Icon name="check-square" size={25} color="#606060" />}
							     unCheckedImage={<Icon name="square-o" size={25} color="#606060" />}
							  />
						</View>

						<View style={styles.actualization}>
							<Text style={[styles.textConfig, commonStyles.text]}>Actualizar mapa cada:</Text>
							<TextInput value={this.state.reload/60000 + ' mins'} onFocus={this._showPickerRefresh.bind(this)} style={styles.picker}></TextInput>
						</View>

						<View style={styles.actualization}>
							<Text style={[styles.textConfig, commonStyles.text]}>Tamaño de botones en mapa:</Text>
							<TextInput value={this._getTextOfZoom()} onFocus={this._showPickerZoom.bind(this)} style={styles.picker}></TextInput>
						</View>

				        <TouchableHighlight style={styles.containerButton} onPress={() => this._saveConfiguration()}>
				          <View><Text style={commonStyles.buttonText}>Guardar Cambios</Text></View>
				      </TouchableHighlight>
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default Configure;
