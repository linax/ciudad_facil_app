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
		width: width * 0.4,
		marginLeft: width * 0.3,
		justifyContent: 'center'
	},
	touchableVotes: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	comments: {
		marginTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 20
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
  }
});

module.exports = styles;
