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

    getCategories() {
        return this.categories;
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
let token = AppDispatcher.register(AppDispatcher.KEYS.DATA_REQUEST, (resp) => {
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


export default store;