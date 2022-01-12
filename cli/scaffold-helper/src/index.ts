import { Command } from 'commander'
import pkg from '../package.json'

const program = new Command()

program
    .version(pkg.version)
    .description(pkg.description)
    .command(
        'gc [type]',
        'generate your configs, if type not specified, all configs will be generated',
        { isDefault: true, executableFile: 'scaffold-helper-gc' }
    )
    .showHelpAfterError()
    .parse(process.argv)
