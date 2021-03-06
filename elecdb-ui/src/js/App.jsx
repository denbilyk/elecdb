import React from "react";
import {render} from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import "../styles/main.styl";
import "font-awesome-stylus";
import DataTable from "./components/data-table/DataTable.jsx";
import NewEntry from "./components/new-entry/NewEntry.react.jsx";
import Import from "./components/import/Import.react.jsx";
import Details from "./components/details/Details.react";
import Landing from "./components/landing/LoginPage.react";

render((
    <Router history={hashHistory}>
        <Route path="/" component={Landing}/>
        <Route path="/list" component={DataTable}/>
        <Route path="/add" component={NewEntry}/>
        <Route path="/import" component={Import}/>
        <Route path="/details" component={Details}/>
    </Router>
), document.getElementById('content'));