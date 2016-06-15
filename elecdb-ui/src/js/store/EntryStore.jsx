import AppDispatcher from "../actions/AppDispatcher.jsx";
import {EventEmitter} from "events";
import helper from "./StoreHelper.jsx";

class EntryStore extends EventEmitter {

    constructor(...args) {
        super(...args);
        this.response = {status: 0, info: [], warn: []}
    }

    addNewEntryResponseListener(callback) {
        this.on(AppDispatcher.EVENTS.NEW_ENTRY, callback);
    }

    removeNewEntryResponseListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.NEW_ENTRY, callback);
    }

    getResponseMessages() {
        return this.response;
    }

    clear() {
        this.response.status = 0;
        this.response.info = [];
        this.response.warn = [];
    }
}

var store = new EntryStore();

EntryStore.tokens = {};

let token = AppDispatcher.register(AppDispatcher.KEYS.NEW_ENTRY, (resp) => {
    if (helper.processErrors(resp)) {
        helper.processResponse(resp.data, store.response);
    } else {
        store.response.status = -1;
    }
    store.emit(AppDispatcher.EVENTS.NEW_ENTRY);
    return true;
});

EntryStore.tokens.entry = token;

export default store;
