'use strict';

import React, { Component } from 'react';
import { WebView, AsyncStorage, View, Platform, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SpinnerCustom from '../../components/common/Spinner/spinner';
import ModalDisability from '../../components/common/ModalDisability/modalDisability';
import API from '../../API/ApiComm';

import Header from '../../components/common/Header/header';
import AsyncStorageHelper from '../../components/common/Helpers/AsyncStorageHelper';

// var authUrl = this.props.url;

  const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
    window.postMessage(
                  document.getElementsByTagName('PRE')[0].innerHTML
                  )
})})();`

class Web extends Component {

  constructor(props) {

    super(props);
    this.state = {
      callback: false,
      authUrl: this.props.url,
      visible: false,
      userName: ""
    }
    global.disabilityValue = 5
  }

  _onMessage = ( event ) => {
      this.setState({ visible: true });
      var response = event.nativeEvent.data;
      console.log(response);
      if (response != '') {
        response = JSON.parse(response);
        if (response.token != null && response.token != null) {
          try {
            AsyncStorage.setItem('auth_token', response.token);
            AsyncStorage.setItem('created_user', (response.created).toString());
            global.auth_token = response.token;
          } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
          }

          this.setState({ visible: false, userName: response.name });
          if (!response.created) {
            this.disabilityModal.modalBehavior();
          }
          else {
            Actions.pop({popNum: 2, refresh: {prop: "value"}})
          }
        }
        else {
          this.setState({ visible: false });
        }
      }
      else {
        this.setState({ visible: false });
      }
  }

  _updateDisability(disabilityValue) {
    var disability, disability_type;
    if (global.disabilityValue == 5) {
      disability = false
      disability_type = 0
    }
    else {
      disability = true
      disability_type = global.disabilityValue
    }

    var data = {
        usu_dsc: disability,
        usu_tpo_dsc: disability_type,
        usu_nmb: this.state.userName
      }

      AsyncStorageHelper.setName(this.state.userName)
      global.names = this.state.userName

      this.setState({ visible: true });
      API.updateUser(data).then(json => {
        this.setState({ visible: false });
        Actions.pop({popNum: 2, refresh: {prop: "value"}});
      }).catch(error => {
        console.log("Error", error)
        this.setState({ visible: false });
        // MAnejo de error
        Actions.pop({popNum: 2, refresh: {prop: "value"}});
      });
  }

  render() {
    var jsCode = patchPostMessageJsCode;
    if(Platform.OS === 'android') {
      jsCode = "window.__REACT_WEB_VIEW_BRIDGE.postMessage(document.getElementsByTagName('PRE')[0].innerHTML)";
    }
    return (
        <View style={{flex: 1}}>
          <SpinnerCustom visible={this.state.visible} />
          <Header title='Login con red social' />
          <WebView
            source={{ uri: this.state.authUrl }}
            onMessage={this._onMessage}
            injectedJavaScript={jsCode}
            startInLoadingState={true}
            javaScriptEnabled={true}
           />
          <ModalDisability ref={(disabilityModal) => { this.disabilityModal = disabilityModal; }}  icon="help-circle" updateDisability={(disabilityValue) => this._updateDisability(disabilityValue)} title="Tienes alguna discapacidad?" background="#3CC882"/>
        </View>
    );
  }
}

export default Web;