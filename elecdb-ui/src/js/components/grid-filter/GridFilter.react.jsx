import React from "react";
import "./GridFilter.styl";
import tpl from "./GridFilter.jsx";
import AppDispatcher from "../../actions/AppDispatcher.jsx";
import DataTableApi from "../../actions/DataTableApi.jsx";
import VGrid from "../var-grid/VGrid.react.jsx";


export default class GridFilter extends React.Component {

    constructor(props) {
        super(props);

        this.filterParams = {
            part: true,
            category: true,
            description: true,
            properties: true,
            quantity: true,
            symbol: true,
            footprint: true,
        };

        this.vgrid = this.props.table;
    }

    componentDidMount() {
        this.applyFilter();

    }

    render() {
        return tpl(this);
    }

    applyFilter() {
        //AppDispatcher.dispatch(AppDispatcher.KEYS.UPDATE_FILTER, this.filterParams);
    }
    
    

    inputChanged(e) {
        this.vgrid.inputChanged(e);
        switch (e.target.name) {
            case "part":
                this.filterParams.part = e.target.checked;
                break;
            case "category":
                this.filterParams.category = e.target.checked;
                break;
            case "description":
                this.filterParams.description = e.target.checked;
                break;
            case "properties":
                this.filterParams.properties = e.target.checked;
                break;
            case "quantity":
                this.filterParams.quantity = e.target.checked;
                break;
            case "symbol":
                this.filterParams.symbol = e.target.checked;
                break;
            case "footprint":
                this.filterParams.footprint = e.target.checked;
                break;
        }
    }
}