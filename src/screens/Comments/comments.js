'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ListView, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Entypo';
import SpinnerCustom from '../../components/common/Spinner/spinner';

import ModalWarning from '../../components/common/ModalWarning/modalWarning';
import ModalReload from '../../components/common/ModalReload/modalReload';
import Header from '../../components/common/Header/header';
import styles from './styles';
import API from '../../API/ApiComm';
import userDefaults from '../../userDefaults.js';

export default class Comments extends Component {

	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.state = {
			dataSource: ds.cloneWithRows([]),
			positive: 0,
			negative: 0,
			title: '',
			comment: '',
			visible: false,
			refreshing: false,
			responseVote: ''
		}
	}

	componentWillMount() {
		this.setState({ visible: true });
		var type = global.type;
		this.makeCall(type);
	}

	_showError(error) {
		if(error == 'no-connection') {
          this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
        }
		else if(error == 'auth') {
			this.setState({ response: 'Tu sesión ha caducado, cierra y vuelve a iniciar sesión' });
		} else {
			 this.setState({ response: 'Se ha producido un error, intentelo más tarde' });
		}
		this.warning.modalBehavior();
	}

	makeCall(type) {
		switch(type) {
			case 1:
			    API.getDetailParking(global.id).then(json => {
			    	this._setData(json.data);
			    	this.setState({ visible: false });
			    	console.log(json.data);
			    }).catch(error => {
			        this.setState({ visible: false });
			        console.log(error);
			        this._showError(error);
			      });
			    break;
			case 2:
			    API.getDetailBuild(global.id).then(json => {
			    	this._setData(json.data);
			    	this.setState({ visible: false });
			    	console.log(json.data);
			    }).catch(error => {
			        this.setState({ visible: false });
			        console.log(error);
			        this._showError(error);
			      });
				break;
			case 3:
			    API.getDetailPublicSpace(global.id).then(json => {
			    	this._setData(json.data);
			    	this.setState({ visible: false });
			    	console.log(json.data);
			    }).catch(error => {
			        this.setState({ visible: false });
			        console.log(error);
			        this._showError(error);
			      });
				break;
			case 4:
			    API.getDetailSidewalk(global.id).then(json => {
			    	this._setData(json.data);
			    	this.setState({ visible: false });
			    	console.log(json.data);
			    }).catch(error => {
			        this.setState({ visible: false });
			        console.log(error);
			        this._showError(error);
			      });
				break;
		}
	}

  	_onRefresh() {
  		this.setState({ visible: true });
		var type = global.type;
		this.makeCall(type);
  	}

	_setData(data) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(data.com_usu_pev),
			title: data.pev_ttl
		});

		if(data.pev_neg != null) {
			this.setState({ negative: String(data.pev_neg) });
		}

		if(data.pev_pos != null) {
			this.setState({ positive: String(data.pev_pos) });
		}
	}

	_makeComment(){
		var data = {
			comment: this.state.comment,
			id: global.id
		}
		this.setState({ visible: true });
		API.postComment(data).then(json =>{
			this._onRefresh();
			this.setState({ visible: false });
			this.success.modalBehavior();
		}).catch(error => {
			this.setState({ visible: false });
			this.warning.modalBehavior();
		});
	}

	_makeVote(vote) {
		var data = {
			vote: vote,
			id: global.id
		}
		this.setState({ visible: true });
		API.postVote(data).then(json => {
			console.log(json);
			if(json.message != 'El usuario ya ha votado previamente') {
				this._onRefresh();
				this.setState({ visible: false });
				this.setState({ responseVote: 'El voto ha sido agregado' });
				this.success_vote.modalBehavior();
			} else {
				this.setState({ visible: false });
				this.setState({ responseVote: 'Solo puedes agregar un voto' });
				this.success_vote.modalBehavior();
			}
		}).catch(error => {
			this.warning.modalBehavior();
		});
	}

	_renderCell(rowData) {
		var date = rowData.com_created_at;
		date = date.substr(0,date.indexOf(' '));
		return(
			<View style={{height: 60, marginTop: 10, marginBottom: 10}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
					<Text style={{fontWeight: 'bold'}}>Usuario: {rowData.com_usu}</Text>
					<Text style={{fontSize: 14}}>{date}</Text>
				</View>
				<Text style={{fontStyle: 'italic'}}>{rowData.com_cmn}</Text>
			</View>
		);
	}

  	render() {
    	return (
      	<View style={styles.container}>
      		<SpinnerCustom visible={this.state.visible}/>
        	<Header title='Comentarios y votos'/>

        	<View style={styles.titleContainer}>
        		<Text style={{fontWeight: 'bold', fontSize: 18}}>{this.state.title}</Text>
        	</View>

        	<View style={styles.votes}>
        		<Text style={{fontWeight: 'bold', fontSize: 16}}>Votos: </Text>
        		<TouchableOpacity onPress={() => this._makeVote(true)} style={styles.touchableVotes}>
        			<Icon name="triangle-up" size={40} color="#2D2D2D" />
        			<Text>{this.state.positive}</Text>
        		</TouchableOpacity>
        		<TouchableOpacity onPress={() => this._makeVote(false)} style={styles.touchableVotes}>
        			<Icon name="triangle-down" size={40} color="#2D2D2D" />
        			<Text>{this.state.negative}</Text>
        		</TouchableOpacity>
        	</View>


        	<ScrollView style={styles.comments}>
        		<Text style={{fontWeight: 'bold', fontSize: 16}}>Comentarios: </Text>

        		<ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderCell.bind(this)} />

        		<View style={styles.CommentArea}>
        			<Text>Agrega un comentario: </Text>

        			<View style={{borderColor:'#383838', borderWidth: 1, marginTop: 10}}><TextInput style={styles.textArea} underlineColorAndroid='transparent' maxLength={150} multiline={true} onChangeText={(val) => this.setState({comment: val}) }></TextInput></View>
        			<TouchableOpacity style={styles.add} onPress={() => this._makeComment()}>
        				<Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>Agregar Comentario</Text>
        			</TouchableOpacity>
        		</View>
        	</ScrollView>

          <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
          <ModalReload ref={(success) => { this.success = success; }}  reload={() => this._onRefresh()} icon="alert-circle" title="Aviso" background="#3CC882" text="El comentario ha sido agregado" destine='comments'/>
          <ModalReload ref={(success_vote) => { this.success_vote = success_vote; }}  reload={() => this._onRefresh()} icon="alert-circle" title="Aviso" background="#3CC882" text={this.state.responseVote} destine='comments'/>
        </View>
    	);
  	}
}