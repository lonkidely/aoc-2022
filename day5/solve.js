fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

const alphabet = Array.from(Array(26)).map((elem, index) => index + 65).map(el => String.fromCharCode(el));

const solvePartOne = () => {
    [containers, operations] = data.split('\n\n');

    const rows = containers.split('\n');

    let containersStacks = []
    for (let i = 1; i < rows[0].length; i += 4) {
        containersStacks.push(rows.filter(row => alphabet.includes(row[i])).map(row => row[i]).reverse());
    }

    const operationsList = operations.split('\n').map(row => row.split(' ')).map(row => [row[1], row[3], row[5]]);

    operationsList.forEach(row => {
       [cnt, from, to] = row.map(val => parseInt(val));
       for (let i = 0; i < cnt; i++) {
           containersStacks[to - 1].push(containersStacks[from - 1].pop());
       }
    });

    let result = "";
    containersStacks.forEach(row => {
       result += row.length > 0 ? row.pop() : "";
    });
    console.log(result);
}

solvePartOne();

const solvePartTwo = () => {
    [containers, operations] = data.split('\n\n');

    const rows = containers.split('\n');

    let containersStacks = []
    for (let i = 1; i < rows[0].length; i += 4) {
        containersStacks.push(rows.filter(row => alphabet.includes(row[i])).map(row => row[i]).reverse());
    }

    const operationsList = operations.split('\n').map(row => row.split(' ')).map(row => [row[1], row[3], row[5]]);

    operationsList.forEach(row => {
        [cnt, from, to] = row.map(val => parseInt(val));
        const len = containersStacks[from - 1].length;

        containersStacks[to - 1] = containersStacks[to - 1].concat(containersStacks[from - 1].slice(len - cnt, len));
        containersStacks[from - 1] = containersStacks[from - 1].slice(0, len - cnt);
    });

    let result = "";
    containersStacks.forEach(row => {
        result += row.length > 0 ? row.pop() : "";
    });
    console.log(result);
}

solvePartTwo();