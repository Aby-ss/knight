#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let task;

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

  const spinner = createSpinner('Reading Inout...').start();
  spinner.success({ text: `Let's get started on ${task}!` });
}

let category;

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
  
    const spinner = createSpinner('Reading Inout...').start();
    spinner.success({ text: `${task} is now saved in the category of ${category}!` });
}

// Run it with top-level await
// console.clear();
await welcome();
await askName();
await askCategory();