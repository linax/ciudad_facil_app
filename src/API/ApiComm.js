/**
 *  Clase APiComm (singleton) con métodos de llamada a API ciudad-fácil
 */

'use strict';

import { AsyncStorage } from 'react-native';

import userDefaults from '../userDefaults.js';
import fetch from 'react-native-fetch-polyfill';

let singletonInstance = null;

class ApiComm {
  
    /**
     * Constructor de la clase que verifica la existencia de una instancia
     * @return {[type]} [description]
     */
    constructor() {
        if(!singletonInstance) {
            singletonInstance = this;
        }
        this.accessToken = null;

        return singletonInstance;
    }

    /**
     * Retorna la URL del método solicitado en la api
     * @param  {String} endpoint nombre del método
     * @return {String}          URL completa, compuesta de HOST y Método API
     */
    getApiUrl(endpoint) {
        var apiUrl = 'http://api.ciudadfacil.cl/api/'+ endpoint; // Production
        return apiUrl;
    }

    /**
     * Obtiene los datos a partir de una llamada a la API
     * @param  {String} url       URL a llamar
     * @param  {function} resolve función de resolución
     * @param  {function} reject  función de rechazo
     * @param  {String} reqMethod método de la petición
     * @param  {String} reqBody   cuerpo de petición
     * @return {[type]}           [description]
     */
    fetchRequest(url, resolve, reject, reqMethod = 'GET', reqBody = null) {

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

        //llamada a la url
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
            } else {
                reject(response); // request succeeded, but received bad status
            }
        }, error => {
            reject(error); // request failed
        });
    }

    /**
     * Llamada a /evaluation_points
     * @return {Promise} [description]
     */
    getEvaluationPoints() {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('evaluation_point');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a /version
     * @return {Promise} [description]
     */
    getAppVersion() {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('version');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a login
     * @param  {JSON} data datos de login de usuario
     * @return {Promise}      [description]
     */
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

    /**
     * Llamada a /user PATCH
     * @param  {JSON} data datos de usuario
     * @return {Promise}      [description]
     */
    updateUser(data) {
        return new Promise(function(resolve, reject){
            let userData = JSON.stringify(data);
            let url = this.getApiUrl('user');
            this.fetchRequest(url, resolve, reject, 'PATCH', userData);
        }.bind(this));
    }

    /**
     * Llamada a /user POST
     * @param  {JSON} data datos de usuario a registrar
     * @return {Promise}      [description]
     */
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
            let url = this.getApiUrl('user');
            this.fetchRequest(url, resolve, reject, 'POST', userData);
        }.bind(this));
    }

    /**
     * Llamada a /user GET
     * @return {Promise} [description]
     */
    getUserDetails() {
        return new Promise(function(resolve, reject){
            let url = this.getApiUrl('user');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a user/image
     * @param  {String} image imagen en base64
     * @return {Promise}       [description]
     */
    postUserImage(image) {
        return new Promise(function(resolve, reject){
            let userData = JSON.stringify({
                usu_img: image
            });
            let url = this.getApiUrl('user/image');
            this.fetchRequest(url, resolve, reject, 'PATCH', userData);
        }.bind(this));
    }

    /**
     * Llamada a user/evaluation_point
     * @return {Promise]} [description]
     */
    getEvaluationPointsByUser() {
        return new Promise(function(resolve, reject){
            let url = this.getApiUrl('user/evaluation_point');
            this.fetchRequest(url, resolve,  reject);
        }.bind(this));
    }

    /**
     * Llamada a /parking GET
     * @param  {Integer} data identificador de estacionamiento
     * @return {Promise}      [description]
     */
    getDetailParking(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('parking/');
            url = url + data;
            this.fetchRequest(url, resolve, reject, 'GET');
        }.bind(this));
    }

    /**
     * Llamada a /parking POST
     * @param {JSON} data datos de estacionamiento a agregar
     */
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

    /**
     * Llamada a /parking PATCH
     * @param  {JSON} data datos de estacionamiento
     * @return {Promise}      [description]
     */
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

    /**
     * Llamada a /parking DELETE
     * @param  {Integer} data identificador del estacionameinto que se desea eliminar
     * @return {Promise}      [description]
     */
    deleteParking(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('parking/');
            url = url + data;
            this.fetchRequest(url, resolve, reject, 'DELETE');
        }.bind(this));
    }

    /**
     * Llamada a building GET
     * @param  {Integer} data identificador de la edificación
     * @return {Promise}      [description]
     */
    getDetailBuild(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('building/');
            url = url + data;
            this.fetchRequest(url, resolve, reject, 'GET');
        }.bind(this));
    }

    /**
     * Llamada a category/building GET
     * @param  {???} data no se identifica su uso ???
     * @return {Promise}      [description]
     */
    getCategoriesBuilding(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('categories/building');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a /evaluation_point/type/2/evaluation_alternatives GET
     * @param  {???} data no se identifica su uso ???
     * @return {Promise}      [description]
     */
    getEvaluationAlternativesByBuilding(data){
        return new Promise(function(resolve, reject){
              var url = this.getApiUrl('evaluation_point/type/2/evaluation_alternatives');
              this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a /building POST
     * @param {[type]} data [description]
     */
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
            this.fetchRequest(url, resolve, reject, 'POST', buildData);
        }.bind(this));
    }

    /**
     * Llamada a /building PATCH
     * @param  {JSON} data datos de edificación
     * @return {Promise}      [description]
     */
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

  /**
   * Llamada a /building DELETE
   * @param  {Integer} data identificador de edificación a eliminar
   * @return {Promise}      [description]
   */
    deleteBuild(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('building/');
            url = url + data;
            this.fetchRequest(url, resolve, reject, 'DELETE');
        }.bind(this));
    }

    /**
     * Llamada a /public_space GET
     * @param  {Integer} data identificador de espacio público
     * @return {Promise}      [description]
     */
    getDetailPublicSpace(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('public_space/');
            url = url + data;
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a /categories/public_space
     * @param  {Integer} data datos de espacio público
     * @return {Promise}      [description]
     */
    getCategoriesPublicSpace(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('categories/public_space');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a evaluation_point/type/3/evaluation_alternatives
     * @param  {???} data ???
     * @return {Promise}      [description]
     */
    getEvaluationAlternativesByPublicSpace(data){
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('evaluation_point/type/3/evaluation_alternatives');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a /public_space POST
     * @param {JSON} data datos de espacio público
     */
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
            this.fetchRequest(url, resolve, reject, 'POST', publicSpaceData);
        }.bind(this));
    }

    /**
     * Llamada a /public_space PATHC
     * @param  {JSON} data datos de espacio público
     * @return {Promise}      [description]
     */
    editPublicSpace(data) {
        return new Promise(function (resolve, reject){
            let url = this.getApiUrl('public_space/') + data.id;
            var publicSpaceData = JSON.stringify(data);
            if (data.image == 'image_default') {
                publicSpaceData = JSON.parse(publicSpaceData);
                publicSpaceData.ima_img = '';
                publicSpaceData = JSON.stringify(publicSpaceData);
            }
            this.fetchRequest(url, resolve, reject, 'PATCH', publicSpaceData);
        }.bind(this));
    }

    /**
     * Llamada a public_space DELETE
     * @param  {Integer} data identificador del espacio público
     * @return {Promise}      [description]
     */
    deletePublicSpace(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('public_space/');
            url = url + data;
            this.fetchRequest(url, resolve, reject, 'DELETE');
        }.bind(this));
    }

    /**
     * Llamada a sidewalk_intersection GET
     * @param  {Integer} data identificador de la vereda_cruce
     * @return {Promise}      [description]
     */
    getDetailSidewalk(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('sidewalk_intersection/');
            url = url + data;
            this.fetchRequest(url, resolve, reject, 'GET');
        }.bind(this));
    }

    /**
     * Llamada a evaluation_point/type/4/evaluation_alternatives GET
     * @param  {???} data ???
     * @return {Promise}      [description]
     */
    getEvaluationAlternativesBySidewalk(data){
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('evaluation_point/type/4/evaluation_alternatives');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a 'evaluation_point/type/5/evaluation_alternatives' GET
     * @param  {???} data ???
     * @return {Promise}      [description]
     */
    getEvaluationAlternativesByCross(data){
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('evaluation_point/type/5/evaluation_alternatives');
            this.fetchRequest(url, resolve, reject);
        }.bind(this));
    }

    /**
     * Llamada a /sidewalk_intersection POST
     * @param {JSON} data datos de la vereda_cruce
     */
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
            this.fetchRequest(url, resolve, reject, 'POST', sidewalkData);
        }.bind(this));
    }

    /**
     * Llamada a /sidewalk_intersection PATCH
     * @param  {JSON} data datos de vereda_cruce
     * @return {Promise}      [description]
     */
    editSidewalk(data) {
        return new Promise(function (resolve, reject){
            let url = this.getApiUrl('sidewalk_intersection/') + data.id;
            let sidewalkData = JSON.stringify(data)
            this.fetchRequest(url, resolve, reject, 'PATCH', sidewalkData);
        }.bind(this));
    }

    /**
     * Llamada a /sidewalk_intersection DELETE
     * @param  {Integer} data identificador de vereda_cruce
     * @return {Promise}      [description]
     */
    deleteSidewalk(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('sidewalk_intersection/');
            url = url + data;
            this.fetchRequest(url, resolve, reject, 'DELETE');
        }.bind(this));
    }

    /**
     * Llamada a /evaluation_point/{id}/comment
     * @param  {JSON} data datos de evlauación
     * @return {Promise}      [description]
     */
    postComment(data) {
        return new Promise(function(resolve, reject){
            var url = this.getApiUrl('evaluation_point/');
            url = url + data.id + '/comment'
            let commentData = JSON.stringify({
                com_usu_pev: data.comment
            });
            this.fetchRequest(url, resolve, reject, 'POST', commentData);
        }.bind(this));
    }

    /**
     * Llamada a /evaluation_point/{id}/vote
     * @param  {JSON} data datos del comentario
     * @return {Promise}      [description]
     */
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

    /**
     * Llamada a /evaluation_point/{id}/evaluate
     * @param  {JSON} data datos de evaluación
     * @return {Promise}      [description]
     */
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
            this.fetchRequest(url, resolve, reject, 'POST', voteData);
        }.bind(this));
    }

}

export default (new ApiComm);
