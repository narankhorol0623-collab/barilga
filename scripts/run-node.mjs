import nextEnv from '@next/env';
import { spawn } from 'node:child_process';

// Node reads NODE_EXTRA_CA_CERTS at startup, before Next loads .env.
// Load environment first, then start the real command with TLS verification intact.
nextEnv.loadEnvConfig(process.cwd());
const child = spawn(process.execPath, process.argv.slice(2), { stdio: 'inherit', env: process.env });
child.on('error', () => { console.error('Unable to start Node command.'); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
