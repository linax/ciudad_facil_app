'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  modalContainer: {
    width: width * 0.7,
    marginLeft: width * 0.15,
    padding: 0,
    backgroundColor: '#FFFFFF'
  },
  backgroundTitle: {
    height: height * 0.09,
    justifyContent:'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  containerSelection: {
    marginTop:20,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    paddingLeft: width * 0.15
  },
  accept: {
    height: height * 0.06,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#999999',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  }
});

module.exports = styles;