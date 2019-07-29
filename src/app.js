/**
 * Clase aplicación que define el comportamiento inicial de la apicación
 */

import React, { Component } from 'react';
import { 
	View, 
	AsyncStorage, 
	ActivityIndicator, 
	StyleSheet, 
	Alert, 
	Text, 
	Image, 
	ListView, 
	PermissionsAndroid
} from 'react-native';

import { 
	Router, 
	Scene, 
	ActionConst 
} from 'react-native-router-flux';

import AppIntro from 'react-native-app-intro'
import SplashScreen from 'react-native-splash-screen'
import Icon2 from 'react-native-vector-icons/FontAwesome';

import AppNavigator from './components/appNavigator';
import config from './userDefaults';

class App extends Component {

	constructor() {
		super();
		this.state = { 
			isLoaded: false
		};
	}

	async _onValueChange(item, selectedValue) {
	    try {
	      await AsyncStorage.setItem(item, selectedValue);
	    } catch (error) {
	      console.log('AsyncStorage error: ' + error.message);
	    }
	}

	componentWillMount() {
		AsyncStorage.getItem('first_time').then((keyValue) => {
	    	if (keyValue == null) {
	    		this.setState({ isLoaded: false });
	    	} else {
				//this.setState({ isLoaded: true });
			}
	    });
	}

	componentDidMount() {
		SplashScreen.hide();
		global.setMap = true;
		global.setReload = 0;
	    AsyncStorage.getItem('auth_token').then((token) => {
	    	global.auth_token = token;
	    });
	    AsyncStorage.getItem('first_time').then((keyValue) => {
	    	if (keyValue == null) {
	    		this._onValueChange('visibility_map', 'false');
	    		global.visibilityMap = false;
	    		this._onValueChange('time_reload', '600000');
	    		global.reload = 600000;
	    		this._onValueChange('button_size', '45');
	    		this._onValueChange('first_time', 'bla');
	    	} else {
				this.setState({ isLoaded: true });
				AsyncStorage.getItem('time_reload').then((keyValue) => { global.reload = Number(keyValue) });
				AsyncStorage.getItem('visibility_map').then((keyValue) => { global.visibilityMap =  (keyValue === 'true') });
				AsyncStorage.getItem('app_version').then((keyValue) => { global.appVersion =  Number(keyValue) });
				AsyncStorage.getItem('user_name').then((keyValue) => { global.user_name = keyValue } );
				AsyncStorage.getItem('names').then((keyValue) => { global.names = keyValue } );
			}
	    });
	}

	/**
	 * Funciones de carrusel apra comienzo de aplicción
	 */
	onSkipBtnHandle = (index) => {}
	nextBtnHandle = (index) => {}
	onSlideChangeHandle = (index, total) => {}
	doneBtnHandle = (index) => {
		this.setState({ isLoaded: true });
	}

	render() {
		if (this.state.isLoaded) {
			return (
				<AppNavigator /> 
			)
		} else {
			return (
		      	<AppIntro 
		      		style={styles.app_intro}
		      		onDoneBtnClick={this.doneBtnHandle}
		      		dotColor='rgba(155,155,155,0.3)'
				    activeDotColor='#131516' 
				    rightTextColor='#131516' 
				    leftTextColor='#131516'
				    skipBtnLabel=''
				    nextBtnLabel=''
				    doneBtnLabel='Listo'
	      		>
			        <View style={styles.slide} accessible={true}>
			        	<Image 
			        		style={styles.image}
			        		source={require('./images/img1.png')}
			        	/>
			          	<View level={10}>
			          		<Text style={styles.text_title}></Text>
			      		</View>
			          	<View level={15}>
			          		<Text style={styles.text}>
			          			Ciudad Fácil es una aplicación colaborativa, como usuario podrás consultar la accesibilidad de los lugares que se encuentren cerca de ti y también evaluar para compartirla con la comunidad.
			          		</Text>
			      		</View>
			        </View>
			        <View style={styles.slide}>
			        	<View style={styles.icon_view}>
			        		<Icon2 name="bars" style={styles.image} size={80}/>
			    		</View>	
			          	<View level={-10}>
			          		<Text style={styles.text_title}>Menú Principal</Text>
			      		</View>
			      		<View level={0} style={[{marginBottom: 10}]}>
							<Text style={styles.text}>
								En el menú principal podrás acceder a los siguientes items:	
							</Text>
						</View>
			          	<View style={styles.list}  level={-10}>
			          		<View style={styles.icon_view}>
			          			<Icon2 name="sign-in" style={[{marginRight: 5}]} size={25}/>
			          			<Text style={styles.text}>Texto de Login</Text>
		          			</View>
		          			<View style={styles.icon_view}>
			          			<Icon2 name="search" style={[{marginRight: 5}]} size={25}/>
			          			<Text style={styles.text}>Texto de Búsqueda</Text>
		          			</View>
		          			<View style={styles.icon_view}>
			          			<Icon2 name="cog" style={[{marginRight: 5}]} size={25}/>
			          			<Text style={styles.text}>Texto de configuración</Text>
		          			</View>
		          			<View style={styles.icon_view}>
			          			<Icon2 name="question" style={[{marginRight: 5}]} size={25}/>
			          			<Text style={styles.text}>Texto de Ayuda</Text>
		          			</View>
			          	</View>
			        </View>
			        <View style={styles.slide}>
			        	<View style={styles.icon_view}>
			        		<Icon2 name="map" style={styles.image} size={80}/>
		        		</View>	
						<View level={8}>
							<Text style={styles.text_title}>Mapa</Text>
						</View>
						<View level={0} style={[{marginBottom: 10}]}>
							<Text style={styles.text}>
								A continuación tendrás acceso al mapa de Ciudad Fácil, donde se encuentran ubicados todos los puntos evaluados por la comunidad. Estos se dividen en cuatro tipos:

							</Text>
						</View>
						<View style={styles.icon_view}>
			          		<Image 
			        			style={styles.image}
			        			source={require('./images/icons/build_green.png')}
			        		/>
			          			<Text style={styles.text}>Edificaciones (Ejemplo: restaurantes, bancos, hoteles, otros)</Text>
	          			</View>
	          			<View style={styles.icon_view}>
		          			<Image 
			        			style={styles.image}
			        			source={require('./images/icons/public_green.png')}
			        		/>
		          			<Text style={styles.text}>Espacio pùblico (plazas, parques, playas, entre otros)</Text>
	          			</View>
	          			<View style={styles.icon_view}>
		          			<Image 
			        			style={styles.image}
			        			source={require('./images/icons/corner_green.png')}
			        		/>
		          			<Text style={styles.text}>Veredas o cruces (podrás evaluar el estado de los rebajes de veredas y cruces, además del estado de las mismas veredas)</Text>
	          			</View>
	          			<View style={styles.icon_view}>
		          			<Image 
			        			style={styles.image}
			        			source={require('./images/icons/parking.png')}
			        		/>
		          			<Text style={styles.text}>Estacionamientos (Indica si existen o no estacionamientos reservados)</Text>
	          			</View>
			        </View>
				</AppIntro>
			);
		}
	}
}

const styles = StyleSheet.create({
	app_intro: {
		justifyContent: 'center',
	    alignItems: 'center',
	},
	slide: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#FFFFFF',
	    flexDirection:'column',
	    padding:20,
  	},
	image: {
		
		marginBottom: 20
	},
	icon_view: {
		flexDirection: 'row'
	},
	text_icon: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
  	text: {
  		//fontSize: 17
  	},
  	text_title:{
  		fontSize: 25,
  		marginBottom: 15
  	},
  	list:{
  		alignItems: 'center',
  	},
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