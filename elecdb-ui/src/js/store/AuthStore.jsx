import {EventEmitter} from "events";
import AppDispatcher from "../actions/AppDispatcher";


function setUser(profile, token) {
    if (!localStorage.getItem('id_token')) {
        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('id_token', token);
    }
}

function removeUser() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
}

class AuthStore extends EventEmitter {

    constructor(...args) {
        super(...args);
    }

    isAuthenticated() {
        return !!localStorage.getItem('id_token');

    }

    getUser() {
        return JSON.parse(localStorage.getItem('profile'));
    }

    getJwt() {
        return localStorage.getItem('id_token');
    }

    addListener(callback) {
        this.on(AppDispatcher.EVENTS.LOGIN_USER, callback);
    }

    removeListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.LOGIN_USER, callback);
    }

}

var store = new AuthStore();

AuthStore.tokens = {};

let token = AppDispatcher.register(AppDispatcher.KEYS.LOGIN_USER, resp => {
    setUser(resp.data.profile, resp.data.token);
    console.log(resp.data.profile);
    store.emit(AppDispatcher.EVENTS.LOGIN_USER);
});
AuthStore.tokens.login = token;

token = AppDispatcher.register(AppDispatcher.KEYS.LOGOUT_USER, resp => {
    removeUser();
    store.emit(AppDispatcher.EVENTS.LOGIN_USER);
});
AuthStore.tokens.logout = token;

export default store;