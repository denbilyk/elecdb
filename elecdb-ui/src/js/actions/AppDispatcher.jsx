import {Dispatcher} from "flux";
import assign from 'object-assign';

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
            console.log("Flux dispatcher: " + key);
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
            CATEGORY_REQUEST: "CATEGORY_REQUEST",
            UPDATE_FILTER: "UPDATE_FILTER",
            NEW_ENTRY: "NEW_ENTRY",
            IMPORT: "IMPORT",

        },
        EVENTS: {
            UPDATE_FILTER: "UPDATE_FILTER",
            DATA_LOAD: "DATA_LOAD",
            NEW_ENTRY: "NEW_ENTRY",
            IMPORT: "IMPORT",
        },
        REQUEST: {
            PENDING: "PENDING",
            TIMEOUT: "TIMEOUT",
            ERROR: "ERROR"
        }
    }
);

export default AppDispatcher;
