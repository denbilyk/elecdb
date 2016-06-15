import React from "react";
import Container from "muicss/lib/react/container";
import Col from "muicss/lib/react/col";
import Row from "muicss/lib/react/row";
import Checkbox from "muicss/lib/react/checkbox";
import Panel from "muicss/lib/react/panel";
import Button from "muicss/lib/react/button";


export default (context) => {
    let self = context;
    return (
        <Container className="filter-container">
            <Row>
                <Col md="4">
                    <Panel className="filter-panel">
                        Columns
                        <Checkbox name="part" label="Part Number" defaultChecked={true} onChange = {self.inputChanged.bind(self)}/>
                        <Checkbox name="category" label="Category" defaultChecked={true} onChange = {self.inputChanged.bind(self)}/>
                        <Checkbox name="description" label="Description" defaultChecked={true} onChange = {self.inputChanged.bind(self)}/>
                        <Checkbox name="properties" label="Properties" defaultChecked={true} onChange = {self.inputChanged.bind(self)}/>
                        <Checkbox name="quantity" label="Quantity" defaultChecked={true} onChange = {self.inputChanged.bind(self)}/>
                        <Checkbox name="symbol" label="Symbol" defaultChecked={true} onChange = {self.inputChanged.bind(self)}/>
                        <Checkbox name="footprint" label="Footprint" defaultChecked={true} onChange = {self.inputChanged.bind(self)}/>
                        <Button id="btn_filter_apply" onClick={self.applyFilter.bind(self)}>Apply</Button>
                    </Panel>
                </Col>
            </Row>
        </Container>
    );
}