import React, { useState, createContext, useEffect } from 'react';
import socketClient from 'socket.io-client';

interface ISocketContext {
  socket: SocketIOClient.Socket | undefined
}

const SOCKET_SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const io: SocketIOClient.Socket = socketClient.connect(SOCKET_SERVER_URL, {
  transports: [ 'websocket', 'polling']
});
const SocketContext = createContext<ISocketContext>({socket: undefined});

const SocketProvider = (props: any) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  useEffect(() => {
    if(!socket) {
      io.on('connect', () => {
        console.log('socket connected');
      });
      setSocket(io);
    }
  }, [socket])

    return (
        <SocketContext.Provider
            value={{ socket }}
        >
            {props.children}
        </SocketContext.Provider>
    );
}
export { SocketContext, SocketProvider };