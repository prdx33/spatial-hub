import { spawn, type ChildProcess } from 'child_process';
import { EventEmitter } from 'events';

/**
 * ClaudeProcess - Wrapper for Claude Code CLI
 *
 * Manages a Claude Code CLI process, piping input/output
 * over EventEmitter for WebSocket streaming.
 */
export class ClaudeProcess extends EventEmitter {
  private process: ChildProcess | null = null;
  public currentId: string = '';

  constructor() {
    super();
  }

  /**
   * Send a command to Claude and stream the response.
   */
  send(command: string, id: string) {
    this.currentId = id;

    // Spawn claude in print mode for streaming output
    this.process = spawn('claude', ['--print', command], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    this.process.stdout?.on('data', (data: Buffer) => {
      this.emit('output', data.toString());
    });

    this.process.stderr?.on('data', (data: Buffer) => {
      this.emit('error', data.toString());
    });

    this.process.on('close', (code) => {
      if (code === 0) {
        this.emit('complete');
      } else {
        this.emit('error', `Process exited with code ${code}`);
      }
      this.process = null;
    });

    this.process.on('error', (err) => {
      this.emit('error', err.message);
      this.process = null;
    });
  }

  /**
   * Terminate the current Claude process if running.
   */
  terminate() {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }
  }
}
