'use strict';

import { AsyncStorage } from 'react-native';

async function setValue(item, selectedValue) {
	    try {
	      await AsyncStorage.setItem(item, selectedValue);
	    } catch (error) {
	      console.log('AsyncStorage error: ' + error.message);
	    }
	}

async function setName(name) {
	try {
	      await AsyncStorage.setItem('names', name);
	    } catch (error) {
	      console.log('AsyncStorage error: ' + error.message);
	    }
}

async function setUsername(username) {
	try {
	      await AsyncStorage.setItem('user_name', username);
	    } catch (error) {
	      console.log('AsyncStorage error: ' + error.message);
	    }
}

module.exports = {
  setValue,
  setName,
  setUsername
}