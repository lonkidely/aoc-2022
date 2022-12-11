fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');


const solvePartOne = () => {
    const rows = data.split('\n');

    let currentCycle = 1;
    let regValue = 1;
    let timesToAdd = [];
    let result = 0;
    const timeToUpdateResult = [20, 60, 100, 140, 180, 220]

    rows.forEach(row => {
        if (row[0] === "a") {
            currentCycle++;
            [_, val] = [...row.split(' ')];
            timesToAdd.push([currentCycle + 1, parseInt(val)]);
        }
        currentCycle++;
    });

    for (let i = 0; i < timeToUpdateResult.length; i++) {
        let j = 0;
        regValue = 1;
        while (j < timesToAdd.length && timesToAdd[j][0] <= timeToUpdateResult[i]) {
            regValue += timesToAdd[j][1];
            j++;
        }
        result += timeToUpdateResult[i] * regValue;
    }

    console.log(result);
};

solvePartOne();

