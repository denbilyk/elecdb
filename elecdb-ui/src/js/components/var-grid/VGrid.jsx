import React from 'react';
import Utils from '../../Utils.jsx';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from "muicss/lib/react/container";
import Checkbox from "muicss/lib/react/checkbox";
import Panel from "muicss/lib/react/panel";
import Button from "muicss/lib/react/button";

export default (context)=> {
    let filter = context.items.filter;
    let self = context;
    return (
        <div>
            <Container className="filter-container">
                <Row>
                    <Col md="4">
                        <Panel className="filter-panel">
                            Columns
                            <Checkbox name="part" label="Part Number" defaultChecked={true}
                                      onChange={self.inputChanged.bind(self)}/>
                            <Checkbox name="category" label="Category" defaultChecked={true}
                                      onChange={self.inputChanged.bind(self)}/>
                            <Checkbox name="description" label="Description" defaultChecked={true}
                                      onChange={self.inputChanged.bind(self)}/>
                            <Checkbox name="properties" label="Properties" defaultChecked={true}
                                      onChange={self.inputChanged.bind(self)}/>
                            <Checkbox name="quantity" label="Quantity" defaultChecked={true}
                                      onChange={self.inputChanged.bind(self)}/>
                            <Checkbox name="symbol" label="Symbol" defaultChecked={true}
                                      onChange={self.inputChanged.bind(self)}/>
                            <Checkbox name="footprint" label="Footprint" defaultChecked={true}
                                      onChange={self.inputChanged.bind(self)}/>
                        </Panel>
                    </Col>
                </Row>
            </Container>
            <div className="vgrid-container">
                <Row key={Utils.id()} className="row-header">
                    <Col md="2" hidden={!filter.part | false}>Part Number</Col>
                    <Col md="1" hidden={!filter.category | false}>Category</Col>
                    <Col md="3" hidden={!filter.description | false}>Description</Col>
                    <Col md="1" hidden={!filter.properties | false}>Properties</Col>
                    <Col md="1" hidden={!filter.quantity | false}>Quantity</Col>
                    <Col md="2" hidden={!filter.symbol | false}>Symbol</Col>
                    <Col md="2" hidden={!filter.footprint | false}>Footprint</Col>
                </Row>
                {context.items.rows.map((row, i) => {
                    return (
                        <Row key={Utils.id()} className={i % 2 == 0 ? "" : "row-odd"}>
                            <Col key={Utils.id()} md="2" hidden={!filter.part | false} className="data-col row-divider">
                                <Button
                                    variant="fab"
                                    color="primary"
                                    className="btn-edit mui--pull-right"
                                >e</Button>
                                {row.part}
                            </Col>
                            <Col key={Utils.id()}
                                 md="1"
                                 hidden={!filter.category | false}
                                 className="data-col row-divider">
                                <Button variant="fab" color="primary" className="btn-edit mui--pull-right">e</Button>
                                {row.category.name}</Col>
                            <Col key={Utils.id()} md="3" hidden={!filter.description | false}
                                 className="data-col row-divider">
                                <Button variant="fab" color="primary" className="btn-edit mui--pull-right">e</Button>
                                {row.description}</Col>
                            <Col key={Utils.id()} md="1" hidden={!filter.properties | false}
                                 className="data-col row-divider">
                                <Button variant="fab" color="primary" className="btn-edit mui--pull-right">e</Button>
                                {row.properties}</Col>
                            <Col key={Utils.id()} md="1" hidden={!filter.quantity | false}
                                 className="data-col row-divider">
                                <Button variant="fab" color="primary" className="btn-edit mui--pull-right">–</Button>
                                <Button variant="fab" color="primary" className="btn-edit mui--pull-right">+</Button>
                                {row.quantity}</Col>
                            <Col key={Utils.id()} md="2" hidden={!filter.symbol | false}
                                 className="data-col row-divider">
                                <Button variant="fab" color="primary" className="btn-edit mui--pull-right">e</Button>
                                {row.symbol}</Col>
                            <Col key={Utils.id()} md="2" hidden={!filter.footprint | false}
                                 className="data-col row-divider">
                                <Button variant="fab" color="primary" className="btn-edit mui--pull-right">e</Button>
                                {row.footprint}</Col>
                        </Row>
                    );
                })}
            </div>
        </div>
    );

}

