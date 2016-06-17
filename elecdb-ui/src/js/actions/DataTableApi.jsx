import BaseApi from "./BaseApi.jsx";
import AppDispatcher from "../actions/AppDispatcher.jsx";


class DataTableApi extends BaseApi {

    constructor(props) {
        super(props);
    }

    import(data) {
        let url = BaseApi.getHost() + "/data/import";
        let key = AppDispatcher.KEYS.IMPORT;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).timeout(10000).end(this.processResponse(key));
    }


    sendNewEntry(data) {
        let url = BaseApi.getHost() + "/data";
        let key = AppDispatcher.KEYS.NEW_ENTRY;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).timeout(1000).end(this.processResponse(key));
    }

    getTableData() {
        let url = BaseApi.getHost() + "/data";
        let key = AppDispatcher.KEYS.DATA_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    getTableHeader() {
        let url = BaseApi.getHost() + "/data/header";
        let key = AppDispatcher.KEYS.HEADER_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    getCategories() {
        let url = BaseApi.getHost() + "/defs/category";
        let key = AppDispatcher.KEYS.CATEGORY_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }
}

export default new DataTableApi();