'use strict';

import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ListView, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Entypo';
import SpinnerCustom from '../../components/common/Spinner/spinner';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import ModalWarning from '../../components/common/ModalWarning/modalWarning';
import ModalReload from '../../components/common/ModalReload/modalReload';
import Header from '../../components/common/Header/header';
import styles from './styles';
import commonStyles from '../commonStyles';
import SIStyles from './selectImageStyles.js';
import API from '../../API/ApiComm';
import userDefaults from '../../userDefaults.js';
import ImageHelper from '../../components/common/Helpers/ImageHelper';


var options = {
  eup_cmn: '',
  ima_img: '',
}

var image  = 'image_default';

export default class EvalDetail extends Component {

	constructor(props) {
		super(props);

    this.evaluations = [];

    this.state = {
      visible: false,
      image: 'image_default',
      update: [],
      response: 'Se ha producido un error, intentelo más tarde'
    }
	}

  _setValue(value, index) {
    var realIndex = Math.floor(index)
    var newUpdate = this.state.update.slice(0)
    newUpdate[realIndex] = value

    this.setState({
      update: newUpdate
    })
  }

  isEvaluationArrayValid() {
    for (var index = 0; index < this.state.update.length ; index++) {
      var value = this.state.update[index]
      if (value == null) {
        return false
      }
    }
    return true
  }

  getEvaluationArray() {
    var data = {}
    for (var i = 0; i < this.state.update.length; i++) {
      if (this.state.update[i] != "optional") {
        data["vae["+i+"]"] = this.state.update[i]
      }
    }
    return data
  }

  selectPhotoTapped() {
    ImageHelper.selectImage({ width: 500, height: 500}, (response) => {
      this.setState({
        image: response
      })
      image = response
    })
  }

  componentWillMount(){
    options = {
      eup_cmn: '',
      ima_img: '',
    }

    this.setState({ visible: true });
    var updateArray = []
      API.getEvaluationAlternativesByBuilding().then(json => {
        var k = json.data

        if (k.length > 0) {

          for (var i = 0; i < k.length; i++) {
            var title = String(k[i].iev_des);
            var vie = k[i].vie;

            if (title.toUpperCase().includes("OPCIONAL")) {
              updateArray[i] = "optional"
            }
            else {
              updateArray[i] = null
            }

            this.evaluations.push(
              {
                title: title,
                opts: vie
              }
            )
          }
        }
        this.setState({ visible: false, update: updateArray });
      }).catch(error => {
        console.log(error);
      });
  }

  renderEvaluations() {
    return this.evaluations.map((data, i) => {
      return(
        <View key={i}>
          <Text key={i} style={[commonStyles.text, {fontWeight:'bold' ,marginTop: 10}]}>{data.title}</Text>
          { this.renderAlternatives(data.opts, i) }
        </View>
      )
    })
  }

  renderAlternatives(opts, index) {
    return opts.map((data, i) => {
      return(
          <RadioForm key={i} formHorizontal={false} animation={true} style={[styles.radioForm]}>
            <RadioButton labelHorizontal={true} key={i} style={[styles.radioContainer]}>
              <RadioButtonInput
                obj={data.vie_id}
                index={i}
                buttonSize={17}
                buttonInnerColor={(opts[i].vie_id == this.state.update[index]) ? '#7F7F7F' : '#FFFFFF'}
                buttonOuterColor={'#505050'}
                isSelected={true}
                onPress={() => this._setValue(data.vie_id, index)}
              />
              <View style={styles.labelContainer}>
                <Text style={commonStyles.text}>{data.vie_dsc}</Text>
              </View>
            </RadioButton>
          </RadioForm>
      )
    })
  }

    _didTapAddEvaluation() {
      options.ima_img = image;
      var ops = options.vae;
      if (!this.isEvaluationArrayValid()) {
        this.third.modalBehavior();
      } else if (options.ima_img == 'image_default'){
        this.four.modalBehavior();
      } else {
        options.id = global.id;
        this.setState({ visible: true });
        var formData = {
          "vae": this.getEvaluationArray(),
          "ima_img": options.ima_img,
          "eup_cmn": options.eup_cmn,
          "id": global.id
        }
        API.postEvaluation(formData).then(json =>{
            this.setState({ visible: false });
            this.success.modalBehavior();
        }).catch(error => {
          console.log(error);
            this.setState({ visible: false });
            if(error == 'no-connection') {
              this.setState({ response: 'Sin conexión a internet, por favor verifica tu conexión para continuar.' });
              this.warning.modalBehavior();
            }
            else {
              this.setState({ response: 'Se ha producido un error, intentelo más tarde' })
              this.warning.modalBehavior();
            }
        });
      }


    }

  	render() {
    	return (
          <View style={styles.container}>
            <SpinnerCustom visible={this.state.visible}/>
            <Header title='Evaluar edificación'/>
            <KeyboardAwareScrollView style={[styles.content, {marginTop: 0}]}>

            {
              this.renderEvaluations()
            }

          <View style={[SIStyles.container, {marginTop: 20}]}>
            <View style={SIStyles.formGroup2}>
                  <Text style={[commonStyles.text, {fontWeight: 'bold', marginBottom: 10}]}>Descripción del lugar:</Text>
                  <View style={SIStyles.contentInput}>
                    <TextInput underlineColorAndroid='transparent' style={SIStyles.textArea} multiline={true} maxLength={150}  onChangeText={(val) => options.eup_cmn = val}></TextInput>
                  </View>
            </View>
              <TouchableOpacity style={SIStyles.containerPhoto} onPress={() => this.selectPhotoTapped()}>
                <Image
                source={{uri: this.state.image}}
                style={SIStyles.image}
                resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addPhoto} onPress={() => this.selectPhotoTapped()}>
                <Text style={SIStyles.textAddImage}>Agregar Imagen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addBuild} onPress={() => this._didTapAddEvaluation()}>
                <Text style={SIStyles.textAdd}>Agregar</Text>
              </TouchableOpacity>
            </View>

            </KeyboardAwareScrollView>
            <ModalWarning ref={(third) => { this.third = third; }}  icon="alert" title="Error" background="#FD6B6B" text='Debes agregar todos las alternativas obligatorias'/>
            <ModalWarning ref={(four) => { this.four = four; }}  icon="alert" title="Error" background="#FD6B6B" text='Debes agregar una imagen'/>

            <ModalWarning ref={(warning) => { this.warning = warning; }}  icon="alert" title="Error" background="#FD6B6B" text={this.state.response}/>
            <ModalReload ref={(success) => { this.success = success; }}  icon="alert-circle" title="Aviso" background="#3CC882" text="La evaluación ha sido agregada" destine='main'/>
          </View>
    	);
  	}
}
