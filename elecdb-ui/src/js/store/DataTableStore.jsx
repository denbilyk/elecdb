import AppDispatcher from "../actions/AppDispatcher.jsx";
import {EventEmitter} from "events";
import helper from "./StoreHelper.jsx";


class DataTableStore extends EventEmitter {

    constructor(...args) {
        super(...args);
    }


    getData() {
        return this.data;
    }

    getHeader() {
        return this.header;
    }

    getCategories() {
        return this.categories;
    }

    getDetails() {
        return this.details;
    }

    addDetailsReloadListener(callback) {
        this.on(AppDispatcher.EVENTS.DETAILS_LOAD, callback);
    }

    removeDetailsReloadListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.DETAILS_LOAD, callback);
    }

    addHeaderReloadListener(callback) {
        this.on(AppDispatcher.EVENTS.HEADER_LOAD, callback);
    }

    removeHeaderReloadListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.HEADER_LOAD, callback);
    }

    addDataReloadListener(callback) {
        this.on(AppDispatcher.EVENTS.DATA_LOAD, callback);
    }

    removeDataReloadListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.DATA_LOAD, callback);
    }

    addCategoriesLoadListener(callback) {
        this.on(AppDispatcher.EVENTS.CATEGORY_LOAD, callback);
    }

    removeCategoriesLoadListener(callback) {
        this.removeListener(AppDispatcher.EVENTS.CATEGORY_LOAD, callback);
    }
}


var store = new DataTableStore();
DataTableStore.tokens = {};

let token = AppDispatcher.register(AppDispatcher.KEYS.HEADER_REQUEST, (resp) => {
    if (helper.processErrors(resp)) {
        store.header = resp.data;
        store.emit(AppDispatcher.EVENTS.HEADER_LOAD);
    }
    return true;
});
DataTableStore.tokens.header = token;

token = AppDispatcher.register(AppDispatcher.KEYS.DATA_REQUEST, (resp) => {
    if (helper.processErrors(resp)) {
        store.data = resp.data;
        store.emit(AppDispatcher.EVENTS.DATA_LOAD);
    }
    return true;
});
DataTableStore.tokens.data = token;


token = AppDispatcher.register(AppDispatcher.KEYS.CATEGORY_REQUEST, (resp) => {
    if (helper.processErrors(resp)) {
        store.categories = resp.data;
        store.emit(AppDispatcher.EVENTS.CATEGORY_LOAD);
    }
    return true;
});
DataTableStore.tokens.category = token;


token = AppDispatcher.register(AppDispatcher.KEYS.DETAILS_REQUEST, resp => {
    if (helper.processErrors(resp)) {
        store.details = resp.data;
        store.emit(AppDispatcher.EVENTS.DETAILS_LOAD);
    }
    return true;
});
DataTableStore.tokens.details = token;

export default store;