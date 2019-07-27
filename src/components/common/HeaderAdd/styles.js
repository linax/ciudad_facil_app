'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  statusBarStyle: {
    height: 20,
    backgroundColor: '#3CC882'
  },
  viewStyle: {
    backgroundColor: '#3CC882',
    height: (Platform.OS === 'ios') ? 45 : 56,
    flexDirection: 'row'
  },
  viewChild: {
    width: width / 4,
    justifyContent: 'center',
    paddingLeft: 15
  },
  viewChildTitle: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#3CC882', 
    height: 40
  },
  buttonOk: {
    marginRight: 10,
    width: 60
  },
  buttonTitle: {
    fontSize: 15,
    color: '#FFFFFF'
  }
});

module.exports = styles;