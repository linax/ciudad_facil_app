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
    height: height * 0.825,
    position: 'relative',
    paddingLeft: 20,
    paddingRight: 20
  },
  containerTitle: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#808080'
  },
  formGroup: {
    marginTop: 20,
  },
  textForm: {
    fontWeight: '600',
    fontSize: 16,
    color: '#808080',
    width: width*0.4,
  },
  textForm2: {
    fontSize: 15,
    color:'#808080',
    marginRight: 20
  },
  contentInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  inputForm: {
    height: 40
  },
  inputDropdown: {
    width: width*0.5
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
  textDropdown: {
    fontSize: 14,
    color: '#808080'
  },
  dropdown: {
    width: width * 0.5,
    height: height * 0.18
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
  mapView: {
    marginRight: 10,
    marginLeft: 10,
    height: height*0.3,
    borderColor: '#000000',
    borderWidth: 2
  },
  map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
  },
  viewForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    width: width*0.9,
  },
  titleLabel: {
    width: width*0.7,
    fontSize: 16,
    justifyContent: 'center'
  },
  formContainer: {
    width: width * 0.2,
    marginRight: width * 0.1
  },
  alternatives: {
    alignItems: 'flex-end',
    paddingRight: 10,
    width: width * 0.9
  },
  containerConfirmation: {
    borderColor: '#FFFFFF',
    borderWidth: 4,
    width: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 2
  },
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
    width: width*0.4,
    borderRadius: 10,
    textAlign: 'center'
  }
});

module.exports = styles;