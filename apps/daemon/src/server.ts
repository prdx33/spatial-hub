import { WebSocketServer, WebSocket } from 'ws';
import { ClaudeProcess } from './claude.js';
import type { DaemonMessage, StatusMessage, StreamMessage } from '@spatial-hub/shared';
import { isCommandMessage } from '@spatial-hub/shared';

/**
 * Creates the WebSocket server for daemon communication.
 * Binds to localhost only for security.
 */
export function createServer(port: number) {
  const wss = new WebSocketServer({
    port,
    host: '127.0.0.1',
  });

  const processes = new Map<WebSocket, ClaudeProcess>();

  wss.on('connection', (ws) => {
    console.log('Client connected');

    const claude = new ClaudeProcess();
    processes.set(ws, claude);

    // Send connected status
    const connectedMsg: StatusMessage = {
      type: 'status',
      id: 'init',
      payload: { status: 'connected' },
    };
    ws.send(JSON.stringify(connectedMsg));

    // Pipe Claude output to WebSocket
    claude.on('output', (data: string) => {
      const msg: StreamMessage = {
        type: 'stream',
        id: claude.currentId,
        payload: data,
      };
      ws.send(JSON.stringify(msg));
    });

    claude.on('complete', () => {
      const msg: StatusMessage = {
        type: 'status',
        id: claude.currentId,
        payload: { status: 'complete' },
      };
      ws.send(JSON.stringify(msg));
    });

    claude.on('error', (error: string) => {
      const msg: StatusMessage = {
        type: 'status',
        id: claude.currentId,
        payload: { status: 'error', error },
      };
      ws.send(JSON.stringify(msg));
    });

    ws.on('message', (raw) => {
      try {
        const message: DaemonMessage = JSON.parse(raw.toString());

        if (isCommandMessage(message)) {
          claude.send(message.payload, message.id);
        }
      } catch (err) {
        console.error('Failed to parse message:', err);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      claude.terminate();
      processes.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      claude.terminate();
      processes.delete(ws);
    });
  });

  console.log(`Daemon listening on ws://127.0.0.1:${port}`);

  return wss;
}
