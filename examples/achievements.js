#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let achievement;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  await sleep();

  console.log(`
    ${chalk.bgBlue('HISTORICAL ACHIEVEMENT TIMELINE')} 
    Input an amazing achievement in the command-line interface.
    All your achievements will be saved in the ${chalk.bgGreen('super secret stash')}
    Congrats in advance !!!

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'achievement_name',
    type: 'input',
    message: 'What is your achievement?',
    default() {
      return 'Achievement';
    },
  });

  achievement = answers.achievement_name;

  const spinner = createSpinner('Reading Inout...').start();
  spinner.success({ text: `Congrats on the win champ !` });
}

// Run it with top-level await
// console.clear();
await welcome();
await askName();