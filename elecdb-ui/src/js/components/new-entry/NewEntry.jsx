import React from "react";
import Utils from "../../Utils.jsx";
import Container from "muicss/lib/react/container";
import Panel from "muicss/lib/react/panel";
import Button from "muicss/lib/react/button";
import AppBar from "muicss/lib/react/appbar";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Select from "muicss/lib/react/select";
import Option from "muicss/lib/react/option";
import Popup from "../popup/Popup.react";

export default (context) => {
    let self = context;
    return (
        <div className="div-form-new">
            <AppBar className="mui--text-light mui--text-display2 mui--text-center">NEW ENTRY</AppBar>
            <Popup ref="popup" />
            <Container className="form-new">
                <Panel className="panel-form">
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
                        <Input name="quantity" label="Quantity" floatingLabel={true} defaultValue="0"
                               onChange={self.inputChanged.bind(self)}/>
                        {self.form.addFields.map(item => {
                            return (
                                <Input name={item.id} label={item.name} floatingLabel={true} key={Utils.id()}
                                       onChange={self.inputChanged.bind(self)} defaultValue={item.value?item.value:''}/>
                            );
                        })}
                        <Button variant="raised" onClick={self.back.bind(self)}>Back</Button>
                        <Button variant="raised" onClick={self.submit.bind(self)}>Submit</Button>
                    </Form>

                </Panel>
                <div className="additional-fields">
                    <ul>
                        {self.header.map(item => {
                            return (
                                <li data-id={item.id} key={Utils.id()}
                                    onClick={self.onAddField.bind(self)}>{item.name}</li>
                            );
                        })}
                    </ul>
                    <div className="clear"/>
                </div>
            </Container>

        </div>

    )
}