#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database
const dbPromise = open({
    filename: './achievements.db',
    driver: sqlite3.Database
});

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function initializeDb() {
    const db = await dbPromise;
    await db.exec(`CREATE TABLE IF NOT EXISTS achievements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        achievement TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

async function storeAchievement(achievement) {
    const db = await dbPromise;
    await db.run('INSERT INTO achievements (achievement) VALUES (?)', achievement);
}

async function getAchievements() {
    const db = await dbPromise;
    return await db.all('SELECT * FROM achievements ORDER BY timestamp DESC');
}

async function displayAchievements() {
    const achievements = await getAchievements();
    console.log(chalk.bgGreen('Your Achievements:'));
    achievements.forEach(({ id, achievement, timestamp }) => {
        console.log(`${chalk.blue(id)}: ${achievement} (${timestamp})`);
    });
}

async function welcome() {
    await sleep();
    console.log(`
        ${chalk.bgBlue('HISTORICAL ACHIEVEMENT TIMELINE')}
        Input an amazing achievement in the command-line interface.
        All your achievements will be saved in the ${chalk.bgGreen('super secret stash')}
        Congrats in advance !!!
    `);
}

async function askAction() {
    const answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add Achievement', 'View Achievements'],
    });

    return answer.action;
}

async function askAchievement() {
    const answers = await inquirer.prompt({
        name: 'achievement_name',
        type: 'input',
        message: 'What is your achievement?',
        default() {
            return 'Achievement';
        },
    });

    const achievement = answers.achievement_name;

    const spinner = createSpinner('Saving achievement...').start();
    await storeAchievement(achievement);
    spinner.success({ text: `Congrats on the win champ! Your achievement has been saved.` });
}

// Initialize database and run the script
await initializeDb();
await welcome();
const action = await askAction();

if (action === 'Add Achievement') {
    await askAchievement();
} else if (action === 'View Achievements') {
    await displayAchievements();
}
