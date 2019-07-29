'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		height: height * 0.9
	},
	contentContainer: {
		//marginTop: 10,
		//marginLeft: width * 0.1,
		//marginRight: width * 0.1,
		//marginBottom: 10,
		padding: 20
	},
	/*commentContainer: {
		/*marginLeft: width * 0.1,
		marginRight: width * 0.1,
		padding: 20
	},*/
	/*image: {
		width: width * 0.8,
		height: height * 0.2,
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	/*md1: {
		width: width*0.45,
		height: height*0.2
	},
	md2: {
		width: width*0.35,
	},*/
	buttonContainer: {
		marginLeft: width * 0.1,
		marginTop: 10,
		marginRight: width * 0.1,
		flexDirection: 'row',
	},
	buttonActivity: {
		width: width * 0.25,
		height: height * 0.05,
		backgroundColor: '#3CC882',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonShow: {
		width: width * 0.4,
		height: height * 0.0625,
		backgroundColor: '#3CC882',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		margin: 10
	}
});

module.exports = styles;
