import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';

class SpinnerCustom extends Component {
	render() {
		return (
			<Spinner visible={this.props.visible} textContent={"Cargando..."} textStyle={{color: '#FFF'}} overlayColor="rgba(0, 0, 0, 0.60)"/>
		)
	}
}

export default SpinnerCustom