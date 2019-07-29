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
import commonStyles from '../commonStyles';
import API from '../../API/ApiComm';
import userDefaults from '../../userDefaults.js';

export default class Evals extends Component {

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
			couldAddEval: true
		}
	}

	componentWillMount() {
		this._getData()
	}

	componentWillUpdate(nextProps, nextState) {
    	if (!this.props.refreshData && nextProps.refreshData) {
      		this._getData();
    	}
  	}

	_getData() {
		this.setState({ visible: true });
		var type = global.type;
		this.makeCall(type);
	}

	checkIfAlreadyCreateEvaluation(couldEval, evalId, evals) {
		if (!couldEval) {
			// Editar
			for(var i=0; i < evals.length ; i++) {
				var evaluation = evals[i]
				if (evaluation.eup_id == evalId) {
					this.setState({
						couldAddEval: couldEval,
						evaluation: evaluation,
						evalId: evalId
					})
				}
			}
		}
		else {
			// Crear
			this.setState({
				couldAddEval: couldEval,
				evaluation: {}
			})
		}
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
			    	this.checkIfAlreadyCreateEvaluation(json.data.permissions.e, json.data.permissions.e_eval, json.data.evals)
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
			    	this.checkIfAlreadyCreateEvaluation(json.data.permissions.e, json.data.permissions.e_eval, json.data.evals)
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
			    	this.checkIfAlreadyCreateEvaluation(json.data.permissions.e, json.data.permissions.e_eval, json.data.evals)
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
		// this.setState({
		// 	dataSource: this.state.dataSource.cloneWithRows(data.com_usu_pev),
		// 	title: data.pev_ttl
		// });

		// if(data.pev_neg != null) {
		// 	this.setState({ negative: data.pev_neg });
		// }

		// if(data.pev_pos != null) {
		// 	this.setState({ positive: data.pev_pos });
		// }
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(data.evals),
			title: data.pev_ttl
		});
	}


	_viewDetail(vae) {
		global.vae = vae;
		Actions.EvalDetail();
	}

	_didTapMakeEvaluation(){
		if (!global.isConnected) {
			this._showError('no-connection')
		}
		else if(this.state.couldAddEval) {
			// llamar pauta de evaluación
			var type = global.type;
			switch(type) {

			case 2:
				Actions.AlterEvalsBuild();
				break;
			case 3:
				Actions.AlterEvalsPublic();
				break;
			case 4:
				if(global.category == 1) {
					Actions.AlterEvalsSidewalk();
				} else {
					Actions.AlterEvalsCross();
				}
				break;
			}
		}
		else {
			this._didTapEditEvaluation()
		}
	}

	_didTapEditEvaluation() {
		switch(type) {
			case 2:
				Actions.AddBuild({ isEditingEvaluation: true, evaluation: this.state.evaluation })
			break;
			case 3:
				Actions.AddPublicSpace({ isEditingEvaluation: true, evaluation: this.state.evaluation })
			break;
			case 4:
				Actions.AddSidewalk({ isEditingEvaluation: true, evaluation: this.state.evaluation });
			break;
		}
	}

	_renderCell(rowData) {
		var date = rowData.eup_created_at;
		date = date.substr(0,date.indexOf(' '));
		if(rowData.eup_cmn == null) {
			rowData.eup_cmn = "Sin comentarios";
		}

		return(
			<TouchableOpacity onPress={() => this._viewDetail(rowData)}>
				<View style={styles.containerEval}>
					<View style={styles.dataContainer}>
						<View style={styles.containerComment}>
							<Text style={[commonStyles.text, {fontStyle: 'italic', marginBottom: 10}]}>{rowData.eup_cmn}</Text>
						</View>
						<View>
							<Text style={[commonStyles.text, {fontWeight: 'bold', fontSize: 14, marginBottom: 10}]}>{rowData.usr_evl} · <Text style={{fontSize: 13, fontWeight: '200'}}>{date}</Text></Text>
						</View>
					</View>
					<View style={styles.showContent}>
						<Icon name="chevron-right" size={30} color="#B6B8B3" />
					</View>
				</View>
				<View style={styles.separatorLine} />
			</TouchableOpacity>
		);
	}

  	render() {
  		let buttonTitle = this.state.couldAddEval ? "Realizar Evaluación" : "Editar Evaluación"
    	return (
      	<View style={styles.container}>
      		<SpinnerCustom visible={this.state.visible}/>
        	<Header title='Evaluaciones' /*realizadas'*/ popParams={{ refresh: { refreshData: true }}}/>

        	<View style={styles.titleContainer}>
						<Text style={[commonStyles.text, commonStyles.titleText]}>{this.state.title}</Text>
        	</View>

        	<View style={styles.containerButton}>
	        	<TouchableOpacity style={styles.buttonShow} onPress={() => this._didTapMakeEvaluation()}>
	        		<Text style={commonStyles.buttonText}>{buttonTitle}</Text>
				</TouchableOpacity>
        	</View>

        	<ScrollView style={styles.comments}>
        		{/*<Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 20}}>Evaluaciones: </Text>*/}
        		<View style={styles.separatorLine} />

        		<ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderCell.bind(this)}/>

        	</ScrollView>

          <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
          <ModalReload ref={(success) => { this.success = success; }}  reload={() => this._onRefresh()} icon="alert-circle" title="Aviso" background="#3CC882" text="El comentario ha sido agregado" destine='comments'/>
          <ModalReload ref={(success_vote) => { this.success_vote = success_vote; }}  reload={() => this._onRefresh()} icon="alert-circle" title="Aviso" background="#3CC882" text="El voto ha sido agregado" destine='comments'/>
        </View>
    	);
  	}
}
