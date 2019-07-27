'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, Button, Platform } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const HeaderMain = (props) => {

  return (
    <View>
      { (Platform.OS === 'ios') && <View style={styles.statusBarStyle} /> }
      <View style={styles.viewStyle}>
        <View style={styles.viewChild}><Icon.Button name="navicon" style={{backgroundColor: '#3CC882'}} onPress={props.action}/></View>
        <View style={styles.viewChildTitle}>
          <Image source={require('../../../images/cf.png')} style={styles.icon}/>
          <Text style={styles.textTitle}>{props.title}</Text>
        </View>
        <View style={styles.viewChild}><Icon.Button name="filter" size={20} onPress={props.filter} style={{backgroundColor: '#3CC882', justifyContent: 'flex-end'}}>Filtrar</Icon.Button></View>
      </View>
    </View>
  );
};

export default HeaderMain;