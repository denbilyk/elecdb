import "muicss/lib/css/mui.css";
import "./DataTable.styl";
import React from "react";
import {render} from "react-dom";
import Button from "muicss/lib/react/button";
import Container from "muicss/lib/react/container";
import VGrid from "../var-grid/VGrid.react";
import EntryStore from "../../store/EntryStore";
import Popup from "../popup/Popup.react";
import Header from "../auth-header/Header.react";

export default class DataTable extends React.Component {

    constructor(props) {
        super(props);
    }


    componentWillMount() {
        this.newEntryResponseListener = this.onResponse.bind(this);
        EntryStore.addNewEntryResponseListener(this.newEntryResponseListener);
        this.deleteEntryResponseListener = this.onResponse.bind(this);
        EntryStore.addDeleteEntryResponseListener(this.deleteEntryResponseListener);
    }

    componentWillUnmount() {
        EntryStore.removeNewEntryResponseListener(this.newEntryResponseListener);
        EntryStore.removeDeleteEntryResponseListener(this.deleteEntryResponseListener);
    }

    componentDidMount() {
        this.popupSystem = this.refs.popup;
    }

    transitToAddNew() {
        this.context.router.push('/add');
    }

    transitToImport() {
        this.context.router.push('/import');
    }

    onResponse() {
        let response = EntryStore.getResponseMessages();
        if (response.status === -1)
            this.popupSystem.err();
        else {
            response.warn.map(item => {
                this.popupSystem.warn(item);
            });
            response.info.map(item => {
                this.popupSystem.info(item);
            })

        }
        EntryStore.clear();
    }

    render() {
        var self = this;
        return (
            <div id="app">
                <Popup ref="popup"/>
                <Header title="Elecdb"/>
                <div>
                    <Button variant="fab" color="primary" className="btn-add mui--pull-right"
                            onClick={self.transitToAddNew.bind(self)}>+</Button>
                    <Button variant="fab" color="primary" className="btn-import mui--pull-right"
                            onClick={self.transitToImport.bind(self)}>import</Button>
                    <Container>
                        <VGrid/>
                    </Container>
                </div>
            </div>
        )
    }


}

DataTable.contextTypes = {
    router: React.PropTypes.object
};
