'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
	    position: 'absolute',
	    top: (Platform.OS === 'ios') ? 65 : 56,
	    left: 0,
	    right: 0,
	    bottom: 0,
	    justifyContent: 'flex-end',
  	},
  	map: {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0
  	},
    zoomButtons: {
    	backgroundColor: 'rgba(255, 255, 255, 0)',
    	position:'relative',
    	bottom: 20,
    	width: 50
  	},
	geoLocation: {
	    backgroundColor: 'rgba(255, 255, 255, 0)',
	    position:'relative',
	    bottom: 20,
	    width: 50,
	    left: 10
	},
	button: {
	    borderRadius: 45,
	    backgroundColor: '#FFFFFF',
	    borderColor: '#979797',
	    borderWidth: 5,
	    alignItems: 'center',
	    justifyContent: 'center',
	    marginBottom: 20
	},
	containerNotLoaded: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
		backgroundColor: '#383838'
	},
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
   buttonContainer: {
   	height: height*0.3,
   	width: width,
   	flexDirection: 'row',
   	backgroundColor: 'rgba(255, 255, 255, 0)'
   },
   md2: {
   	width: width/4,
   	justifyContent: 'flex-end',
   	paddingBottom: 10,
   },
   box1: {
   	height: height*0.05,
   	width: 80,
   	alignItems: 'center',
    marginBottom: 30,
   	justifyContent: 'center'
   },
   box2: {
   	width: 80,
   	position: 'absolute',
   	right: 0,
   	bottom: 20,
   	height: height*0.3,
   	justifyContent: 'center',
   	alignItems: 'center'
   },
   internetBar: {
    position: 'absolute',
    top: (Platform.OS === 'ios') ? 65 : 56,
    justifyContent: 'center',
    width: width,
    backgroundColor:"#e74c3c",
    height:40
   }
});

module.exports = styles;