'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Image, Button } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';

export default class Modal extends Component  {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			text: ''
		}
	}

	render() {
	  return (
		<Modal
		    open={this.state.open}
		    modalDidClose={() => this.setState({openAdd: false})}
		    modalStyle={styles.modalStyle}
		    >
		    <View style={styles.textContainer}>
		     <Text style={styles.text}>{props.text}</Text>
		    </View>

		    <View>
		    	<TouchableHighlight style={styles.add} onPress={() => this.setState({open:false})}>
		            <Text style={styles.textMoreInfo}>Aceptar</Text>
		        </TouchableHighlight>
		    </View>
	    </Modal>
	  );
	}
};
