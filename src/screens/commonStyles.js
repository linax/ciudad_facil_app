'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var commonStyles = StyleSheet.create({
    text: {
      color: '#505050',
      marginBottom: 5,
      fontSize: 16
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16
    },
    buttonContainer: {
        flex: 1
    },
    image: {
  		width: width * 0.8,
  		height: height * 0.2,
  		alignSelf: 'center',
  		marginTop: 10,
  		marginBottom: 10
  	},
    contentContainer: {
  		padding: 20
  	},
    modalContainer: {
  		padding: 5,
      paddingTop: 10
  	},
    buttonShow: {
  		width: width * 0.4,
  		height: height * 0.0625,
  		backgroundColor: '#3CC882',
  		alignItems: 'center',
  		justifyContent: 'center',
  		padding: 5,
  		margin: 10
  	},
    whiteButton: {
      height: height * 0.06,
      marginTop: 10,
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: '#505050',
      justifyContent: 'center',
      alignItems: 'center',
      margin:10
    }
});

module.exports = commonStyles;
