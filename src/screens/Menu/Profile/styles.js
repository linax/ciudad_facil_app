'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    alignItems: 'center',
    marginTop: 20
  },
  avatar: {
    width: 130,
    height: 130,
    marginBottom: 10
  },
  editProfile: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#3CC882',
    padding: 10,
    width: 160,
    alignItems: 'center'
  },
  textEdit: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  title: {
    marginTop: 10,
    marginBottom: 20
  },
  changePhoto: {
    position: 'absolute',
    bottom: 0,
    width: 130,
    backgroundColor: '#4D4D4C',
    alignItems: 'center'
  }
});

module.exports = styles;