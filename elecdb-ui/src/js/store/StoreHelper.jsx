import AppDispatcher from "../actions/AppDispatcher.jsx";

export default {

    processErrors(resp){
        if (resp.params === AppDispatcher.REQUEST.TIMEOUT) {
            console.log("Request timeout");
            console.log(resp);
            return false;
        }
        else if (resp.params === AppDispatcher.REQUEST.ERROR) {
            console.log("Request error");
            console.log(resp);
            return false;
        }
        return true;
    },

    processResponse(data, response) {
        let status = data.status;
        let part = data.text;
        response.status = status;

        if (status === "ENTRY_EXISTS") {
            response.warn.push("Entry with part number '" + part + "' has already exist!");
        }
        if (status == "SAVED") {
            response.info.push("Entry with part number '" + part + "' has been saved!");
        }
        if (status == "NO_CATEGORY") {
            response.warn.push("Can not find category with name: '" + part + "'");
        }
        if(status == "QUANTITY_FORMAT") {
            response.warn.push("Quantity '"+ part +"' is not a number!");
        }
        if(status == "MISS_PART") {
            response.warn.push("Part number has been lost! Oops...");
        }
    }
}