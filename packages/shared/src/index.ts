/**
 * Shared Types - Daemon Protocol
 *
 * Types shared between the web client and the daemon server.
 */

/** Message types for WebSocket communication */
export type DaemonMessageType = 'command' | 'response' | 'stream' | 'status';

/** Base message structure for daemon protocol */
export interface DaemonMessage {
  type: DaemonMessageType;
  id: string;
  payload: unknown;
}

/** Command message sent from client to daemon */
export interface CommandMessage extends DaemonMessage {
  type: 'command';
  payload: string;
}

/** Stream message sent from daemon as Claude outputs */
export interface StreamMessage extends DaemonMessage {
  type: 'stream';
  payload: string;
}

/** Status message for connection and completion states */
export interface StatusMessage extends DaemonMessage {
  type: 'status';
  payload: {
    status: 'connected' | 'complete' | 'error';
    error?: string;
  };
}

/** Type guard for command messages */
export function isCommandMessage(msg: DaemonMessage): msg is CommandMessage {
  return msg.type === 'command';
}

/** Type guard for stream messages */
export function isStreamMessage(msg: DaemonMessage): msg is StreamMessage {
  return msg.type === 'stream';
}

/** Type guard for status messages */
export function isStatusMessage(msg: DaemonMessage): msg is StatusMessage {
  return msg.type === 'status';
}
