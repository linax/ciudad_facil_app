'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	contentContainer: {
		alignItems: 'center',
		marginTop: 10,
	    height: height * 0.825
	},
	header: {
		flexDirection: 'row'
	},
	avatar: {
		width: 80,
		height: 80
	},
	titleName: {
		fontWeight: 'bold',
		color: '#606060',
		fontSize: 18,
		marginTop: 30,
		marginLeft: 20
	},
	showZoom: {
		marginLeft: 30,
		marginRight: 30,
		marginTop: height*0.1,
		marginBottom: 5,
		flexDirection: 'row'
	},
	actualization: {
		marginLeft: 30,
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	containerButton: {
	    height: height * 0.0725,
	    width: width * 0.8,
	    marginTop: 10,
	    backgroundColor: '#3CC882',
	    justifyContent: 'center',
	    alignItems: 'center',
	    position: 'absolute',
	    bottom: 0,
	    left: width * 0.1
	},
	textConfig: {
		fontWeight: '500',
		fontSize: 15,
		color: '#7F7F7F',
		width: width * 0.6
	},
  	text: {
    	color: '#FFFFFF',
    	fontWeight: 'bold'
  	},
  	modal : {
  		marginTop: 10,
  		marginBottom: 10,
  		width: 50,
  		height: 30,
		borderColor: '#7F7F7F',
		borderWidth: 2,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
  	},
  	dropdown: {
  	},
  	picker: {
  		marginRight: 20,
    	paddingTop: 0,
    	paddingBottom: 0,
    	fontSize: 15,
    	color:'#808080',
    	marginTop: 5,
    	backgroundColor: '#fff',
    	marginLeft: 20,
    	height: 30,
    	borderColor: 'gray',
    	borderWidth: 1,
    	width: 70,
    	borderRadius: 10,
    	textAlign: 'center',
  }
});

module.exports = styles;