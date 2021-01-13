
import { Socket, Server } from 'socket.io';
import TetrisIo from '../module/Tetris/io';

export default (socket: Socket, io: Server): void => {
  TetrisIo(socket, io);
};
