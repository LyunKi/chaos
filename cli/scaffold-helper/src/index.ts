import { Command } from 'commander'
import pkg from '../package.json'

const program = new Command()

program
  .version(pkg.version)
  .description(pkg.description)
  .command('gc', 'generate your configs', {
    isDefault: false,
    executableFile: 'sdf-gc',
  })
  .showHelpAfterError()
  .parse(process.argv)
