'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var stylesCAT = StyleSheet.create({
  formGroup3: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  picker: {
    fontSize: 14,
    color:'#505050',
    //marginTop: 5,
    //backgroundColor: '#fff',
    //marginLeft: 0,
    height: 30,
    borderColor: '#505050',
    borderWidth: 1,
    width: width * 0.34,
    borderRadius: 5,
    textAlign: 'center',
  },
  textForm: {
    width: width * 0.3
  },
  modalRewrite: {
    width: width * 0.7
  }
});

module.exports = stylesCAT;
