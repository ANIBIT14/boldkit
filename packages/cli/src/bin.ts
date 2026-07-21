#!/usr/bin/env node
import { run } from './cli.js'

run(process.argv.slice(2)).then(
  (code) => process.exit(code),
  (err) => {
    console.error(err)
    process.exit(1)
  }
)
