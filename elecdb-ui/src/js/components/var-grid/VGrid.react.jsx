import React from "react";
import "./VGrid.styl";
import tpl from "./VGrid.jsx";
import DataTableApi from "../../actions/DataTableApi";
import DataTableStore from "../../store/DataTableStore";
import "colResizable-1.6";


export default class VGrid extends React.Component {

    constructor(props) {
        super(props);
        this.items = {};
        this.items.header = [];
        this.items.rows = [];
    }

    componentDidMount() {
        DataTableApi.getTableHeader();
    }

    componentWillMount() {
        this.loadHeaderListener = this.headerReload.bind(this);
        this.loadDataListener = this.reloadData.bind(this);
        DataTableStore.addHeaderReloadListener(this.loadHeaderListener);
        DataTableStore.addDataReloadListener(this.loadDataListener);

    }

    componentWillUnmount() {
        DataTableStore.removeHeaderReloadListener(this.loadHeaderListener);
        DataTableStore.removeDataReloadListener(this.loadDataListener);
    }

    addTableResizer() {
        $(function () {
            $("#data-table").colResizable({
                liveDrag: true,
                resizeMode: 'overflow',
                draggingClass: "dragging",
            });
        });
    }


    headerReload() {
        var table = DataTableStore.getHeader();
        try {
            this.items.header = table;    //[{id: '', name:'', show: ''}]
            this.items.header.sort((a, b) => {
                return a.id > b.id ? 1 : a.id == b.id ? 0 : -1;
            });
            this.setState({header: this.items.header});
        } catch (Error) {
            console.error("VGrid Reload Error!", Error);
            return true;
        }
        DataTableApi.getTableData();
    }


    reloadData() {
        var table = DataTableStore.getData();
        try {
            this.items.rows = table; //[[{header_id:'', value: ''},{},{}],[]]
            this.items.rows.map(row => {
                row.sort((a, b) => {
                    return a.header_id > b.header_id ? 1 : a.header_id == b.header_id ? 0 : -1;
                })
            });
            this.setState({data: this.items.rows});
            //this.addTableResizer();
        } catch (Error) {
            console.error("VGrid Reload Error!", Error);
            return true;
        }
    }

    isHeaderShown(id) {
        return this.items.header.find((curr) => {
            return curr.id == id;
        }).show;
    }


    applyColumnFilter(id, state) {
        let hed_id = parseInt(id.substring(id.lastIndexOf('-') + 1));
        var obj = this.items.header.find(curr => {
            return curr.id == hed_id;
        });
        obj.show = state;
        this.setState({header: this.items.header});
    }

    render() {
        return tpl(this);
    }
}