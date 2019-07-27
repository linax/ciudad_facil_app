'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	imageContainer: {
		height: height * 0.2,
		flexDirection: 'row',
		marginTop: 20,
		justifyContent: 'space-around',
		marginBottom: 20
	},
	image1: {
		width: 150
	},
	image2:{
		width: 40
	}
});

module.exports = styles;