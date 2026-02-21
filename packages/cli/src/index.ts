#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'

const REGISTRY_BASE_URL = 'https://boldkit.dev/r/angular'
const STYLES_URL = 'https://raw.githubusercontent.com/ANIBIT14/boldkit/main/packages/angular/projects/boldkit/src/lib/styles/globals.css'

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

// Track already added dependencies to avoid duplicates
const addedDependencies = new Set<string>()

const program = new Command()

program
  .name('boldkit')
  .description('CLI for adding BoldKit Angular components to your project')
  .version('0.1.3')

program
  .command('add')
  .description('Add components to your project')
  .argument('[components...]', 'Components to add')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('-o, --overwrite', 'Overwrite existing files')
  .option('-p, --path <path>', 'Path to add components to', 'src/components/ui')
  .action(async (components: string[], options) => {
    // Handle Ctrl+C gracefully
    prompts.override({ onCancel: () => process.exit(0) })

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
    const libPath = path.resolve(process.cwd(), 'src/lib')

    // Create target directories
    await fs.ensureDir(targetPath)
    await fs.ensureDir(libPath)

    const allDependencies: Set<string> = new Set()
    const failedComponents: string[] = []
    const shouldOverwrite = options.overwrite || options.yes

    // Add utils first if not already added
    if (!addedDependencies.has('utils')) {
      await addUtilsFile(libPath)
      addedDependencies.add('utils')
    }

    for (const component of components) {
      const spinner = ora(`Adding ${component}...`).start()

      try {
        // Fetch component from registry
        const response = await fetch(`${REGISTRY_BASE_URL}/${component}.json`)

        if (!response.ok) {
          throw new Error(`Component "${component}" not found in registry`)
        }

        const registry: RegistryItem = await response.json()

        // Write component files
        await writeComponentFiles(registry, targetPath, shouldOverwrite, spinner)

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

    if (failedComponents.length > 0) {
      console.log(chalk.yellow(`\nFailed to add: ${failedComponents.join(', ')}`))
    }

    console.log(chalk.green('✓ Done!\n'))
  })

program
  .command('init')
  .description('Initialize BoldKit in your Angular project (installs deps, configures Tailwind, adds styles)')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('--skip-deps', 'Skip installing dependencies')
  .action(async (options) => {
    console.log(chalk.cyan('\n🎨 Initializing BoldKit for Angular...\n'))

    // Check if we're in an Angular project
    const angularJsonPath = path.join(process.cwd(), 'angular.json')
    if (!await fs.pathExists(angularJsonPath)) {
      console.log(chalk.red('✗ No angular.json found. Please run this command in an Angular project.\n'))
      process.exit(1)
    }

    let componentsPath = 'src/components/ui'

    if (!options.yes) {
      const response = await prompts({
        type: 'text',
        name: 'componentsPath',
        message: 'Where would you like to add components?',
        initial: 'src/components/ui'
      }, { onCancel: () => process.exit(0) })
      componentsPath = response.componentsPath || componentsPath
    }

    // Step 1: Install dependencies
    if (!options.skipDeps) {
      const spinner = ora('Installing dependencies...').start()
      try {
        execSync('npm install tailwindcss @tailwindcss/postcss postcss class-variance-authority clsx tailwind-merge', {
          stdio: 'pipe',
          cwd: process.cwd()
        })
        spinner.succeed(chalk.green('Installed dependencies'))
      } catch (error) {
        spinner.fail(chalk.red('Failed to install dependencies'))
        console.log(chalk.yellow('\nRun manually: npm install tailwindcss @tailwindcss/postcss postcss class-variance-authority clsx tailwind-merge\n'))
      }
    }

    // Step 2: Create postcss.config.js
    const postcssPath = path.join(process.cwd(), 'postcss.config.js')
    if (!await fs.pathExists(postcssPath)) {
      const postcssConfig = `module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`
      await fs.writeFile(postcssPath, postcssConfig)
      console.log(chalk.green('✓ Created postcss.config.js'))
    } else {
      console.log(chalk.gray('✓ postcss.config.js already exists'))
    }

    // Step 3: Create components directory
    const fullComponentsPath = path.resolve(process.cwd(), componentsPath)
    await fs.ensureDir(fullComponentsPath)
    console.log(chalk.green(`✓ Created ${componentsPath}`))

    // Step 4: Create utils file
    const libPath = path.resolve(process.cwd(), 'src/lib')
    await addUtilsFile(libPath)
    console.log(chalk.green('✓ Created src/lib/utils.ts'))

    // Step 5: Download and add BoldKit styles
    const stylesPath = path.join(process.cwd(), 'src/styles.css')
    const spinner = ora('Downloading BoldKit styles...').start()
    try {
      const stylesResponse = await fetch(STYLES_URL)
      if (stylesResponse.ok) {
        const stylesContent = await stylesResponse.text()

        // Check if styles.css exists
        let existingStyles = ''
        if (await fs.pathExists(stylesPath)) {
          existingStyles = await fs.readFile(stylesPath, 'utf-8')
        }

        // Only add if not already present
        if (!existingStyles.includes('@import') || !existingStyles.includes('tailwindcss')) {
          const newStyles = stylesContent + '\n' + existingStyles
          await fs.writeFile(stylesPath, newStyles)
          spinner.succeed(chalk.green('Added BoldKit styles to src/styles.css'))
        } else {
          spinner.succeed(chalk.gray('BoldKit styles already in src/styles.css'))
        }
      } else {
        throw new Error('Failed to fetch styles')
      }
    } catch (error) {
      spinner.fail(chalk.yellow('Could not download styles automatically'))
      console.log(chalk.gray('\nCopy styles manually from:'))
      console.log(chalk.gray('https://github.com/ANIBIT14/boldkit/blob/main/packages/angular/projects/boldkit/src/lib/styles/globals.css\n'))
    }

    console.log(chalk.green('\n✓ BoldKit initialized!\n'))
    console.log(chalk.cyan('Next steps:\n'))
    console.log(chalk.gray('  npx boldkit add button card badge\n'))
  })

async function addUtilsFile(libPath: string) {
  await fs.ensureDir(libPath)
  const utilsContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
  const utilsPath = path.join(libPath, 'utils.ts')
  await fs.writeFile(utilsPath, utilsContent)
}

async function writeComponentFiles(
  registry: RegistryItem,
  targetPath: string,
  overwrite: boolean,
  spinner: ReturnType<typeof ora>
) {
  for (const file of registry.files) {
    // Get just the filename
    const fileName = path.basename(file.target)

    // Create component subdirectory
    const componentDir = path.join(targetPath, registry.name)
    await fs.ensureDir(componentDir)

    const filePath = path.join(componentDir, fileName)

    // Check if file exists
    if (await fs.pathExists(filePath) && !overwrite) {
      spinner.stop()
      const { shouldOverwrite } = await prompts({
        type: 'confirm',
        name: 'shouldOverwrite',
        message: `${fileName} already exists. Overwrite?`,
        initial: false
      }, { onCancel: () => process.exit(0) })

      if (!shouldOverwrite) {
        spinner.start()
        continue
      }
      spinner.start()
    }

    // Fix import paths in content
    // Components are at src/components/ui/[component]/file.ts
    // Utils is at src/lib/utils.ts
    // So relative path is ../../../lib/utils
    const fixedContent = file.content
      .replace(/from ['"]\.\.\/lib\/utils['"]/g, "from '../../../lib/utils'")
      .replace(/from ['"]\.\.\/\.\.\/utils\/cn['"]/g, "from '../../../lib/utils'")

    await fs.writeFile(filePath, fixedContent)
  }
}

program.parse()
