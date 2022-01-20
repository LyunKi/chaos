import { Command } from 'commander'

const program = new Command()

enum ConfigType {
  FORMAT = 'FORMAT',
}

interface GeneratorOptions {
  projectPath?: string
}

async function generate(options: GeneratorOptions, command: Command) {
  const { projectPath } = options
  const root = projectPath ?? process.cwd()
  switch ('FORMAT') {
    case ConfigType.FORMAT: {
      break
    }
    default: {
      // generate all configs for user
    }
  }
}

program
  .option('-p, --project [projectPath]', 'project root path to add configs')
  .action(generate)
  .showHelpAfterError()
  .parseAsync(process.argv)
