import React from "react";
import "./ColumnFilter.styl";
import Row from "muicss/lib/react/row";
import Container from "muicss/lib/react/container";
import Checkbox from "muicss/lib/react/checkbox";
import Panel from "muicss/lib/react/panel";
import DataTableApi from "../../actions/DataTableApi";
import DataTableStore from "../../store/DataTableStore";
import Utils from "../../Utils";
import $ from "jquery";

export default class ColumnFilter extends React.Component {

    constructor(props) {
        super(props);
        this.header = [];
        this.categories = [];
        this.table = {};
    }


    componentWillMount() {
        this.loadHeaderListener = this.headerReload.bind(this);
        this.loadCategoriesListener = this.categoriesReload.bind(this);
        DataTableStore.addHeaderReloadListener(this.loadHeaderListener);
        DataTableStore.addCategoriesLoadListener(this.loadCategoriesListener);
    }

    componentWillUnmount() {
        DataTableStore.removeHeaderReloadListener(this.loadHeaderListener);
        DataTableStore.removeCategoriesLoadListener(this.loadCategoriesListener);
    }


    componentDidMount() {
        DataTableApi.getTableHeader();
        DataTableApi.getCategories();
        this.table = this.props.table;
        this.registerNatives();
    }


    registerNatives() {
        $('#category-filter').click(() => {
            $('.category-content').toggle();
        });
    }

    headerReload() {
        this.header = DataTableStore.getHeader();
        this.setState({columnFilter: this.header});

    }

    categoriesReload() {
        this.categories = DataTableStore.getCategories();
        this.setState({categoryFilter: this.categories})
    }

    inputChanged(e) {
        e.preventDefault();
        this.table.applyColumnFilter(e.target.name, e.target.checked);
    }

    categoryChanged(e) {
        e.preventDefault();
        let cat_name = e.target.name;
        let show = e.target.checked;
        let id = parseInt(cat_name.substring(cat_name.lastIndexOf('-') + 1));
        this.categories.find(curr => {
            return curr.id == id;
        }).show = show;
        this.setState({categoryFilter: this.categories});
        this.table.applyCategoryFilter(this.categories);
    }

    render() {
        var self = this;
        return (
            <Container className="filter-container">
                <Row>

                    <Panel className="filter-panel">
                        Columns
                        {self.header.map((item, i) => {
                            return (
                                <div key={Utils.id()}>
                                    <Checkbox name={"col-fil-" + item.id} label={item.name}
                                              defaultChecked={item.show}
                                              onChange={self.inputChanged.bind(self)} key={Utils.id()}/>
                                    <div className={(i%3==0) ? 'clear' :' '}/>
                                </div>
                            )
                        })}
                    </Panel>

                    <Panel id="category-filter">
                        Category
                    </Panel>
                    <div className="category-content">
                        {self.categories.map(item => {
                            return (
                                <Checkbox name={"cat-fil-" + item.id} label={item.name} className="category-chb"
                                          defaultChecked={item.show === undefined ? true : item.show}
                                          onChange={self.categoryChanged.bind(self)} key={Utils.id()}/>
                            )
                        })}
                        <div className="clear"/>
                    </div>
                </Row>
            </Container>
        );
    }
}