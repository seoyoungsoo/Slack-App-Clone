import io from 'socket.io-client';
import { useCallback } from 'react';

const backUrl = 'http://localhost:3095';
const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, []);
  if (!workspace) {
    return [undefined, disconnect];
  }

  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
  }
  // emit으로 전송, on으로 수신

  return [sockets[workspace], disconnect];
};

export default useSocket;
