#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import fs from 'fs-extra'
import path from 'path'

const REGISTRY_BASE_URL = 'https://boldkit.dev/r/angular'

interface RegistryFile {
  path: string
  content: string
  type: string
  target: string
}

interface RegistryItem {
  name: string
  type: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFile[]
}

const program = new Command()

program
  .name('boldkit')
  .description('CLI for adding BoldKit Angular components to your project')
  .version('0.1.0')

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('-y, --yes', 'Skip confirmation prompt')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('-p, --path <path>', 'Path to add components to', 'src/components/ui')
  .action(async (components: string[], options) => {
    if (!components.length) {
      // Show available components
      console.log(chalk.cyan('\nAvailable components:\n'))
      const availableComponents = [
        'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar',
        'badge', 'breadcrumb', 'button', 'card', 'checkbox', 'collapsible',
        'dialog', 'input', 'label', 'layered-card', 'marquee', 'pagination',
        'popover', 'progress', 'radio-group', 'scroll-area', 'select',
        'separator', 'shapes', 'skeleton', 'slider', 'sticker', 'switch',
        'table', 'tabs', 'textarea', 'toggle', 'toggle-group', 'tooltip'
      ]
      availableComponents.forEach(c => console.log(`  - ${c}`))
      console.log(chalk.gray('\nUsage: npx boldkit add button card badge\n'))
      return
    }

    // Check if we're in an Angular project
    const angularJsonPath = path.join(process.cwd(), 'angular.json')
    if (!await fs.pathExists(angularJsonPath)) {
      console.log(chalk.red('\n✗ No angular.json found. Please run this command in an Angular project.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan(`\nAdding ${components.length} component(s) to your project...\n`))

    const targetPath = path.resolve(process.cwd(), options.path)

    // Create target directory if it doesn't exist
    await fs.ensureDir(targetPath)

    const allDependencies: Set<string> = new Set()
    const failedComponents: string[] = []

    for (const component of components) {
      const spinner = ora(`Adding ${component}...`).start()

      try {
        // Fetch component from registry
        const response = await fetch(`${REGISTRY_BASE_URL}/${component}.json`)

        if (!response.ok) {
          throw new Error(`Component "${component}" not found in registry`)
        }

        const registry: RegistryItem = await response.json()

        // Check for registry dependencies and add them first
        if (registry.registryDependencies?.length) {
          for (const dep of registry.registryDependencies) {
            if (!components.includes(dep)) {
              spinner.text = `Adding dependency: ${dep}...`
              try {
                const depResponse = await fetch(`${REGISTRY_BASE_URL}/${dep}.json`)
                if (depResponse.ok) {
                  const depRegistry: RegistryItem = await depResponse.json()
                  await writeComponentFiles(depRegistry, targetPath, options.overwrite)
                  if (depRegistry.dependencies) {
                    depRegistry.dependencies.forEach(d => allDependencies.add(d))
                  }
                }
              } catch {
                // Dependency might not exist or already be installed
              }
            }
          }
        }

        // Write component files
        await writeComponentFiles(registry, targetPath, options.overwrite)

        // Collect npm dependencies
        if (registry.dependencies) {
          registry.dependencies.forEach(dep => allDependencies.add(dep))
        }

        spinner.succeed(chalk.green(`Added ${component}`))
      } catch (error) {
        spinner.fail(chalk.red(`Failed to add ${component}: ${(error as Error).message}`))
        failedComponents.push(component)
      }
    }

    // Show summary
    console.log('')

    if (allDependencies.size > 0) {
      console.log(chalk.cyan('Install dependencies:\n'))
      console.log(chalk.gray(`  npm install ${Array.from(allDependencies).join(' ')}\n`))
    }

    // Remind about styles
    console.log(chalk.cyan('Add styles to your src/styles.css:\n'))
    console.log(chalk.gray(`  @import "https://boldkit.dev/r/angular/styles.css";\n`))
    console.log(chalk.gray('  Or copy from: https://github.com/ANIBIT14/boldkit/blob/main/packages/angular/projects/boldkit/src/lib/styles/globals.css\n'))

    if (failedComponents.length > 0) {
      console.log(chalk.yellow(`\nFailed to add: ${failedComponents.join(', ')}`))
    }

    console.log(chalk.green('✓ Done!\n'))
  })

program
  .command('init')
  .description('Initialize BoldKit in your Angular project')
  .action(async () => {
    console.log(chalk.cyan('\n🎨 Initializing BoldKit for Angular...\n'))

    // Check if we're in an Angular project
    const angularJsonPath = path.join(process.cwd(), 'angular.json')
    if (!await fs.pathExists(angularJsonPath)) {
      console.log(chalk.red('✗ No angular.json found. Please run this command in an Angular project.\n'))
      process.exit(1)
    }

    const response = await prompts([
      {
        type: 'text',
        name: 'componentsPath',
        message: 'Where would you like to add components?',
        initial: 'src/components/ui'
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Install dependencies (class-variance-authority, clsx, tailwind-merge)?',
        initial: true
      }
    ])

    // Create components directory
    const componentsPath = path.resolve(process.cwd(), response.componentsPath)
    await fs.ensureDir(componentsPath)
    console.log(chalk.green(`✓ Created ${response.componentsPath}`))

    // Create utils file
    const utilsContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
    const utilsPath = path.join(componentsPath, '..', 'lib', 'utils.ts')
    await fs.ensureDir(path.dirname(utilsPath))
    await fs.writeFile(utilsPath, utilsContent)
    console.log(chalk.green(`✓ Created src/lib/utils.ts`))

    if (response.installDeps) {
      console.log(chalk.cyan('\nInstall these dependencies:\n'))
      console.log(chalk.gray('  npm install class-variance-authority clsx tailwind-merge\n'))
    }

    console.log(chalk.cyan('\nAdd BoldKit styles to your src/styles.css:\n'))
    console.log(chalk.gray('  Copy from: https://github.com/ANIBIT14/boldkit/blob/main/packages/angular/projects/boldkit/src/lib/styles/globals.css\n'))

    console.log(chalk.green('✓ BoldKit initialized! Now add components with:\n'))
    console.log(chalk.gray('  npx boldkit add button card badge\n'))
  })

async function writeComponentFiles(registry: RegistryItem, targetPath: string, overwrite?: boolean) {
  for (const file of registry.files) {
    const fileName = path.basename(file.target)
    const filePath = path.join(targetPath, fileName)

    // Check if file exists
    if (await fs.pathExists(filePath) && !overwrite) {
      const { shouldOverwrite } = await prompts({
        type: 'confirm',
        name: 'shouldOverwrite',
        message: `${fileName} already exists. Overwrite?`,
        initial: false
      })
      if (!shouldOverwrite) continue
    }

    await fs.writeFile(filePath, file.content)
  }
}

program.parse()
