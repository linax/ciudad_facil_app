'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	simbology: {
		padding: width*0.05
	},
	addInfo: {
		padding:width*0.05
	},
	editInfo: {
		padding: width*0.05
	},
	title: {
		fontSize: 20,
		marginBottom: 10
	},
	content: {
		fontSize: 16,
		textAlign: 'justify'
	},
	firstRowIcons: {
		height: 70,
		width: width*0.9,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20
	},
	icon: {
		width: 60,
		height: 60,
		overflow:'visible'
	},
	add: {
	    height: height * 0.06,
	    marginTop: 10,
	    backgroundColor: '#3CC882',
	    justifyContent: 'center',
	    alignItems: 'center',
	    margin:10
  },
  textMoreInfo: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
	modalStyle: {
		width: width * 0.7,
		marginLeft: width * 0.15,
		padding: 0,
		backgroundColor: '#FFFFFF'
	},
	textContainer: {
		backgroundColor: '#FFFFFF',
		height: height * 0.09,
		justifyContent:'center',
		padding:10
	},
	text: {
		fontSize: 17,
		fontWeight: '500',
		color: '#7C7C7C',
		textAlign: 'center'
	}
});

module.exports = styles;
