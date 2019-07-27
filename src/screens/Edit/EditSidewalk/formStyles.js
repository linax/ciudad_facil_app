'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  formContainer: {
    width: width * 0.9,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
    width: 0.65 * width,
  },
  inputContainer: {
    width: width * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

});

module.exports = styles;