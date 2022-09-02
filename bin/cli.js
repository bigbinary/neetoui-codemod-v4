const globby = require('globby');
// const inquirer = require("inquirer");
const meow = require('meow');
const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const isGitClean = require('is-git-clean');

const transformerDirectory = path.join(__dirname, '../', 'transforms');
const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

const transformers = [
  'Button',
  'Select',
  'Dropdown',
  'Avatar',
  'Modal',
  'Pane',
  'Alert',
  'Tag',
  'Classnames',
];

// const TRANSFORMER_INQUIRER_CHOICES = [
//   {
//     name: "Button",
//     value: "Button",
//   },
//   {
//     name: "Select",
//     value: "Select",
//   },
//   {
//     name: "Avatar",
//     value: "Avatar",
//   },
//   {
//     name: "Modal",
//     value: "Modal",
//   },
//   {
//     name: "Alert",
//     value: "Alert",
//   },
//   {
//     name: "Pane",
//     value: "Pane",
//   },
//   {
//     name: "Dropdown",
//     value: "Dropdown",
//   },
//   {
//     name: "Tag",
//     value: "Tag",
//   },
// ];

function checkGitStatus(force) {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = 'Git directory is not clean';
  } catch (err) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using react-codemods!');
      console.log(
        chalk.yellow(
          '\nBut before we continue, please stash or commit your git changes.'
        )
      );
      console.log(
        '\nYou may use the --force flag to override this safety check.'
      );
      process.exit(1);
    }
  }
}

function runTransform({ files, flags, transformer }) {
  const transformerPath = path.join(transformerDirectory, `${transformer}.js`);

  let args = [];

  const { dry, print, explicitRequire } = flags;

  if (dry) {
    args.push('--dry');
  }
  if (print) {
    args.push('--print');
  }

  if (explicitRequire === 'false') {
    args.push('--explicit-require=false');
  }

  args.push('--verbose=2');

  args.push('--ignore-pattern=**/node_modules/**');

  args.push('--parser', 'babel');
  args.push('--extensions=jsx,js');

  args = args.concat(['--transform', transformerPath]);

  if (flags.jscodeshift) {
    args = args.concat(flags.jscodeshift);
  }

  args = args.concat(files);

  console.log(`Executing command: jscodeshift ${args.join(' ')}`);

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: 'inherit',
    stripEof: false,
  });

  if (result.error) {
    throw result.error;
  }
}

function expandFilePathsIfNeeded(filesBeforeExpansion) {
  const shouldExpandFiles = filesBeforeExpansion.some((file) =>
    file.includes('*')
  );
  return shouldExpandFiles
    ? globby.sync(filesBeforeExpansion)
    : filesBeforeExpansion;
}

function run() {
  const cli = meow(
    {
      description: 'Codemods for updating React APIs.',
      help: `
    Usage
      $ npx react-codemod <transform> <path> <...options>

        transform    One of the choices from https://github.com/reactjs/react-codemod
        path         Files or directory to transform. Can be a glob like src/**.test.js

    Options
      --force            Bypass Git safety checks and forcibly run codemods
      --dry              Dry run (no changes are made to files)
      --print            Print transformed files to your terminal
      --explicit-require Transform only if React is imported in the file (default: true)

      --jscodeshift  (Advanced) Pass options directly to jscodeshift
    `,
    },
    {
      boolean: ['force', 'dry', 'print', 'explicit-require', 'help'],
      string: ['_'],
      alias: {
        h: 'help',
      },
    }
  );

  if (!cli.flags.dry) {
    checkGitStatus(cli.flags.force);
  }

  const filesBeforeExpansion = cli.input[0];
  const filesExpanded = expandFilePathsIfNeeded([filesBeforeExpansion]);

  if (!filesExpanded.length) {
    console.log(`No files found matching ${filesBeforeExpansion.join(' ')}`);
    return null;
  }

  for (const transformer of transformers) {
    runTransform({
      files: filesExpanded,
      flags: cli.flags,
      transformer: transformer,
    });
  }
}

module.exports = {
  run: run,
  runTransform: runTransform,
  checkGitStatus: checkGitStatus,
  jscodeshiftExecutable: jscodeshiftExecutable,
  transformerDirectory: transformerDirectory,
};
