'use strict';

import React, { Component } from 'react';
import {  View, Text, Dimensions, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

import styles from './styles.js';
import commonStyles from '../../../screens/commonStyles';
import userDefaults from '../../../userDefaults.js';

export default class EvaluateButton extends Component {

	constructor(props) {
		super(props);
	}


	_getDetail(){
		global.type = this.props.type;
		Actions.PointsDetail();
	}

	render() {
	  return (
	        <TouchableHighlight style={styles.container} onPress={() => this._getDetail()}>
				<View style={styles.viewContainer}>
				<Image source={this.props.imgName} style={styles.img} />
	          	<Text style={commonStyles.buttonText}> {this.props.title}</Text>
				</View>
	      </TouchableHighlight>
	  );
	}

};
