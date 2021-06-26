import ws from 'ws';

const webSocketServer = ws.Server;

const wss = require('ws')({ port: 9090 }).Server as ws.Server;
// const wss = new webSocketServer({ port: 9090 });
console.log('wss', wss);
let users: { [key: string]: any } = {};
wss.on('connection', (conn) => {
  console.log('User connected!');

  conn.on('message', (message) => {
    let data: SendMessage | null;

    try {
      data = JSON.parse(message as any);
    } catch (e) {
      console.error(e, 'Invalide SON');
      data = null;
    }

    if (data === null) return;
    switch (data.type) {
      case 'login':
        if (users[data.name]) {
          sendToOtherUser(conn, {
            type: 'login',
            success: false,
          });
        } else {
          users[data.name] = conn;
          console.log('conn', conn);

          sendToOtherUser(conn, {
            type: 'login',
            success: true,
          });
        }
        break;
    }
  });

  conn.on('close', (message) => {
    console.log('User Connection close...');
  });

  conn.send('hello world');
});

const sendToOtherUser = (connection: ws, message: ReturnMessage) => {
  connection.send(JSON.stringify(message));
};
