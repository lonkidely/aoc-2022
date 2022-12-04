fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

const intersectFullCheck = (firstLeft, firstRight, secondLeft, secondRight) => (firstLeft <= secondLeft && secondRight <= firstRight) ? 1 : 0;
const intersectCheck = (firstLeft, firstRight, secondLeft, secondRight) => (firstLeft <= secondLeft && secondLeft <= firstRight) ? 1 : 0;

const isIntersect = (str1, str2, checkIntersect) => {
    let [firstLeft, firstRight] = str1.split('-').map(elem => parseInt(elem));
    let [secondLeft, secondRight] = str2.split('-').map(elem => parseInt(elem));

    if (firstLeft > secondLeft || (firstLeft === secondLeft && firstRight < secondRight)) {
        [firstLeft, secondLeft] = [secondLeft, firstLeft];
        [firstRight, secondRight] = [secondRight, firstRight];
    }

    return checkIntersect(firstLeft, firstRight, secondLeft, secondRight);
};

function solve(checkIntersection) {
    const rows = data.split('\n');

    const result = rows.reduce((acc, val) => acc + isIntersect(...val.split(','), checkIntersection), 0);

    console.log(result);
}

solve(intersectFullCheck);
solve(intersectCheck);