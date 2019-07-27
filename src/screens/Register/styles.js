'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	containerForm: {
		flex: 1,
		alignItems: 'center',
		marginTop: 10
	},
	formGroup: {
		paddingTop: 5,
		paddingBottom: 5,
		width: width * 0.8
	},
	textTitle: {
		color: 'black',
		fontSize: 16,
		marginBottom: 5
	},
	dataInput: {
		borderColor: '#979797',
		borderWidth: 2,
		color: '#979797',
		height: 40,
		padding:5
	},
	separator: {
		height: 1,
		width: width * 0.8,
		marginBottom: 10,
		marginTop: 10,
		backgroundColor: '#979797'
	},
	button: {
		height: 40,
		width: width * 0.8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 20
	},
	text: {
		fontWeight: 'bold'
	},
	error: {
		color: 'red',
		fontWeight: 'bold'
	},
	modal: {
		borderWidth: 2,
		borderColor: '#979797',
		marginBottom: 10,
		marginTop: 10,
		padding: 5,
		height: 35
	},
	dropdown: {
		width: width * 0.6,
	    borderColor: 'black',
	    borderWidth: 1
	},
  picker: {
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 15,
    color:'#808080',
    marginTop: 10,
    backgroundColor: '#fff',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    width: width*0.8,
    textAlign: 'center'
  }
});

module.exports = styles;