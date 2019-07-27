'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  viewStyle: {
    height: height * 0.0725,
    flexDirection: 'row'
  },
  viewChild: {
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewChild2: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitle: {
    color: '#808080',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  selectedView: {
    borderBottomWidth: 5,
    borderBottomColor: '#3CC882'
  },
  unselectedView: {
    borderBottomWidth: 1,
    borderBottomColor: '#808080'
  }
});

module.exports = styles;