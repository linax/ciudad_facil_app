import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';
import MenuItem from '../../components/common/menuItem/menuItem';
import userDefaults from '../../userDefaults.js';
import styles from './styles';

export default class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isUserLoggedIn: (global.auth_token != null)
    }
  }

  _logout(){
    this.props.close();
  }

  componentWillUpdate() {
    if(this.state.isUserLoggedIn && global.auth_token == null || !this.state.isUserLoggedIn && global.auth_token != null) {
      this.setState({
        isUserLoggedIn: (global.auth_token != null)
      })
    }
  }

  render() {
    if (this.state.isUserLoggedIn) {
      return (
        <View style={styles.container}>
              <View style={styles.ImageContainer}>
                <Image source={require('../../images/logo-cf.png')} style={styles.headerImage}></Image>
              </View>
              <MenuItem icon="user" title='Perfil de usuario' action={() => Actions.Profile()}/>
              <MenuItem icon="magnifying-glass" title='Buscar lugares' action={() => Actions.Search()}/>
              <MenuItem icon="cog" title='Configuración' action={() => Actions.Configure()}/>
              <MenuItem icon="help" title='Ayuda' action={() => Actions.Help()}/>
              <MenuItem icon="log-out" title='Cerrar sesión' action={() => this._logout()}/>
              <View style={{position: 'absolute', bottom: 0}}>
                <MenuItem icon="lock" title='Privacidad' action={() => Actions.Privacy()}/>
                <MenuItem icon="info-with-circle" title='Acerca de' action={() => Actions.About()}/>
              </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
              <View style={styles.ImageContainer}>
                <Image source={require('../../images/logo-cf.png')} style={styles.headerImage}></Image>
              </View>
              <MenuItem icon="login" title='Iniciar Sesión' action={() => Actions.Login()} style={{backgroundColor:'#FFFFFF'}}/>
              <MenuItem icon="magnifying-glass" title='Buscar Lugares' action={() => Actions.Search()}/>
              <MenuItem icon="cog" title='Configuración' action={() => Actions.Configure()}/>
              <MenuItem icon="help" title='Ayuda' action={() => Actions.Help()}/>
              <View style={{position: 'absolute', bottom: 0}}>
                <MenuItem icon="lock" title='Privacidad' action={() => Actions.Privacy()}/>
                <MenuItem icon="info-with-circle" title='Acerca de' action={() => Actions.About()}/>
              </View>
        </View>
      );
    }
  }
}
