import request from "superagent";
import AppDispatcher from "../actions/AppDispatcher.jsx";
import AuthStore from "../store/AuthStore";


var SERVER_HOST = getHostUrl();
var TIMEOUT = getTimeOut();

function getHostUrl() {
    var result = "http://localhost:8080/api";
    try {
        result = API_URL_CFG + "/api";
    } catch (e) {

    }
    return result;
}

function getTimeOut() {
    var result = 0;
    try {
        result = TIMEOUT_CFG;
    } catch (e) {

    }
    return result;
}

export default class BaseApi {

    constructor() {
        this._pendingRequests = {};
    }

    static getHost() {
        return SERVER_HOST;
    }

    processResponse(key) {
        return function (err, res) {
            if (err && err.timeout === TIMEOUT)
                AppDispatcher.dispatch(key, err, AppDispatcher.REQUEST.TIMEOUT);
            else if (!res || !res.ok) {
                AppDispatcher.dispatch(key, err, AppDispatcher.REQUEST.ERROR);
            }
            else {
                AppDispatcher.dispatch(key, res.body);
            }

        }
    }

    abortPendingRequests(key) {
        if (this._pendingRequests[key]) {
            this._pendingRequests[key]._callback = function () {
            };
            this._pendingRequests[key].abort();
            this._pendingRequests[key] = null;
        }
    }

    static buildUrl(url, filter) {
        url += "?";
        if (filter.part in filter) url += "part=" + filter.part + "&";
        console.log("Build URL: " + url);
        return url;
    }

    static get(url, timeout) {
        return request
            .get(url)
            .set('Authorization', 'Bearer ' + AuthStore.getJwt())
            .timeout(timeout || TIMEOUT);
    }

    static post(url, data, timeout) {
        return request
            .post(url, data)
            .timeout(timeout || TIMEOUT);
    }

    static put(url, data) {
        return request
            .put(url, data);
    }

    static del(url) {
        return request
            .del(url);
    }

}