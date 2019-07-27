'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import MainMap from './mainmap';
import MyControlPanel from '../ControlPanel/ControlPanel';
import ModalDelete from '../../components/common/ModalDelete/modalDelete';

import Drawer from 'react-native-drawer';

const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

export default class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'displace',
      openDrawerOffset:100,
      closedDrawerOffset:0,
      panOpenMask: 1,
      panCloseMask: 0,
      relativeDrag: false,
      panThreshold: 1,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: false,
      tapToClose: true,
      negotiatePan: false,
      rightSide: false,
      refreshing: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
  	if (nextProps.refreshAnnotations) {
  		this.mainMap._getPoints();
  	}
  }

  setDrawerType(type){
    this.setState({
      drawerType: type
    })
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer(){
	this.drawer.open();
  }

  close() {
  	this.warning.modalBehavior();
  }

  _logoutUser() {
  	global.auth_token = null;
  	AsyncStorage.removeItem('auth_token');
  	this.close();
  	this.forceUpdate();
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

	render() {
	    var controlPanel = <MyControlPanel  close={() => this.close()}/>
	    return (
	    	<View style={{flex:1}}>
		      <Drawer
		        ref={c => this.drawer = c}
		        type={this.state.drawerType}
		        animation={this.state.animation}
		        openDrawerOffset={this.state.openDrawerOffset}
		        closedDrawerOffset={this.state.closedDrawerOffset}
		        panOpenMask={this.state.panOpenMask}
		        panCloseMask={this.state.panCloseMask}
		        relativeDrag={this.state.relativeDrag}
		        panThreshold={this.state.panThreshold}
		        content={controlPanel}
		        styles={drawerStyles}
		        disabled={this.state.disabled}
		        tweenHandler={this.tweenHandler.bind(this)}
		        tweenDuration={this.state.tweenDuration}
		        tweenEasing={this.state.tweenEasing}
		        acceptDoubleTap={this.state.acceptDoubleTap}
		        acceptTap={this.state.acceptTap}
		        acceptPan={this.state.acceptPan}
		        tapToClose={this.state.tapToClose}
		        negotiatePan={this.state.negotiatePan}
		        changeVal={this.state.changeVal}
		        side={this.state.rightSide ? 'right' : 'left'}
		        >
		        <MainMap
		          ref={(map) => { this.mainMap = map; }}
		          drawerType={this.state.drawerType}
		          setParentState={this.setStateFrag.bind(this)}
		          openDrawer={this.openDrawer.bind(this)}
		          openDrawerOffset={this.state.openDrawerOffset}
		          closedDrawerOffset={this.state.closedDrawerOffset}
		          panOpenMask={this.state.panOpenMask}
		          panCloseMask={this.state.panCloseMask}
		          relativeDrag= {this.state.relativeDrag}
		          panStartCompensation= {this.state.panStartCompensation}
		          tweenHandlerOn={this.state.tweenHandlerOn}
		          disabled={this.state.disabled}
		          panThreshold={this.state.panThreshold}
		          tweenEasing={this.state.tweenEasing}
		          tweenHandlerPreset={this.state.tweenHandlerPreset}
		          animation={this.state.animation}
		          noopChange={this.noopChange.bind(this)}
		          acceptTap={this.state.acceptTap}
		          acceptDoubleTap={this.state.acceptDoubleTap}
		          acceptPan={this.state.acceptPan}
		          tapToClose={this.state.tapToClose}
		          negotiatePan={this.state.negotiatePan}
		          rightSide={this.state.rightSide}
		          center={this.state.center}
		        />
		    </Drawer>
		    <ModalDelete ref={(warning) => { this.warning = warning; }}  icon="alert" title="Cerrar Sesión" background="#FD6B6B" text='¿Quieres cerrar sesión?' action={() => this._logoutUser()}/>
		</View>
	    );
	}
}