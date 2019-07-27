'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height*0.12
  },
  headerImage: {
    height: 60,
    width: 120
  }
});

module.exports = styles;