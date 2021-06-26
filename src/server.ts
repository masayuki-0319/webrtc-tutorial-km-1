import ws from 'ws';

const webSocketServer = ws.Server;

const wss = new webSocketServer({ port: 9090 });

wss.on('connection', (conn) => {
  console.log('User connected!');

  conn.on('message', (message) => {});

  conn.on('close', (message) => {
    console.log('User Connection close...');
  });
});

const sendToOtherUser = (connection: ws, message: string) => {
  connection.send(JSON.stringify(message));
};
