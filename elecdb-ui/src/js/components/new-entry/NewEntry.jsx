import React from "react";
import Utils from '../../Utils.jsx';
import Container from "muicss/lib/react/container";
import Col from "muicss/lib/react/col";
import Row from "muicss/lib/react/row";
import Checkbox from "muicss/lib/react/checkbox";
import Panel from "muicss/lib/react/panel";
import Button from "muicss/lib/react/button";
import AppBar from "muicss/lib/react/appbar";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Textarea from "muicss/lib/react/textarea";
import Select from "muicss/lib/react/select";
import Option from "muicss/lib/react/option";

export default (context) => {
    let self = context;
    return (
        <div className="div-form-new">
            <AppBar className="mui--text-light mui--text-display2 mui--text-center">NEW ENTRY</AppBar>
            <Container className="form-new">
                <div className="popup-info">{self.valid.info}</div>
                <div className="popup-warn">{self.valid.warn}</div>
                <div className="popup-error">{self.valid.err}</div>
                <Panel>
                    <Form>
                        <Input label="Part Number" required={true} floatingLabel={true} name="part"
                               onChange={self.inputChanged.bind(self)}/>
                        <Select name="category" defaultValue="" required onChange={self.selectChanged.bind(self)}>
                            <Option value="" label="Select..."/>);
                            {self.categories.map((category) => {
                                return (
                                    <Option value={category.id.toString()} label={category.name} key={Utils.id()}/>);
                            })}
                        </Select>
                        <Textarea name="description" label="Description" floatingLabel={true}
                                  onChange={self.inputChanged.bind(self)}/>
                        <Input name="properties" label="Properties" floatingLabel={true}
                               onChange={self.inputChanged.bind(self)}/>
                        <Input name="quantity" label="Quantity" floatingLabel={true}
                               onChange={self.inputChanged.bind(self)}/>
                        <Input name="symbol" label="Symbol" floatingLabel={true}
                               onChange={self.inputChanged.bind(self)}/>
                        <Input name="footprint" label="Footprint" floatingLabel={true}
                               onChange={self.inputChanged.bind(self)}/>
                        <Button variant="raised" onClick={self.back.bind(self)}>Back</Button>
                        <Button variant="raised" onClick={self.submit.bind(self)}>Submit</Button>
                    </Form>

                </Panel>
            </Container>
        </div>

    )
}