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
    marginTop: 20,
    height: height * 0.825,
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#808080'
  },
  formGroup: {
    marginTop: 20,
  },
  formGroup2: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textForm: {
    fontSize: 16,
    color: '#808080',
    width: width*0.4,
  },
  contentInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
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
    width: width*0.4,
    borderRadius: 10,
    textAlign: 'center'
  },
  inputForm: {
    height: 45
  },
  radioForm: {
    width: width* 0.9,
  },
  radioContainer: {
    alignItems: 'flex-start',
    marginTop: 10
  },
  labelFormat: {
    fontSize: 14,
  },
  labelContainer: {
    width: width* 0.8,
    paddingLeft: 10
  },
  addPhoto: {
    height: height * 0.0725,
    width: width * 0.6,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#3CC882',
    borderRadius: 10,
    borderWidth: 4,
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBuild: {
    height: height * 0.0725,
    width: width * 0.8,
    marginTop: 10,
    backgroundColor: '#3CC882',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: width * 0.1
  },
  modal: {
    height: height * 0.07,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF'
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
  },
  error: {
    color: 'red',
    fontWeight: 'bold'
  }
});

module.exports = styles;