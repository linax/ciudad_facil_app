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
    flexDirection: 'row',
    justifyContent: 'center'
  },
  viewChild: {
    width: width / 4,
    justifyContent: 'center',
  },
  viewChildTitle: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  }
});

module.exports = styles;