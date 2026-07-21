import { spawn } from 'node:child_process'
import type { InstallCommand } from './commands.js'

export interface InstallResult {
  ok: boolean
  exitCode: number | null
  output: string
}

/**
 * Run the shadcn / shadcn-vue CLI for real. Non-interactive: passes --yes so
 * the CLI never blocks on a confirmation prompt.
 */
export function runInstall(
  command: InstallCommand,
  cwd: string,
  timeoutMs = 5 * 60_000
): Promise<InstallResult> {
  const [bin, ...args] = command.argv
  return new Promise((resolve) => {
    const child = spawn(bin, [...args, '--yes'], {
      cwd,
      env: { ...process.env, CI: 'true' },
      timeout: timeoutMs,
      shell: process.platform === 'win32',
    })
    let output = ''
    child.stdout.on('data', (d: Buffer) => (output += d.toString()))
    child.stderr.on('data', (d: Buffer) => (output += d.toString()))
    child.on('error', (err) => resolve({ ok: false, exitCode: null, output: String(err) }))
    child.on('close', (code) => resolve({ ok: code === 0, exitCode: code, output: output.trim() }))
  })
}
