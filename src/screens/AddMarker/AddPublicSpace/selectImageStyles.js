'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var SIStyles = StyleSheet.create({
  container: {
    marginTop: height * 0.05,
    alignItems: 'center'
  },
  containerPhoto: {
    width: width * 0.6,
    height: height*0.2,
    alignItems: 'center'
  },
  image: {
    width: width * 0.4,
    height: height* 0.2
  },
  textAddImage: {
    fontWeight: 'bold',
    color: '#3CC882',
    fontSize: 16
  },
  textAdd: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 16
  },
  formGroup2: {
    width: width * 0.8,
    marginBottom: 10,
  },
  contentInput: {
    borderWidth: 1.5,
    borderColor: '#b1b2ba',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:5,
    paddingRight: 5
  },
  textArea: {
    color: '#979797',
    width: width * 0.8,
    height: height * 0.2,
    padding: 5,
    textAlignVertical: 'top'
  }
});

module.exports = SIStyles;
