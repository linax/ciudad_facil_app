'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, Button, Platform } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const HeaderFilter = (props) => {

  return (
  	<View>
      { (Platform.OS === 'ios') && <View style={styles.statusBarStyle} /> }
	  <View style={styles.viewStyle}>
	    <View style={styles.viewChild}><Icon.Button name="chevron-left" style={{backgroundColor: '#3CC882'}} onPress={Actions.pop} size={26}/></View>
	    <View style={styles.viewChildTitle}><Text style={styles.textTitle}>{props.title}</Text></View>
	    <View style={styles.viewChild}><Icon2.Button name="filter" onPress={props.filter} style={{backgroundColor: '#3CC882', justifyContent: 'flex-end'}} size={26}>Filtrar</Icon2.Button></View>
	  </View>
	</View>
  );
};

export default HeaderFilter;