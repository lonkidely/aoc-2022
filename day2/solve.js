fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const inputFilePath = txtPath + '/input.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

const shapeScore = {
    'X': 1,
    'Y': 2,
    'Z': 3
};

const requiredShape = {
    "AX": 'Z',
    "BX": 'X',
    "CX": 'Y',
    "AY": 'X',
    "BY": 'Y',
    "CY": 'Z',
    "AZ": 'Y',
    "BZ": 'Z',
    "CZ": 'X'
};

const roundScore = {
    "AX": 3,
    "AY": 6,
    "AZ": 0,
    "BX": 0,
    "BY": 3,
    "BZ": 6,
    "CX": 6,
    "CY": 0,
    "CZ": 3
};


function getScoreTaskPartOne(currentRound) {
    return roundScore[currentRound[0] + currentRound[1]] + shapeScore[currentRound[1]];
}

function getScoreTaskPartTwo(currentRound) {
    const reqShape = requiredShape[currentRound[0] + currentRound[1]];
    return roundScore[currentRound[0] + reqShape] + shapeScore[reqShape];
}

function solve(taskPart) {
    const rows = data.split('\n');
    let score = 0;
    rows.forEach(row => {
        if (row === '') {
            return;
        }
        const currentRound = row.split(' ');
        score += taskPart === 'PartOne' ? getScoreTaskPartOne(currentRound) : getScoreTaskPartTwo(currentRound);
    });
    console.log(score);
}

solve('PartOne');
solve('PartTwo');
