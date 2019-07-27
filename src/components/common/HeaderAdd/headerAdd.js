'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, Button, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles.js';

const HeaderAdd = (props) => {

  return (
  	<View>
      	{ (Platform.OS === 'ios') && <View style={styles.statusBarStyle} /> }
		<View style={styles.viewStyle}>
		  <View style={styles.viewChild}><Icon.Button name="chevron-left" style={styles.button} onPress={props.actionBack} size={26}/></View>
		  <View style={styles.viewChildTitle}><Text style={styles.textTitle}>{props.title}</Text></View>
		  <View style={[styles.viewChild, {alignItems: 'flex-end'}]}>
		  	{!props.isEditing && !props.hideRightButton && <Icon.Button name="chevron-right" style={styles.button} onPress={props.actionNext} size={26} />}
		  	{props.isEditing && !props.hideRightButton && <TouchableOpacity style={styles.buttonOk} onPress={props.saveChanges}>
		  	<Text style={styles.buttonTitle}>Guardar</Text>
		  	</TouchableOpacity>
		  }
		  </View>
		</View>
	</View>
  );
};

export default HeaderAdd;