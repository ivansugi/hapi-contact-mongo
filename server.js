'use strict';
var Hapi = require('hapi'),
    Routes = require('./routes'),
    config = require('./config'),
    Db = require('./database');
var corsHeaders = require('hapi-cors-headers')
const server = new Hapi.Server();  



server.connection({  
    host: config.server.host,
    port: config.server.port
});
server.ext('onPreResponse', corsHeaders)
server.route(Routes.endpoints);
server.start(function() {
    console.log('Server started ', server.info.uri);
});