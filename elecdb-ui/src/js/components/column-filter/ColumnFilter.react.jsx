import React from "react";
import "./ColumnFilter.styl";
import Row from "muicss/lib/react/row";
import Col from "muicss/lib/react/col";
import Container from "muicss/lib/react/container";
import Checkbox from "muicss/lib/react/checkbox";
import Panel from "muicss/lib/react/panel";
import DataTableApi from "../../actions/DataTableApi";
import DataTableStore from "../../store/DataTableStore";
import Utils from "../../Utils";

export default class ColumnFilter extends React.Component {

    constructor(props) {
        super(props);
        this.header = [];
        this.table = {};
    }


    componentWillMount() {
        this.loadHeaderListener = this.headerReload.bind(this);
        DataTableStore.addHeaderReloadListener(this.loadHeaderListener);
    }

    componentWillUnmount() {
        DataTableStore.removeHeaderReloadListener(this.loadHeaderListener);
    }


    componentDidMount() {
        DataTableApi.getTableHeader();
        this.table = this.props.table;
    }


    headerReload() {
        this.header = DataTableStore.getHeader();
        this.setState({columnFilter: this.header});

    }

    inputChanged(e) {
        e.preventDefault();
        this.table.applyColumnFilter(e.target.name, e.target.checked);
    }


    render() {
        var self = this;
        return (
            <Container className="filter-container">
                <Row>
                    <Col md="4">
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
                    </Col>
                </Row>
            </Container>
        );
    }
}