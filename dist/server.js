"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var webSocketServer = ws_1.default.Server;
var wss = require('ws')({ port: 9090 }).Server;
// const wss = new webSocketServer({ port: 9090 });
console.log('wss', wss);
var users = {};
wss.on('connection', function (conn) {
    console.log('User connected!');
    conn.on('message', function (message) {
        var data;
        try {
            data = JSON.parse(message);
        }
        catch (e) {
            console.error(e, 'Invalide SON');
            data = null;
        }
        if (data === null)
            return;
        switch (data.type) {
            case 'login':
                if (users[data.name]) {
                    sendToOtherUser(conn, {
                        type: 'login',
                        success: false,
                    });
                }
                else {
                    users[data.name] = conn;
                    // conn.name = data.name;
                    console.log('conn', conn);
                    sendToOtherUser(conn, {
                        type: 'login',
                        success: true,
                    });
                }
                break;
        }
    });
    conn.on('close', function (message) {
        console.log('User Connection close...');
    });
    conn.send('hello world');
});
var sendToOtherUser = function (connection, message) {
    connection.send(JSON.stringify(message));
};
