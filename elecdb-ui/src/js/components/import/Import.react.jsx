import "./Import.styl";
import React from "react";
import Utils from "../../Utils.jsx";
import Container from "muicss/lib/react/container";
import Row from "muicss/lib/react/row";
import Checkbox from "muicss/lib/react/checkbox";
import Button from "muicss/lib/react/button";
import AppBar from "muicss/lib/react/appbar";
import Form from "muicss/lib/react/form";
import parser from "papaparse";
import DataTableApi from "../../actions/DataTableApi.jsx";
import ImportStore from "../../store/ImportStore.jsx";
import Popup from "../popup/Popup.react";
import DataTableStore from "../../store/DataTableStore";


export default class Import extends React.Component {

    constructor(props) {
        super(props);
        this.cols = [
            150, 70, 70, 70, 71, 300, 100, 150, 150, 150, 150, 110, 110, 110, 110, 110, 110, 110, 110, 110, 111
        ];
        this.header = {};
        this.entries = {};
        this.response = {};
        this.import_valid = {state: true};
    }

    componentWillMount() {
        this.importResponceListener = this.onImportComplete.bind(this);
        ImportStore.addImportResponseListener(this.importResponceListener);
    }

    componentWillUnmount() {
        ImportStore.removeImportResponseListener(this.importResponceListener);
    }

    componentDidMount() {
        this.popupSystem = this.refs.popup;
        this.header = DataTableStore.getHeader();
    }


    onImportComplete() {
        let response = ImportStore.getResponseMessages();
        if (response.status === -1)
            this.popupSystem.err();
        else {
            response.warn.map(item => {
                this.popupSystem.warn(item);
            });
            response.info.map(item => {
                this.popupSystem.info(item);
            });
        }
        ImportStore.clear();
    }

    onFileLoad(results) {
        var self = this;
        this.entries = results.data;
        this.items = results.data.map((row, k) => {
            let checkbox = k > 0 ? (
                <Checkbox className="cell" name={String("ch"+k)} label="" defaultChecked={true}/>)
                : <div className="cell" style={{width:30+'px'}} key={Utils.id()}>
                <Button variant="raised" className="btn-sel-inverse"
                        onClick={self.selectionInverse.bind(self)}>I</Button>
            </div>;
            return (
                <Row key={Utils.id()}>
                    {checkbox}
                    {row.map((cell, i) => {
                        let class_ = this.cols[i] + "px";
                        return (
                            <div className="cell" style={{width:class_}} key={Utils.id()}>{cell}</div>
                        );
                    })}
                </Row>)

        });
        this.setState({items: this.items});
    }

    selectionInverse() {
        let inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'checkbox') inputs[i].checked = !inputs[i].checked;
        }
    }

    fileInputChanged(e) {
        var data = document.getElementById("file").files[0];
        if (!data) return;
        this.filename = data.name;
        var self = this;
        document.getElementById("label_file_upload").innerHTML = this.filename;
        parser.parse(data, {
            complete: self.onFileLoad.bind(self)
        });
    }

    process(e) {
        e.preventDefault();
        let inputs = document.getElementsByTagName("input");
        let skip = [];
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].type === 'checkbox' && !inputs[i].checked) skip.push(inputs[i].name.substr(2));
        }
        if (!this.entries.length) return;

        this.import = [];
        let localHeader = [];
        this.entries.map((entry, i)=> {
            if (!this.import_valid.state) return;
            if (skip.indexOf(i.toString()) > -1) return;
            if (i == 0) {
                localHeader = entry;
                return;
            }
            let row = [];
            row.push({id: 2, value: this.filename.split('.')[0]});
            row.push({id: 3, value: 0});
            entry.map((cell, i) => {
                let hedObj = this.header.find(curr => {
                    return curr.name == localHeader[i];
                });
                if (hedObj) row.push({id: hedObj.id, value: cell});
                else {
                    this.import_valid.state = false;
                    this.import_valid.header = localHeader[i];
                }
            });
            if (this.import_valid.state)
                this.import.push(row);
        });


        if (!this.import_valid.state)
            this.popupSystem.err("Header columns can not be assigned: " + this.import_valid.header);
        else
            DataTableApi.import(this.import);
    }

    createDto(entry) {
        let obj = [];
        entry.map(item => {
            let hed = this.header.find(curr => {
                return curr.name == item;
            });
            if (!hed) return undefined;
            obj.push({id: hed.id});
        });
        return obj;
    }

    fillDto(header, entry) {
        let dto = {};
        header.forEach((col, i, arr) => {
            let tmp = col.trim();
            tmp = tmp.replace(/\s+/g, '');
            tmp = tmp.toLowerCase();
            arr[i] = tmp;
        });
        entry.map((col, i) => {
            dto[header[i]] = col;
            dto['category'] = this.filename.split('.')[0];
        });

        return dto;
    }


    back(e) {
        e.preventDefault();
        this.context.router.push('/');
    }

    render() {
        var self = this;
        return (
            <div>
                <Popup ref="popup"/>
                <AppBar className="mui--text-light mui--text-display3 mui--text-center">IMPORT</AppBar>
                <Container className="form-import">
                    <Form>
                        <div className="file_upload">
                            <input type="file" id="file" onChange={self.fileInputChanged.bind(self)}/>
                            <div id="label_file_upload">Select file</div>
                        </div>
                        <Button variant="raised" onClick={self.process.bind(self)}>Run</Button>
                        <Button variant="raised" onClick={self.back.bind(self)}>Back</Button>
                    </Form>
                    <div className="import-data-table">
                        {self.items}
                    </div>
                </Container>
            </div>
        );
    }
}

Import.contextTypes = {
    router: React.PropTypes.object
};