// MEMO: Global Variables
let local_name: string;
let connectedUser: string;
const url_string = window.location.href;
const url = new URL(url_string);
const username = url.searchParams.get('username');
const local_video = document.querySelector('#local-video') as HTMLVideoElement;

// MEMO: Listen WebSocket server
const connection = new WebSocket('ws://localhost:9090');
connection.onopen = () => {
  console.log('Connected to the server');
};

connection.onmessage = (msg) => {
  const data = JSON.parse(msg.data) as ReturnMessage;
  switch (data.type) {
    case 'login':
      loginProcess(data.success);
      break;
  }
};
connection.onerror = (error) => {
  console.error(error);
};

// MEMO: server functions
const loginProcess = (success: boolean) => {
  if (success === false) {
    alert('Try a different username');
  } else {
    getUserMedia();
  }
};
const getUserMedia = () => {
  navigator.getUserMedia(
    { audio: true, video: true },
    (myStream) => {
      local_video.srcObject = myStream;
    },
    (error) => {
      console.error(error);
    }
  );
};

// MEMO: User Login
const sendMessage = () => {
  if (connection.readyState === 1) {
    if (username === null) return;
    local_name = username;

    if (local_name.length > 0) {
      send({
        type: 'login',
        name: local_name,
      });
    }
  } else {
    console.log('Connection has not establish');
  }
};

const send = (message: SendMessage) => {
  if (connectedUser) {
    message.name = connectedUser;
  }
  connection.send(JSON.stringify(message));
};

setTimeout(() => {
  if (connection.readyState === 1) return;
  sendMessage();
}, 5000);
