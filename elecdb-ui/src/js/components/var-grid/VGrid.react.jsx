import React from "react";
import "./VGrid.styl";
import tpl from "./VGrid.jsx";
import DataTableApi from "../../actions/DataTableApi";
import DataTableStore from "../../store/DataTableStore";
import "colResizable-1.6";
import mui from "muicss";


export default class VGrid extends React.Component {

    constructor(props) {
        super(props);
        const s = "<i class='fa fa-spinner fa-pulse fa-10x fa-fw'></i>";
        this.loadingEl = document.createElement('div');
        this.loadingEl.className = 'loading';
        this.loadingEl.innerHTML = s;
        this.items = {};
        this.items.header = [];
        this.items.rows = [];
    }

    componentDidMount() {
        DataTableApi.getTableHeader();
        mui.overlay('on', {'static': true}, this.loadingEl);
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
            this.setState({header: this.items.header});
        } catch (Error) {
            console.error("VGrid Reload Error!", Error);
            return true;
        }
        DataTableApi.getTableData(this.items.header);
    }


    reloadData() {
        var table = DataTableStore.getData();
        try {
            this.items.rows = table; //[[{header_id:'', value: ''},{},{}],[]]
            this.setState({data: this.items.rows});
            //this.addTableResizer();
            mui.overlay('off');
        } catch (Error) {
            console.error("VGrid Reload Error!", Error);
            return true;
        }
    }


    applyColumnFilter(id, state) {
        let hed_id = parseInt(id.substring(id.lastIndexOf('-') + 1));
        var obj = this.items.header.find(curr => {
            return curr.id == hed_id;
        });
        obj.show = state;
        this.setState({header: this.items.header});
        DataTableApi.getTableData(this.items.header);
    }

    render() {
        return tpl(this);
    }
}