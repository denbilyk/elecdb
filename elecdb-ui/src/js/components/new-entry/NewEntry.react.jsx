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
        this.categories = [];
        this.form = {};
        this.valid = {};
    }

    componentWillMount() {
        this.categoriesLoadListener = this.updateCategories.bind(this);
        DataTableStore.addCategoriesLoadListener(this.categoriesLoadListener);
    }

    componentDidMount() {
        DataTableApi.getCategories();
    }

    componentWillUnmount() {
        DataTableStore.removeCategoriesLoadListener(this.categoriesLoadListener);
        
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
        this.valid.err = "";
        if (!this.form.part || this.form.part.length < 2) {
            this.valid.err = "Part Number is invalid!   ";
            valid = false;
        }
        if (!this.form.category || this.form.category.length != 1) {
            this.valid.err += "Category is invalid!     ";
            valid = false;
        }
        if (!this.form.quantity || !this.form.quantity.isNumber()) {
            this.valid.err += "Quantity should be a number! ";
            valid = false;
        }

        if (valid) {
            DataTableApi.sendNewEntry(this.form);
            this.back();
        }
        this.setState({validation: this.valid});
    }

    inputChanged(e) {
        switch (e.target.name) {
            case "part":
                this.form.part = e.target.value;
                break;
            case "description":
                this.form.description = e.target.value;
                break;
            case "properties":
                this.form.properties = e.target.value;
                break;
            case "quantity":
                this.form.quantity = e.target.value;
                break;
            case "symbol":
                this.form.symbol = e.target.value;
                break;
            case "footprint":
                this.form.footprint = e.target.value;
                break;
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