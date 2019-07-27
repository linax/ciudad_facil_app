'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginTop: 30,
    alignItems: 'center',
    height: height * 0.825,
    position: 'relative'
  },
  formGroup: {
    width: width * 0.8,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  textForm: {
    color: '#979797',
    fontWeight: '700',
    width: width * 0.6
  },
  inputForm: {
    color: '#979797',
    height: 34,
    width: width * 0.1,
    paddingLeft: 5,
    textAlign: 'right'
  },
  textArea: {
    color: '#979797',
    width: width * 0.8,
    height: height * 0.1,
    padding: 5
  },
  addPhoto: {
    height: height * 0.0725,
    width: width * 0.6,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#3CC882',
    borderRadius: 10,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addParking: {
    height: height * 0.0725,
    width: width * 0.8,
    marginTop: 10,
    backgroundColor: '#3CC882',
    justifyContent: 'center',
    alignItems: 'center'
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