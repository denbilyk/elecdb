import React from "react";
import "./VGrid.styl";
import tpl from "./VGrid.jsx";
import DataTableApi from "../../actions/DataTableApi.jsx";
import DataTableStore from "../../store/DataTableStore.jsx";

export default class VGrid extends React.Component {

    constructor(props) {
        super(props);

        this.items = {};
        this.items.rows = [];
        this.items.filter = {
            part: true,
            category: true,
            description: true,
            properties: true,
            quantity: true,
            symbol: true,
            footprint: true,
        };
    }

    componentDidMount() {
        console.log("VGrid mount");
        DataTableApi.getTableData();
    }

    componentWillMount() {
        this.reloadDataListener = this.reloadData.bind(this);
        DataTableStore.addDataReloadListener(this.reloadDataListener);

    }

    componentWillUnmount() {
        DataTableStore.removeDataReloadListener(this.reloadDataListener);
    }

    reloadData() {
        var data = DataTableStore.getData();
        this.items.rows = data;
        this.updateItems(data);
    }

    onEdit() {
        console.log("onEdit");
    }

    updateItems(items) {
        this.setState({
            table: items
        });
    }

    inputChanged(e) {
        switch (e.target.name) {
            case "part":
                this.items.filter.part = e.target.checked;
                this.updateItems(this.items);
                break;
            case "category":
                this.items.filter.category = e.target.checked;
                this.updateItems(this.items);
                break;
            case "description":
                this.items.filter.description = e.target.checked;
                this.updateItems(this.items);
                break;
            case "properties":
                this.items.filter.properties = e.target.checked;
                this.updateItems(this.items);
                break;
            case "quantity":
                this.items.filter.quantity = e.target.checked;
                this.updateItems(this.items);
                break;
            case "symbol":
                this.items.filter.symbol = e.target.checked;
                this.updateItems(this.items);
                break;
            case "footprint":
                this.items.filter.footprint = e.target.checked;
                this.updateItems(this.items);
                break;
        }
    }


    render() {
        return tpl(this);
    }

}