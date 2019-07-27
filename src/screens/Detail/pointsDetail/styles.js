'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container:{
		flex: 1
	},
	titleContainer: {
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontSize: 17,
		fontWeight: 'bold'
	},
	rowContainer: {
		height: 80,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	titleData: {
		fontSize: 16,
		fontWeight: '700',
		color: '#39373D',
		marginLeft: 15,
		flex: 2
	},
	image:{
		height: 35,
		width: 35,
		overflow: 'visible',
		marginLeft: 15,
	},
  	showContent: {
  		justifyContent: 'flex-end',
  		width: 50
  	},
  	separatorLine: {
  		backgroundColor: '#b8b9ba',
  		height: 1
  	}
});

module.exports = styles;