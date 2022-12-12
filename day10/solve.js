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

const solvePartTwo = () => {
    const rows = data.split('\n');

    let currentCycle = 1;
    let timesToAdd = {};
    let result = Array(240).fill('.');

    rows.forEach(row => {
        if (row[0] === "a") {
            currentCycle++;
            [_, val] = row.split(' ');
            timesToAdd[currentCycle + 1] = parseInt(val);
        }
        currentCycle++;
    });

    const checkDraw = (cycle, regValue) => {
        cycle = (cycle - 1) % 40;
        return (regValue - 1 <= cycle && cycle <= regValue + 1);
    }

    let regVal = 1;
    for (let i = 1; i <= 240; i++) {
        if (i in timesToAdd) {
            regVal += timesToAdd[i];
        }
        if (checkDraw(i, regVal)) {
            result[i - 1] = "#";
        }

    }

    const printResult = () => {
        for (let i = 0; i < 6; i++) {
            for (let j = 1; j <= 40; ++j) {
                process.stdout.write(result[i * 40 + j - 1]);
            }
            console.log();
        }
    }

    printResult();
};

solvePartTwo();
