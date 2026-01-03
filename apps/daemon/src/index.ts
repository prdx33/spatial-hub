import { createServer } from './server.js';

const PORT = 9847;

console.log('Starting Spatial Hub Daemon...');

const server = createServer(PORT);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down daemon...');
  server.close(() => {
    console.log('Daemon stopped.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
