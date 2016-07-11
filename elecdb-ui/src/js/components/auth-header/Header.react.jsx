import React from "react";
import {render} from "react-dom";
import "./Header.styl";
import Appbar from "muicss/lib/react/appbar";
import Button from "muicss/lib/react/button";
import Auth0Lock from "auth0-lock";
import AuthActions from "../../actions/AuthActions";
import AuthStore from "../../store/AuthStore";


export default class AuthHeader extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            authenticated: false
        };
    }

    componentWillMount() {
        this.lock = new Auth0Lock('m7ZChBrIAbrXNNfGpQb1zDuCdYC6GquL', 'elecdb.eu.auth0.com');
        this.state.authenticated = AuthStore.isAuthenticated();
    }


    login() {
        this.lock.show((err, profile, token) => {
            if (err) {
                alert(err);
                return;
            }
            AuthActions.logUserIn(profile, token);
            this.setState({authenticated: true});
            this.context.router.push("/list");
        }, {
            disableSignupAction: true,
            gravatar: false,
        });
    }

    logout() {
        AuthActions.logUserOut();
        this.setState({authenticated: false});
        this.context.router.push("/");
    }

    getProfile() {
        return ;
    }

    render() {
        let self = this;
        let profile = AuthStore.getUser();
        console.log(profile);
        return (
            <Appbar className="mui--text-light mui--text-display2 mui--text-center">
                <span>{self.props.title}</span>
                <div className="header-right">
                    {this.state.authenticated ? (
                        <div className="user">
                            <span>{profile.nickname}</span>
                            <img src={profile.picture} alt="avatar"/>
                            <div className="user-profile">
                                <span onClick={self.logout.bind(self)}>Logout</span>
                            </div>

                        </div>) :
                        (<span onClick={self.login.bind(self)}>Login</span>)
                    }
                </div>
            </Appbar>
        );
    }
}

AuthHeader.contextTypes = {
    router: React.PropTypes.object
};