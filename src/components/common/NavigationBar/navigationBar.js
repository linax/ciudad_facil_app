'use strict';

import React, { Component } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity } from 'react-native';

import styles from './styles.js';

export default class NavigationBar extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        { !this.props.isEditingEvaluation && <View style={[styles.viewChild, this.props.selected1 ? styles.selectedView : styles.unselectedView]}><TouchableOpacity disabled={this.props.disable1} onPress={this.props.actionFirst}><Text style={[styles.textTitle, this.props.selected1 ? {color: '#3CC882'} : {color: '#808080'}]}>Descripción</Text></TouchableOpacity></View>}
        <View style={[this.props.isEditingEvaluation ? styles.viewChild2 : styles.viewChild, this.props.selected2 ? styles.selectedView : styles.unselectedView]}><TouchableOpacity disabled={this.props.disable2} onPress={this.props.actionSecond}><Text style={[styles.textTitle, this.props.selected2 ? {color: '#3CC882'} : {color: '#808080'}]}>Accesibilidad</Text></TouchableOpacity></View>
        <View style={[this.props.isEditingEvaluation ? styles.viewChild2 : styles.viewChild, this.props.selected3 ? styles.selectedView : styles.unselectedView]}><TouchableOpacity disabled={this.props.disable3} onPress={this.props.actionLast}><Text style={[styles.textTitle, this.props.selected3 ? {color: '#3CC882'} : {color: '#808080'}]}>Imagen</Text></TouchableOpacity></View>
      </View>
    );
  }
};
