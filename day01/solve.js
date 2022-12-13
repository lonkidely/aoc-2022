fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const inputFilePath = txtPath + '/input.txt';


const caloriesArray = (function getCaloriesArray() {
    const data = fs.readFileSync(inputFilePath, 'utf-8');

    const rows = data.split('\n');
    let currentCaloriesSum = 0;
    let resultArray = [];

    rows.forEach(row => {
        if (row === '') {
            resultArray = [currentCaloriesSum, ...resultArray];
            currentCaloriesSum = 0;
        } else {
            currentCaloriesSum += parseInt(row);
        }
    });

    return resultArray.sort((a, b) => b - a);
})();


function solvePartOne() {
    console.log(caloriesArray[0]);
}


function solvePartTwo() {
    console.log(caloriesArray[0] + caloriesArray[1] + caloriesArray[2]);
}


solvePartOne();
solvePartTwo();
