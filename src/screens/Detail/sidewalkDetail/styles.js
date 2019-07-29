'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		height: height *0.9
	},
	contentContainer: {
		marginTop: 20,
		marginLeft: width*0.1,
		marginRight: width*0.1,
		flexDirection: 'row',
		marginBottom: 10
	},
	commentContainer: {
		marginLeft: width*0.1,
		marginRight: width*0.1,
	},
	image: {
		width: width * 0.3,
		height: height* 0.2
	},
	md1: {
		width: width*0.45,
		height: height*0.25
	},
	md2: {
		width: width*0.35,
		height: height*0.25
	},
	buttonContainer: {
		marginLeft: width*0.1,
		marginRight: width*0.1,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	buttonActivity: {
		width: width*0.25,
		height: height*0.05,
		padding: 5,
		backgroundColor: '#3CC882',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textButton: {
		color: '#FFF',
		fontWeight: 'bold'
	},
	/*buttonShow: {
		width: width * 0.68,
		height: height* 0.0725,
		backgroundColor: '#3CC882',
		alignItems: 'center',
		padding: 5,
		justifyContent: 'center'
	},*/
	mapView: {
    	width: width*0.8,
    	height: height*0.3,
    	borderColor: '#000000',
    	borderWidth: 2,
    	marginLeft: width*0.1,
    	marginTop: 10,
    	marginBottom: 20
  	},
  	map: {
      	position: 'absolute',
      	top: 0,
      	left: 0,
      	right: 0,
      	bottom: 0
  	},
});

module.exports = styles;
