'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#696969',
    height: height * 0.08,
    justifyContent: 'center',
    paddingLeft: height * 0.025,
    width: width * 0.725
  },
  button: {
    backgroundColor: '#696969',
  }
});

module.exports = styles;