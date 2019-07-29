'use strict';

import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		width: width * 0.8,
		marginLeft: width * 0.1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	votes: {
		flexDirection: 'row',
		alignItems: 'center',
		width: width*0.4,
		marginLeft: width*0.3,
		justifyContent: 'center'
	},
	touchableVotes: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	comments: {
		marginTop: 10
	},
	CommentArea: {
		marginTop: 40
	},
	  textArea: {
	    color: '#979797',
	    width: width * 0.9,
	    height: height * 0.15,
	    padding: 5,
	    textAlignVertical: 'top'
	  },
  	add: {
    	height: height * 0.06,
    	marginTop: 10,
		backgroundColor: '#3CC882',
    	justifyContent: 'center',
    	alignItems: 'center',
    	margin:10
  	},
	buttonShow: {
		width: width * 0.5,
		height: height* 0.06,
		backgroundColor: '#3CC882',
		alignItems: 'center',
		justifyContent: 'center'
	},
	containerButton: {
		width: 0.8 * width,
		height: 50,
		alignItems: 'center',
		marginLeft: 0.1 * width
	},
  	separator: {
    	flex: 1,
    	height: StyleSheet.hairlineWidth,
    	backgroundColor: '#8E8E8E'
  	},
  	containerEval: {
  		marginLeft: 20,
  		marginRight: 20,
  		justifyContent: 'space-between',
  		flexDirection: 'row',
  	},
  	dataContainer: {
  		paddingTop: 10
  	},
  	showContent: {
  		width: 40,
  		justifyContent: 'center',
  		alignItems: 'flex-end',
  	},
  	containerComment: {
  		width: 0.8 * width,
  	},
  	separatorLine: {
  		backgroundColor: '#b8b9ba',
  		height: 1
  	}
});

module.exports = styles;
