#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let task;
let category;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  await sleep();

  console.log(`
    ${chalk.bgBlue('TIME TRACKER')} 
    Write away your current task in the command-line interface.
    Your current task will turn into a focus timer and be saved in the ${chalk.bgGreen('super duper secret stash')}
    3 .. 2 .. 1 .. FOCUS !!
  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'task_name',
    type: 'input',
    message: 'What is your task?',
    default() {
      return 'Task';
    },
  });

  task = answers.task_name;

  const spinner = createSpinner('Reading Input...').start();
  spinner.success({ text: `Let's get started on ${task}!` });
}

async function askCategory() {
  const answers = await inquirer.prompt({
    name: 'category_name',
    type: 'input',
    message: 'What is your task category?',
    default() {
      return 'Category';
    },
  });

  category = answers.category_name;

  const spinner = createSpinner('Reading Input...').start();
  spinner.success({ text: `${task} is now saved in the category of ${category}!` });
}

async function startTimer() {
  const duration = await inquirer.prompt({
    name: 'duration',
    type: 'input',
    message: 'How many minutes do you want to focus?',
    default() {
      return '25';
    },
  });

  const minutes = parseInt(duration.duration);
  const milliseconds = minutes * 60 * 1000;

  console.log(chalk.yellow(`Sta rting ${minutes}-minute timer for ${task}...`));

  const spinner = createSpinner('Focusing...').start();
  await sleep(milliseconds);
  spinner.success({ text: `Time's up! You worked on ${task} for ${minutes} minutes!` });
}

// Run it with top-level await
await welcome();
await askName();
await askCategory();
await startTimer();
