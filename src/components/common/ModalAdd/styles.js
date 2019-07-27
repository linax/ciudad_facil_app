'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  add: {
    height: height * 0.06,
    marginTop: 10,
    backgroundColor: '#3CC882',
    justifyContent: 'center',
    alignItems: 'center',
    margin:10
  },
  textMoreInfo: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  modalContainer: {
  	width: width * 0.7, 
  	marginLeft: width * 0.15, 
  	padding: 0, 
  	backgroundColor: '#FFFFFF'
  },
  backgroundTitle: {
  	backgroundColor: '#D8D8D8',
  	height: height * 0.09,
  	justifyContent:'center',
  	paddingLeft: 10,
  	paddingRight: 10
  },
  title: {
  	fontSize: 17,
  	fontWeight: 'bold',
  	color: '#7F7C7C'
  },
  containerSelection: {
  	marginTop:20,
  	marginBottom: 10,
  	backgroundColor: '#FFFFFF',
  	paddingLeft: width * 0.15
  }
});

module.exports = styles;