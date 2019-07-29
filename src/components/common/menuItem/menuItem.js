'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const MenuItem = (props) => {

	return (
		<TouchableOpacity style={styles.container} onPress={props.action}>
			<Text style={{fontSize: 18, color: '#FFFFFF', fontWeight: 'bold'}}><Icon name={props.icon} size={20} style={styles.button} /> {props.title}</Text>
		</TouchableOpacity>
	);
};

export default MenuItem;