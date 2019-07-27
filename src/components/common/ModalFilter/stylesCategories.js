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
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 15,
    color:'#808080',
    marginTop: 5,
    backgroundColor: '#fff',
    marginLeft: 20,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    width: width*0.35,
    borderRadius: 10,
    textAlign: 'center',
  },
  textForm: {
    fontWeight: '600',
    fontSize: 15,
    color: '#808080',
    width: width*0.25
  },
  modalRewrite: {
    width: width * 0.7
  }
});

module.exports = stylesCAT;