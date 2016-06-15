var express = require('express');
var bodyParser = require('body-parser');

module.exports = function setupExpress() {
    var app = express();
    app.use(bodyParser());
    app.use(allowCrossDomain);

    app.get('/data', function (request, response) {
        console.log("got data table");
        response.json(dataTable);
    });

    var server = app.listen(4001, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Express listening at http://%s:%s", host, port);

    });

    dataTable = {
        rows: [
            {
                part: "aaa",
                category: "active",
                description: "descr",
                properties: "props",
                quantity: 10,
                symbol: "nmos",
                footprint: "to-220"
            },
            {
                part: "bbb",
                category: "conn",
                description: "descr2",
                properties: "props",
                quantity: 5,
                symbol: "nmos",
                footprint: "to-220-a"
            },

            {
                part: "ccc",
                category: "ics",
                description: "descr3",
                properties: "props",
                quantity: 15,
                symbol: "nmos",
                footprint: "to-220-a"
            },
        ]
    };

};

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9001');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}