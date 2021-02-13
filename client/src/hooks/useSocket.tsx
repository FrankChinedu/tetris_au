import {
  useState,
  useEffect,
} from 'react'
import socketClient from 'socket.io-client';

// const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL as string;
const SOCKET_SERVER_URL = 'http://127.0.0.1:3002';

const io: SocketIOClient.Socket = socketClient.connect(SOCKET_SERVER_URL, {
  transports: [ 'websocket', 'polling']
});

function useSocket() {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  useEffect(() => {
    if(!socket) {
      io.on('connect', () => {
      });
      setSocket(io);
    }
  }, [socket])

  return [socket]
}

export default useSocket;
