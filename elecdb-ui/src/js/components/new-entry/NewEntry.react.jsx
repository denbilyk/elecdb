import React from "react";
import "./NewEntry.styl";
import tpl from "./NewEntry.jsx";
import DataTableApi from "../../actions/DataTableApi.jsx";
import DataTableStore from "../../store/DataTableStore.jsx";


export default class NewEntry extends React.Component {

    constructor(props) {
        super(props);
        String.prototype.isNumber = function () {
            return /^\d+$/.test(this);
        };
        this.header_skip = ["Part Number", "Category", "Quantity", "Published"];
        this.header = [];
        this.categories = [];
        this.form = {quantity: '0', addFields: []};
    }

    componentWillMount() {
        this.categoriesLoadListener = this.updateCategories.bind(this);
        DataTableStore.addCategoriesLoadListener(this.categoriesLoadListener);
        this.detailsLoadListener = this.onHeaderLoad.bind(this);
        DataTableStore.addHeaderReloadListener(this.detailsLoadListener);
    }

    componentDidMount() {
        this.popupSystem = this.refs.popup;
        DataTableApi.getCategories();
        DataTableApi.getTableHeader();
    }

    componentWillUnmount() {
        DataTableStore.removeCategoriesLoadListener(this.categoriesLoadListener);
        DataTableStore.removeHeaderReloadListener(this.detailsLoadListener);
    }

    onHeaderLoad() {
        let header = DataTableStore.getHeader();
        Object.keys(header).forEach(key => {
            if (this.header_skip.indexOf(header[key].name) != -1) return;
            this.header.push(header[key]);
        });
        this.setState({header: this.header});
    }

    updateCategories() {
        this.categories = DataTableStore.getCategories();
        this.setState({categories: this.categories});
    }


    back() {
        this.context.router.push('/');
    }

    submit(e) {
        e.preventDefault();
        let valid = true;
        if (!this.form.part || this.form.part.length < 2) {
            this.popupSystem.err("Part Number is invalid!", 5);
            valid = false;
        }
        if (!this.form.category || this.form.category.length != 1) {
            this.popupSystem.err("Category is invalid!", 5);
            valid = false;
        }
        if (!this.form.quantity || !this.form.quantity.isNumber()) {
            this.popupSystem.err("Quantity should be a number!", 5);
            valid = false;
        }

        if (valid) {
            DataTableApi.sendNewEntry(this.form);
            this.back();
        }
    }

    onAddField(e) {
        let id = e.target.getAttribute('data-id');
        let header = this.header.filter(obj => {
            return obj.id == id;
        });

        this.form.addFields.push(header[0]);
        this.header = this.header.filter(item => {
            return item.id !== parseInt(id);
        });
        this.setState({header: this.header});
    }

    inputChanged(e) {
        switch (e.target.name) {
            case "part":
                this.form.part = e.target.value;
                break;
            case "quantity":
                this.form.quantity = e.target.value;
                break;
            default:
                this.form.addFields.filter(obj => {
                    return obj.id == e.target.name;
                })[0].value = e.target.value;
        }
    }

    selectChanged(e) {
        this.form.category = e;
    }

    render() {
        return tpl(this);
    }
}

NewEntry.contextTypes = {
    router: React.PropTypes.object
};