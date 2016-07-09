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

        switch (status) {
            case "ENTRY_EXISTS":
                response.warn.push("Entry with part number '" + part + "' has already exist!");
                break;
            case "SAVED":
                response.info.push("Entry with part number '" + part + "' has been saved!");
                break;
            case "NO_CATEGORY":
                response.warn.push("Can not find category with name: '" + part + "'");
                break;
            case "QUANTITY_FORMAT":
                response.warn.push("Quantity '" + part + "' is not a number!");
                break;
            case "MISS_PART":
                response.warn.push("Part number has been lost! Oops...");
                break;
            case "DELETE_ENTRY":
                response.info.push("Entry '" + part + "' successfully deleted!");
                break;

            default :
                response.warn.push("Default!  ===  " + part);
        }
    }
}