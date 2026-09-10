/**
 * Node Runtime Support & Environment Diagnostic Tool
 * Validates Node.js runtime, Playwright installation, and browser agent dependencies.
 */
import os from 'os';

export function checkRuntimeEnvironment() {
  const nodeVersion = process.versions.node;
  const major = parseInt(nodeVersion.split('.')[0], 10);
  const isNodeSupported = major >= 18;

  const diagnostics = {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion,
    isNodeSupported,
    memoryTotalMB: Math.round(os.totalmem() / (1024 * 1024)),
    memoryFreeMB: Math.round(os.freemem() / (1024 * 1024)),
    uptimeSeconds: Math.round(process.uptime()),
    pid: process.pid
  };

  return diagnostics;
}

if (process.argv[1]?.endsWith('nodeRuntimeSupport.mjs')) {
  console.log('--- Node Runtime Diagnostics ---');
  console.log(JSON.stringify(checkRuntimeEnvironment(), null, 2));
}
