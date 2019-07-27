'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#3CC882',
    width: width * 0.6,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  viewContainer: {
    flexDirection: 'row'
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginRight: 4
  },
  img: {
    width: 20,
    height: 20
  }
});

module.exports = styles;