'use strict';

import { AsyncStorage } from 'react-native';

import userDefaults from '../userDefaults.js';
import fetch from 'react-native-fetch-polyfill';

let singletonInstance = null;

// This class is a singleton in order to set accessToken from login
class ApiComm {
  constructor() {
    if(!singletonInstance) {
      singletonInstance = this;
    }
    this.accessToken = null;

    return singletonInstance;
  }

  getApiUrl(endpoint) {
    var apiUrl = 'http://apitest.ciudadfacil.cl/api/'+ endpoint; // Production
    //var apiUrl = 'http://ciudad-facil.perceptum.cl/api/' + endpoint; // Development
    return apiUrl;
  }

  fetchRequest(url, resolve, reject, reqMethod='GET', reqBody=null) {

    if (!global.isConnected) {
      reject('no-connection')
    }

    var init = {
      method: reqMethod
    };

    init.body = reqBody;
    init.headers = {
      'content-type': 'application/json',
      'Authorization': global.auth_token
    }
    init.timeout = 30000

    fetch(url, init).then(response => {
      if (response.ok) {
        if (response.status == 204) {
          resolve();
        }
        response.json().then(json => {
          resolve(json); // request succeeded, status good, and got json
        }, error => {
          reject(error); // request succeeded, status good, but failed to get json
        });
      } else if (response.status === 401) {
        reject('auth'); // request succeeded, but received 401 status
      } else if (response.status === 422) {
        response.json().then(json => {
          reject(json); // request succeeded, status good, and got json
        }, error => {
          reject(error); // request succeeded, status good, but failed to get json
        });
      }
      else {
        reject(response); // request succeeded, but received bad status
      }
    }, error => {
      reject(error); // request failed
    });
  }

  getEvaluationPoints() {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  getAppVersion() {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('version');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  postLoginUser(data) {
    return new Promise(function(resolve, reject){
      let userData = JSON.stringify({
        usu_eml: (data.email).toLowerCase(),
        usu_pss: (data.password).toLowerCase(),
        usu_fbk_tkn: data.fb_tkn,
        usu_twt_tkn: data.tw_tkn
      });
      let url = this.getApiUrl('login');
      this.fetchRequest(url, resolve, reject, 'POST', userData);
    }.bind(this));
  }

  updateUser(data) {
    return new Promise(function(resolve, reject){
      let userData = JSON.stringify(data);
      console.log("update", userData)
      let url = this.getApiUrl('user');
      this.fetchRequest(url, resolve, reject, 'PATCH', userData);
    }.bind(this));
  }

  postRegisterUser(data) {
    return new Promise(function(resolve, reject){
      let userData = JSON.stringify({
        usu_eml: (data.email).toLowerCase(),
        usu_nbr_usr: (data.user_name).toLowerCase(),
        usu_pss: (data.password).toLowerCase(),
        usu_pss_confirmation: (data.password).toLowerCase(),
        usu_nmb: data.names,
        usu_apl_ptr: data.surname1,
        usu_apl_mtr: data.surname2,
        usu_dsc: data.disability,
        usu_tpo_dsc: data.disability_type,
      });
      console.log(userData);
      let url = this.getApiUrl('user');
      this.fetchRequest(url, resolve, reject, 'POST', userData);
    }.bind(this));
  }

  getUserDetails() {
    return new Promise(function(resolve, reject){
      let url = this.getApiUrl('user');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  postUserImage(image) {
    return new Promise(function(resolve, reject){
      let userData = JSON.stringify({
        usu_img: image
      });
      console.log(userData);
      let url = this.getApiUrl('user/image');
      this.fetchRequest(url, resolve, reject, 'PATCH', userData);
    }.bind(this));
  }

  getEvaluationPointsByUser() {
    return new Promise(function(resolve, reject){
      let url = this.getApiUrl('user/evaluation_point');
      this.fetchRequest(url, resolve,  reject);
    }.bind(this));
  }

  getDetailParking(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('parking/');
      url = url + data;
      this.fetchRequest(url, resolve, reject, 'GET');
    }.bind(this));
  }

  addParking(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('parking');
      let parkingData = JSON.stringify({
        est_cnt_ttl : data.totalParking,
        est_cnt_rsv : data.totalDisability,
        est_cmp_ord : data.rule,
        pev_ttl : data.name,
        pev_ltt : data.latitude,
        pev_lng : data.longitude,
        est_cmn : data.comment,
        ime_img: data.image
      });
      console.log(parkingData);
      this.fetchRequest(url, resolve, reject, 'POST', parkingData);
    }.bind(this));
  }

  editParking(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('parking/') + data.id;
      let parkingData = JSON.stringify({
        est_cnt_ttl : data.totalParking,
        est_cnt_rsv : data.totalDisability,
        est_cmp_ord : data.rule,
        pev_ttl : data.name,
        pev_ltt : data.latitude,
        pev_lng : data.longitude,
        est_cmn : data.comment,
        ime_img: data.image
      });
      this.fetchRequest(url, resolve, reject, 'PATCH', parkingData);
    }.bind(this));
  }

  deleteParking(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('parking/');
      url = url + data;
      this.fetchRequest(url, resolve, reject, 'DELETE');
    }.bind(this));
  }

  getDetailBuild(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('building/');
      url = url + data;
      this.fetchRequest(url, resolve, reject, 'GET');
    }.bind(this));
  }

  getCategoriesBuilding(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('categories/building');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  getEvaluationAlternativesByBuilding(data){
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point/type/2/evaluation_alternatives');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  addBuild(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('building');
      let buildData = JSON.stringify({
        edi_dir: data.dir,
        edi_ema: data.email,
        edi_pub: true,
        edi_tel: data.phone,
        edi_sub_cat: data.sub,
        pev_ttl: data.name,
        pev_ltt: data.latitude,
        pev_lng: data.longitude,
        eup_cmn: data.comment,
        ima_img: data.image,
        vae: data.vae
      });
      console.log(buildData);
      this.fetchRequest(url, resolve, reject, 'POST', buildData);
    }.bind(this));
  }

  editBuild(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('building/') + data.id;
      let buildData = JSON.stringify(data);
      if (data.image == 'image_default') {
        buildData = JSON.parse(buildData);
        buildData.ima_img = '';
        buildData = JSON.stringify(buildData);
      }
      this.fetchRequest(url, resolve, reject, 'PATCH', buildData);
    }.bind(this));
  }

  deleteBuild(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('building/');
      url = url + data;
      this.fetchRequest(url, resolve, reject, 'DELETE');
    }.bind(this));
  }

  getDetailPublicSpace(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('public_space/');
      url = url + data;
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  getCategoriesPublicSpace(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('categories/public_space');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  getEvaluationAlternativesByPublicSpace(data){
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point/type/3/evaluation_alternatives');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  addPublicSpace(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('public_space');
      let publicSpaceData = JSON.stringify({
        esp_dir: data.dir,
        esp_ema: data.email,
        esp_tel: data.phone,
        esp_sub_cat: data.sub,
        pev_ttl: data.name,
        pev_ltt: data.latitude,
        pev_lng: data.longitude,
        eup_cmn: data.comment,
        ima_img: data.image,
        vae: data.vae
      });
      console.log(publicSpaceData);
      this.fetchRequest(url, resolve, reject, 'POST', publicSpaceData);
    }.bind(this));
  }

  editPublicSpace(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('public_space/') + data.id;
      var publicSpaceData = JSON.stringify(data);
      if (data.image == 'image_default') {
        publicSpaceData = JSON.parse(publicSpaceData);
        publicSpaceData.ima_img = '';
        publicSpaceData = JSON.stringify(publicSpaceData);
      }
      console.log(publicSpaceData);
      this.fetchRequest(url, resolve, reject, 'PATCH', publicSpaceData);
    }.bind(this));
  }

  deletePublicSpace(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('public_space/');
      url = url + data;
      this.fetchRequest(url, resolve, reject, 'DELETE');
    }.bind(this));
  }

  getDetailSidewalk(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('sidewalk_intersection/');
      url = url + data;
      this.fetchRequest(url, resolve, reject, 'GET');
    }.bind(this));
  }

  getEvaluationAlternativesBySidewalk(data){
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point/type/4/evaluation_alternatives');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  getEvaluationAlternativesByCross(data){
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point/type/5/evaluation_alternatives');
      this.fetchRequest(url, resolve, reject);
    }.bind(this));
  }

  addSidewalk(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('sidewalk_intersection');
      let sidewalkData = JSON.stringify({
        vcr_tip: data.type,
        vcr_des: data.description,
        pev_ttl: data.name,
        pev_ltt: data.latitude,
        pev_lng: data.longitude,
        ima_img: data.ima_img,
        vae: data.vae,
        eup_cmn: data.comment
      });
      console.log(sidewalkData);
      this.fetchRequest(url, resolve, reject, 'POST', sidewalkData);
    }.bind(this));
  }

  editSidewalk(data) {
    return new Promise(function (resolve, reject){
      let url = this.getApiUrl('sidewalk_intersection/') + data.id;
      let sidewalkData = JSON.stringify(data)
      console.log(sidewalkData);
      this.fetchRequest(url, resolve, reject, 'PATCH', sidewalkData);
    }.bind(this));
  }

  deleteSidewalk(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('sidewalk_intersection/');
      url = url + data;
      this.fetchRequest(url, resolve, reject, 'DELETE');
    }.bind(this));
  }

  postComment(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point/');
      url = url + data.id + '/comment'
      let commentData = JSON.stringify({
        com_usu_pev: data.comment
      });
      console.log(commentData);
      this.fetchRequest(url, resolve, reject, 'POST', commentData);
    }.bind(this));
  }

  postVote(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point/');
      url = url + data.id + '/vote'
      let voteData = JSON.stringify({
        vot_tpe: data.vote
      });
      this.fetchRequest(url, resolve, reject, 'POST', voteData);
    }.bind(this));
  }

  postEvaluation(data) {
    return new Promise(function(resolve, reject){
      var url = this.getApiUrl('evaluation_point/');
      url = url + data.id + '/evaluate'
      let voteData = JSON.stringify({
        vae: data.vae,
        eup_cmn: data.eup_cmn,
        ima_img: {
          "ima_img[0]": data.ima_img
        }
      });
      console.log(voteData);
      this.fetchRequest(url, resolve, reject, 'POST', voteData);
    }.bind(this));
  }

}

export default (new ApiComm);