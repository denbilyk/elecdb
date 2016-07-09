import {Dispatcher} from "flux";
import assign from "object-assign";

var fluxDispatcher = new Dispatcher();
var AppDispatcher = assign(
    {
        dispatch(key, data, params) {
            var payload = {
                actionType: key,
                data: data
            };

            if (params) {
                payload.params = params;
            }
            //console.log("Flux dispatcher: " + key);
            fluxDispatcher.dispatch({payload: payload});
        },

        register(key, callback){
            return fluxDispatcher.register((resp) => {
                var payload = resp.payload;
                if (payload.actionType === key) {
                    callback(resp.payload);
                }
            });
        }

    },

    {
        KEYS: {
            DATA_REQUEST: "DATA_REQUEST",
            HEADER_REQUEST: "HEADER_REQUEST",
            CATEGORY_REQUEST: "CATEGORY_REQUEST",
            UPDATE_FILTER: "UPDATE_FILTER",
            NEW_ENTRY: "NEW_ENTRY",
            IMPORT: "IMPORT",
            DETAILS_REQUEST: "DETAILS_REQUEST"

        },
        EVENTS: {
            UPDATE_FILTER: "UPDATE_FILTER",
            DATA_LOAD: "DATA_LOAD",
            HEADER_LOAD: "HEADER_LOAD",
            NEW_ENTRY: "NEW_ENTRY",
            IMPORT: "IMPORT",
            DETAILS_LOAD: "DETAILS_LOAD"
        },
        REQUEST: {
            PENDING: "PENDING",
            TIMEOUT: "TIMEOUT",
            ERROR: "ERROR"
        }
    }
);

export default AppDispatcher;
