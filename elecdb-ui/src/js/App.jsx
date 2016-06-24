import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory} from "react-router";
import "../styles/main.styl";
import "font-awesome-stylus";
import DataTable from "./components/data-table/DataTable.jsx";
import NewEntry from "./components/new-entry/NewEntry.react.jsx";
import Import from "./components/import/Import.react.jsx";

render((
    <Router history={hashHistory}>
        <Route path="/" component={DataTable}/>
        <Route path="/add" component={NewEntry}/>
        <Route path="/import" component={Import}/>
    </Router>
), document.getElementById('content'));