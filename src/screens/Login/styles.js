'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const BOTTOM_VIEW_HEIGHT = (Platform.OS === 'ios') ? 50 : 70

var styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#3CC882',
		flex: 1,
		width: width,
		height: height
	},
	containerLogo: {
		height: height/4,
		justifyContent: 'center',
		alignItems: 'center',
		width: width
	},
	containerClose: {
		width: width,
		height: 50,
		paddingLeft: 10,
		marginTop: 40
	},
	containerLogin: {
		marginTop: 10,
		height: height/3
	},
	containerSocial: {
		height: height/3,
		alignItems: 'center',
		width: width
	},
	containerInput: {
		borderColor: '#FFFFFF',
		borderRadius: 5,
		borderWidth: 1,
		height: height * 0.08,
		marginBottom: 10,
		paddingLeft: 15,
		paddingRight: 15,
		width: width * 0.7
	},
	dataInput: {
		color: '#FFFFFF',
		height: height*0.08,
		width: width * 0.525
	},
	icon: {
		height: 25,
		width: 25,
		position: 'absolute',
		right: 15,
		top: 10
	},
	buttonLogin: {
		borderColor: '#FFFFFF',
		borderWidth: 4,
		height: height * 0.08,
		justifyContent: 'center',
		marginTop: 10,
		width: width * 0.7
	},
	facebook: {
		backgroundColor: '#3B5998',
		height: height * 0.08,
		justifyContent: 'center',
		width: width * 0.7
	},
	twitter: {
		backgroundColor: '#00AEF2',
		height: height * 0.08,
		justifyContent: 'center',
		marginBottom: 10,
		marginTop: 10,
		width: width * 0.7
	},
	textLogin: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 16,
		textAlign: 'center'
	},
	textLogin2: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 14,
		textAlign: 'center'
	},
	modal: {
		width: width * 0.7,
		height: height * 0.3,
		borderWidth: 2,
		borderColor: '#000000',
		alignItems: 'center'
	},
	titleModal: {
		backgroundColor: '#3CC882',
		height: 60,
		alignItems: 'center'
	},
	contentModal: {
		height: 100,
		backgroundColor: '#FFFFFF',
		marginTop: 20,
		justifyContent: 'center'
	},
	dropdown: {
		width: width * 0.6,
	    borderColor: 'black',
	    borderWidth: 1
	},
	modal2: {
		borderWidth: 2,
		borderColor: '#979797',
		marginBottom: 10,
		marginTop: 10,
		padding: 5,
		height: 35
	},
	registerContainer: {
		height: BOTTOM_VIEW_HEIGHT,
		width: width,
		position: 'absolute',
		bottom: 0
	},
	register: {
		color: '#FFFFFF',
		height: 40,
		alignSelf: 'center'
	},
});

module.exports = styles;