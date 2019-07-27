'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, Button, Platform } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';

const Header = (props) => {

  return (
  	<View>
      	{ (Platform.OS === 'ios') && <View style={styles.statusBarStyle} /> }
		<View style={styles.viewStyle}>
		  <View style={styles.viewChild}><Icon.Button name="chevron-left" style={styles.button} size={26} onPress={() => Actions.pop(props.popParams)}/></View>
		  <View style={styles.viewChildTitle}><Text style={styles.textTitle}>{props.title}</Text></View>
		  <View style={styles.viewChild}></View>
		</View>
	</View>
  );
};

export default Header;