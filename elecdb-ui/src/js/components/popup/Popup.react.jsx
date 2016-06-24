import React from "react";
import Popup from "react-notification-system";

export default class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.style = {
            NotificationItem: { // Override the notification item
                DefaultStyle: { // Applied to every notification, regardless of the notification level
                    fontWeight: '600'
                },

                success: { // Applied only to the success notification item
                    color: '#ECEFF1',
                    background: '#00C853'
                },
                warning: {
                    color: '#455A64',
                    background: '#FFEB3B'
                },
                error: {
                    color: '#ECEFF1',
                    background: '#DD2C00'
                }
            }
        }
    }

    componentDidMount() {
        this.elem = this.refs.popup;
    }


    addNotification(data) {
        this.elem.addNotification(data);
    }

    warn(mess, timeout) {
        this.elem.addNotification({
            message: mess,
            level: 'warning',
            autoDismiss: timeout || 10
        });
    }

    err(mess, timeout) {
        this.elem.addNotification({
            message: mess || "Internal Server Error! Try Again Latter",
            level: 'error',
            autoDismiss: timeout || 0
        });
    }

    info(mess, timeout) {
        this.elem.addNotification({
            message: mess,
            level: 'success',
            autoDismiss: timeout || 10
        });
    }


    render() {
        let self = this;
        return (
            <Popup ref="popup" style={self.style}/>
        );
    }
}