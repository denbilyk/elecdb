import BaseApi from "./BaseApi.jsx";
import AppDispatcher from "../actions/AppDispatcher.jsx";


class DataTableApi extends BaseApi {

    constructor(props) {
        super(props);
    }

    import(data) {
        let url = BaseApi.getHost() + "/mongo/import";
        let key = AppDispatcher.KEYS.IMPORT;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).end(this.processResponse(key));
    }


    sendNewEntry(data) {
        let url = BaseApi.getHost() + "/mongo/data";
        let key = AppDispatcher.KEYS.NEW_ENTRY;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).end(this.processResponse(key));
    }

    getTableData(headerIds) {
        let url = BaseApi.getHost() + "/mongo/data";
        url = this.buildHeaderIds(url, headerIds);
        let key = AppDispatcher.KEYS.DATA_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    getTableHeader() {
        let url = BaseApi.getHost() + "/mongo/header";
        let key = AppDispatcher.KEYS.HEADER_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    getCategories() {
        let url = BaseApi.getHost() + "/mongo/category";
        let key = AppDispatcher.KEYS.CATEGORY_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    buildHeaderIds(url, headerIds) {
        if (!headerIds) return url;
        url += "?header_ids=";
        headerIds.forEach((header) => {
            if (header.show)
                url += header.id + ","
        });
        url = url.substring(url.length - 1, -1);
        console.log(url);
        return url;
    }
}

export default new DataTableApi();