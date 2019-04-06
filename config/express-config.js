const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


module.exports = function(){
    var app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.json({ type: 'application/*+json' }))
    app.use(expressValidator())

    app.use(express.static('app'));


    consign().include('routers').into(app);
    return app;
}