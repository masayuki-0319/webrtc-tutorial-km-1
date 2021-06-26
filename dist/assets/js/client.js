"use strict";
// MEMO: Global Variables
var local_name;
var connectedUser;
var url_string = window.location.href;
var url = new URL(url_string);
var username = url.searchParams.get('username');
var local_video = document.querySelector('#local-video');
// MEMO: Listen WebSocket server
var connection = new WebSocket('ws://localhost:9090');
connection.onopen = function () {
    console.log('Connected to the server');
};
connection.onmessage = function (msg) {
    var data = JSON.parse(msg.data);
    switch (data.type) {
        case 'login':
            loginProcess(data.success);
            break;
    }
};
connection.onerror = function (error) {
    console.error(error);
};
// MEMO: server functions
var loginProcess = function (success) {
    if (success === false) {
        alert('Try a different username');
    }
    else {
        getUserMedia();
    }
};
var getUserMedia = function () {
    navigator.getUserMedia({ audio: true, video: true }, function (myStream) {
        local_video.srcObject = myStream;
    }, function (error) {
        console.error(error);
    });
};
// MEMO: User Login
var sendMessage = function () {
    if (connection.readyState === 1) {
        if (username === null)
            return;
        local_name = username;
        if (local_name.length > 0) {
            send({
                type: 'login',
                name: local_name,
            });
        }
    }
    else {
        console.log('Connection has not establish');
    }
};
var send = function (message) {
    if (connectedUser) {
        message.name = connectedUser;
    }
    connection.send(JSON.stringify(message));
};
setTimeout(function () {
    if (connection.readyState === 1)
        return;
    sendMessage();
}, 5000);
