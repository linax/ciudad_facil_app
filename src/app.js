import React, { Component } from 'react';
import { View, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen'


import AppNavigator from './components/appNavigator';
import config from './userDefaults';

class App extends Component {

	constructor() {
		super();
		this.state = { isLoaded: false };
	}

	async _onValueChange(item, selectedValue) {
	    try {
	      await AsyncStorage.setItem(item, selectedValue);
	    } catch (error) {
	      console.log('AsyncStorage error: ' + error.message);
	    }
	}

	componentDidMount() {
		SplashScreen.hide();
		global.setMap = true;
		global.setReload = 0;
	    AsyncStorage.getItem('auth_token').then((token) => {
	    	global.auth_token = token;
	      	this.setState({ isLoaded: true });
	    });
	    AsyncStorage.getItem('first_time').then((keyValue) => {
	    	if (keyValue == null) {
	    		this._onValueChange('visibility_map', 'false');
	    		global.visibilityMap = false;
	    		this._onValueChange('time_reload', '600000');
	    		global.reload = 600000;
	    		this._onValueChange('button_size', '45');
	    		// global.buttonSize = 45;
	    		this._onValueChange('first_time', 'bla');
	    	} else {
				// AsyncStorage.getItem('button_size').then((keyValue) => { global.buttonSize = parseInt(keyValue) });
				AsyncStorage.getItem('time_reload').then((keyValue) => { global.reload = Number(keyValue) });
				AsyncStorage.getItem('visibility_map').then((keyValue) => { global.visibilityMap =  (keyValue === 'true') });
				AsyncStorage.getItem('app_version').then((keyValue) => { global.appVersion =  Number(keyValue) });
				AsyncStorage.getItem('user_name').then((keyValue) => { global.user_name = keyValue } );
				AsyncStorage.getItem('names').then((keyValue) => { global.names = keyValue } );
			}
	    });
	}

	render() {
		if (!this.state.isLoaded) {
			return (
				<View style={styles.container}>
					<ActivityIndicator style={styles.activityIndicator}/>
				</View>

			)
		} else {
			return (
	        	<AppNavigator />
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
		backgroundColor: '#383838'
	},
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});

export default App;