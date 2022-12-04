fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

const isFullIntersect = (str1, str2) => {
    let [firstLeft, firstRight] = str1.split('-').map(elem => parseInt(elem));
    let [secondLeft, secondRight] = str2.split('-').map(elem => parseInt(elem));

    if (firstLeft > secondLeft || (firstLeft === secondLeft && firstRight < secondRight)) {
        [firstLeft, secondLeft] = [secondLeft, firstLeft];
        [firstRight, secondRight] = [secondRight, firstRight];
    }

    return (firstLeft <= secondLeft && secondRight <= firstRight) ? 1 : 0;
};

const isIntersect = (str1, str2) => {
    let [firstLeft, firstRight] = str1.split('-').map(elem => parseInt(elem));
    let [secondLeft, secondRight] = str2.split('-').map(elem => parseInt(elem));

    if (firstLeft > secondLeft || (firstLeft === secondLeft && firstRight < secondRight)) {
        [firstLeft, secondLeft] = [secondLeft, firstLeft];
        [firstRight, secondRight] = [secondRight, firstRight];
    }

    return (firstLeft <= secondLeft && secondLeft <= firstRight) ? 1 : 0;
};

function solvePartOne() {
    const rows = data.split('\n');

    let result = 0;

    rows.forEach(row => {
        const pair = row.split(',');
        result += isFullIntersect(pair[0], pair[1]);
    });

    console.log(result);
}

function solvePartTwo() {
    const rows = data.split('\n');

    let result = 0;

    rows.forEach(row => {
        const pair = row.split(',');
        result += isIntersect(pair[0], pair[1]);
    });

    console.log(result);
}

solvePartOne();
solvePartTwo();