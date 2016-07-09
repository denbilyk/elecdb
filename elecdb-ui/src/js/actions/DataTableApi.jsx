import BaseApi from "./BaseApi.jsx";
import AppDispatcher from "../actions/AppDispatcher.jsx";


class DataTableApi extends BaseApi {

    constructor(props) {
        super(props);
    }

    import(data) {
        let url = BaseApi.getHost() + "/import";
        let key = AppDispatcher.KEYS.IMPORT;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).end(this.processResponse(key));
    }


    sendNewEntry(data) {
        let url = BaseApi.getHost() + "/";
        let key = AppDispatcher.KEYS.NEW_ENTRY;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.post(url, data).end(this.processResponse(key));
    }

    getTableData(headerIds, categoryIds) {
        let url = BaseApi.getHost() + "/";
        url = this.buildHeaderIds(url, headerIds);
        url = this.buildCategoryIds(url, categoryIds);
        let key = AppDispatcher.KEYS.DATA_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    getTableHeader() {
        let url = BaseApi.getHost() + "/header";
        let key = AppDispatcher.KEYS.HEADER_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    getCategories() {
        let url = BaseApi.getHost() + "/category";
        let key = AppDispatcher.KEYS.CATEGORY_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    getDetails(part) {
        let url = BaseApi.getHost() + "/details?part=" + part;
        let key = AppDispatcher.KEYS.DETAILS_REQUEST;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.get(url).end(this.processResponse(key));
    }

    updateDetails(data) {
        let url = BaseApi.getHost() + "/details";
        let key = AppDispatcher.KEYS.NEW_ENTRY;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.put(url, data).end(this.processResponse(key));
    }

    deleteRecord(partNumber) {
        let url = BaseApi.getHost() + "/" + partNumber;
        let key = AppDispatcher.KEYS.DELETE_ENTRY;
        this.abortPendingRequests(key);
        this._pendingRequests[key] = BaseApi.del(url).end(this.processResponse(key));
    }

    buildHeaderIds(url, headerIds) {
        if (!headerIds) return url;
        url += "?header_ids=";
        headerIds.forEach((header) => {
            if (header.show)
                url += header.id + ","
        });
        url = url.substring(url.length - 1, -1);
        return url;
    }

    buildCategoryIds(url, categoryIds) {
        if (!categoryIds) return url;
        url += "&category_ids=";
        categoryIds.forEach(category => {
            url += category.show === undefined ? category.id + "," : category.show ? category.id + "," : "";
        });
        url = url.substring(url.length - 1, -1);
        console.log(url);
        return url;
    }
}

export default new DataTableApi();