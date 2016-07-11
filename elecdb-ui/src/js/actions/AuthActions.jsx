import AppDispatcher from "./AppDispatcher";
import BaseApi from "./BaseApi";

class AuthController extends BaseApi {


    logUserIn(profile, token) {

        AppDispatcher.dispatch(AppDispatcher.KEYS.LOGIN_USER, {
            //actionType: AppDispatcher.KEYS.LOGIN_USER,
            profile: profile,
            token: token
        });
    }

    logUserOut() {
        AppDispatcher.dispatch(AppDispatcher.KEYS.LOGOUT_USER, null);
    }
}

export default new AuthController();