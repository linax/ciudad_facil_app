'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity } from 'react-native';

import styles from './styles.js';
import commonStyles from '../../../screens/commonStyles.js';

export default class NavigationBarDetail extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={[styles.viewChild, this.props.selected2 ? styles.selectedView : styles.unselectedView]}><TouchableOpacity onPress={this.props.actionSecond}><Text style={[commonStyles.text, this.props.selected2 ? {color: '#3CC882'} : {color: '#505050'}]}>Accesibilidad</Text></TouchableOpacity></View>
        <View style={[styles.viewChild, this.props.selected1 ? styles.selectedView : styles.unselectedView]}><TouchableOpacity onPress={this.props.actionFirst}><Text style={[commonStyles.text, this.props.selected1 ? {color: '#3CC882'} : {color: '#505050'}]}>Detalle</Text></TouchableOpacity></View>
      </View>
    );
  }
};
