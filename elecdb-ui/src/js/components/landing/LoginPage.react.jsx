import React from "react";
import {render} from "react-dom";
import "./LoginPage.styl";
import Header from "../auth-header/Header.react";
import AuthStore from "../../store/AuthStore";


export default class LoginPage extends React.Component {

    constructor(args) {
        super(args);
    }

    componentWillMount() {
        if (AuthStore.isAuthenticated()) this.context.router.push("/list");
    }
    
    render() {
        let self = this;
        return (
            <div>
                <Header title="Elecdb"/>
                <div className="login-text">
                    <span>Please, login to the application</span>
                </div>
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object
};