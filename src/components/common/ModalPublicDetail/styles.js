'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  modalStyle: {
    width: width * 0.65,
    marginLeft: width * 0.1725,
    padding: 20
  },
  headerModal: {
    alignItems: 'center'
  },
  contentModal: {
    marginTop: 20,
    alignItems: 'center'
  },
  moreInfo: {
    height: height * 0.06,
    marginTop: 10,
    backgroundColor: '#3CC882',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.6
  },
  textMoreInfo: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  textDescription: {
    alignSelf: 'flex-start',
  	color: '#000000',
  	fontWeight:'bold',
  	fontSize: 16,
  	marginBottom: 5
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 5,
    overflow: 'visible'
  }
});

module.exports = styles;