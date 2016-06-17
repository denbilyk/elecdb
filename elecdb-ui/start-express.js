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

    app.get('/header', function (request, response) {
        console.log("got header table");
        response.json(table);
    });

    var server = app.listen(4001, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Express listening at http://%s:%s", host, port);

    });


    table = {
        header: [
            {
                id: 1,
                name: "Part Number",
                show: true
            },
            {
                id: 2,
                name: "Category",
                show: true
            },
            {
                id: 3,
                name: "Library Ref",
                show: false
            }
        ],
        rows: [
            [
                {
                    value: "74HCT04",
                    header_id: 1
                },
                {
                    value: "ICs",
                    header_id: 2
                },
                {
                    value: "sch/ICs.schLib",
                    header_id: 3
                }
            ],
            [
                {
                    value: "74HCT393",
                    header_id: 1
                },
                {
                    value: "ICs",
                    header_id: 2
                },
                {
                    value: "sch/ICs.schLib",
                    header_id: 3
                }
            ]
        ]
    };
};

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9001');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}