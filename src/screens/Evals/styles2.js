'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles2 = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		alignItems: 'center'
	},
	image: {
		width: width * 0.4,
		height: height* 0.2,
		marginTop: 20,
		marginBottom: 10
	},
	evals: {
		marginTop: 20,
		width: 0.8 * width,
		marginLeft: 0.1 * width
	},
	text: {
		marginBottom: 10,
		textAlign: 'justify'
	}
});

module.exports = styles2;