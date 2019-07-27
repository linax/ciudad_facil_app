'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerInput: {
		height: height*0.25,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerTextInput: {
		borderColor: '#C6CCD2',
		borderWidth: 2,
		width: width * 0.8,
		height: 40,
		backgroundColor: '#CDD3D6',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 10,
		paddingLeft: 10,
		alignItems: 'center'
	},
	input: {
		width: width * 0.675,
		height: 40,
	},
	rowContainer: {
		flexDirection: 'row',
		height: 70,
		padding: 30,
		// alignItems: 'center',
		justifyContent: 'space-between'
	},
	titleData: {
		fontSize: 16,
		fontWeight: '700',
		color: '#39373D',
		paddingLeft: 10
	},
	image:{
		height: 40,
		width: 40,
		overflow: 'visible',
		resizeMode: 'contain'
	},
	add: {
	    height: height * 0.06,
	    backgroundColor: '#3CC882',
	    justifyContent: 'center',
	    alignItems: 'center',
	    padding: 10,
	    margin:10
  	},
  	textDistance: {
    	fontWeight: 'bold',
    	color: '#FFFFFF'
  	},
  	showContent: {
  		//height: 70,
  		width: 30,
  		justifyContent: 'center',
  		alignItems: 'flex-end',
  	},
  	separatorLine: {
  		backgroundColor: '#b8b9ba',
  		height: 1
  	}
});

module.exports = styles;