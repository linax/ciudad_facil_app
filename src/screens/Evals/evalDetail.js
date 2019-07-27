'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ListView, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import SpinnerCustom from '../../components/common/Spinner/spinner';

import ModalWarning from '../../components/common/ModalWarning/modalWarning';
import ModalReload from '../../components/common/ModalReload/modalReload';
import Header from '../../components/common/Header/header';
import styles from './styles2';
import API from '../../API/ApiComm';
import userDefaults from '../../userDefaults.js';

export default class EvalDetail extends Component {

	constructor(props) {
		super(props);

		this.state = {
			evals: '',
			image: 'image_default'
		}
	}

	componentWillMount() {
		var img = global.vae.ema_img[0];
		if (img != null) {
			this.setState({ image: img });
		}
	}

	componentDidMount() {
		console.log(global.vae);
	}

  renderEvaluations() {
    return global.vae.vae.map((data, i) => {
      return(
          <Text key={i} style={styles.text}>{data.vie_dsc}</Text>
      )
    })
  }

  	render() {
    	return (
      	<View style={styles.container}>
      		<Header title='Detalle de Evaluación'/>

      		<ScrollView>
      			<View style={styles.header}>
		            <Image
		            source={{uri: this.state.image}}
		            style={[styles.image]}
		            resizeMode={'contain'}
		            />
      				<Text style={{fontStyle: 'italic', marginBottom: 10}}>"{global.vae.eup_cmn}"</Text>
      				<Text style={{marginBottom: 5}}>{global.vae.eup_created_at.substr(0,global.vae.eup_created_at.indexOf(' '))}</Text>
      				<Text style={{fontWeight: 'bold'}}>{global.vae.usr_evl}</Text>
      			</View>

      			<View style={styles.evals}>
      				{
      					this.renderEvaluations()
      				}
      			</View>
      		</ScrollView>
        </View>
    	);
  	}
}