import "./Details.styl";
import React from "react";
import Utils from "../../Utils.jsx";
import Container from "muicss/lib/react/container";
import AppBar from "muicss/lib/react/appbar";
import Popup from "../popup/Popup.react";
import Button from "muicss/lib/react/button";
import DataTableApi from "../../actions/DataTableApi.jsx";
import DataTableStore from "../../store/DataTableStore.jsx";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";

export default class Details extends React.Component {


    constructor(props) {
        super(props);
        String.prototype.isNumber = function () {
            return /^\d+$/.test(this);
        };
        this.header_skip = ["Part Number", "Category", "Published"];
        this.item = [];
        this.form = {quantity: '0', addFields: []};
    }

    componentWillMount() {
        this.detailsLoadListener = this.onDetailsLoad.bind(this);
        DataTableStore.addDetailsReloadListener(this.detailsLoadListener);
    }

    componentWillUnmount() {
        DataTableStore.removeDetailsReloadListener(this.detailsLoadListener);
    }

    componentDidMount() {
        this.popupSystem = this.refs.popup;
        let part = this.props.location.state.part;
        if (part)
            DataTableApi.getDetails(part);
    }

    onDetailsLoad() {
        let details = DataTableStore.getDetails();
        let idx = [];

        details.map((cell, i) => {
            if (this.header_skip.indexOf(cell.name) != -1)
                idx.push(i);
        });

        idx.map((idx, i) => {
            details.splice(idx - i, 1);
        });

        this.item = details;
        this.setState({details: this.item});
    }

    inputChanged(id, e) {
        this.item.find(curr => {
            return curr.id == id;
        }).value = e.target.value;
    }

    deleteRecord() {
        let part = this.props.location.state.part;
        if (!part)
            this.popupSystem.warn("Can not get part number!");
        else {
            DataTableApi.deleteRecord(part);
            this.back();
        }
    }

    save() {
        let value = this.item.find(curr => {
            return curr.id == 3;
        }).value;
        let isNumber = true;
        if (typeof(value) == 'string')  isNumber = value.isNumber();
        if (isNumber) {
            this.item = {partNumber: this.props.location.state.part, fields: this.item};
            DataTableApi.updateDetails(this.item);
            this.back();
        }
        else
            this.popupSystem.warn("Quantity should be a number!");
    }

    back() {
        this.context.router.push("/");
    }

    render() {
        let self = this;
        return (
            <div>
                <AppBar className="mui--text-light mui--text-display2 mui--text-center">DETAILS</AppBar>
                <Popup ref="popup"/>
                <Container>
                    <Form className="form-details">
                        {self.item.map((item, i) => {
                            return (
                                <div key={Utils.id()}>
                                    <div className="input-float">
                                        <Input name={item.id} label={item.name}
                                               floatingLabel={true} key={Utils.id()}
                                               onChange={self.inputChanged.bind(self, item.id)}
                                               defaultValue={item.value?item.value:''}/>
                                    </div>
                                    {((i + 1) % 3 == 0) ? (<div className="clear"></div>) : (null)}
                                </div>
                            );
                        })}
                    </Form>
                    <Button variant="raised" className="mui-btn--primary" onClick={self.save.bind(self)}>Save</Button>
                    <Button variant="raised" onClick={self.back.bind(self)}>Back</Button>
                    <Button variant="raised" className="mui-btn--danger"
                            onClick={self.deleteRecord.bind(self)}>Delete</Button>
                </Container>
            </div>
        )
    }
}


Details.contextTypes = {
    router: React.PropTypes.object
};
