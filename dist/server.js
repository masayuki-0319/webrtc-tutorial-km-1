"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var webSocketServer = ws_1.default.Server;
var wss = new webSocketServer({ port: 9090 });
wss.on('connection', function (conn) {
    console.log('User connected!');
    conn.on('message', function (message) { });
    conn.on('close', function (message) {
        console.log('User Connection close...');
    });
    conn.send('hello world');
});
var sendToOtherUser = function (connection, message) {
    connection.send(JSON.stringify(message));
};
