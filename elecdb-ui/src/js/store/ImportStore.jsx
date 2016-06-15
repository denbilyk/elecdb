import AppDispatcher from "../actions/AppDispatcher.jsx";
import {EventEmitter} from "events";
import helper from "./StoreHelper.jsx";

class ImportStore extends EventEmitter {

    constructor(...args) {
        super(...args);
        this.response = {status: 0, info: [], warn: []}
    }

    addImportResponseListener(callback) {
        this.on(AppDispatcher.EVENTS.IMPORT, callback);
    }

    removeImportResponseListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.IMPORT, callback);
    }

    getResponseMessages() {
        return this.response;
    }

    clear() {
        this.response.status = 0;
        this.response.info = [];
        this.response.warn = [];
    }

    processImportResponses(resp) {
        let data = resp.data;
        data.map((item)=> {
            helper.processResponse(item, this.response);
        });
    }


}

var store = new ImportStore();

ImportStore.tokens = {};

let token = AppDispatcher.register(AppDispatcher.KEYS.IMPORT, (resp) => {
    if (helper.processErrors(resp)) {
        store.processImportResponses(resp);
    } else {
        store.response.status = -1;
    }
    store.emit(AppDispatcher.EVENTS.IMPORT);
    return true;
});

ImportStore.tokens.import = token;

export default store;
