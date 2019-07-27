'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
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
		color: '#7F7C7C',
		textAlign: 'center'
	}
});

module.exports = styles;