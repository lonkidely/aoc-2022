fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

function getCommonChar(str1, str2) {
    str1 = [...str1]
    str2 = [...str2]
    return str1.filter(char => str2.includes(char))[0];
}

const getDif = (a,b) => a.charCodeAt(0) - b.charCodeAt(0) + 1;

const getCostOfChar = char => {
    if ("a" <= char && char <= "z"){
        return getDif(char, 'a');
    } else {
        return 26 + getDif(char, 'A');
    }
};

const getCommonCharForThreeString = (str1, str2, str3) => {
    str1 = [...str1];
    str2 = [...str2];
    str3 = [...str3];
    return str1.filter(char => str2.includes(char) && str3.includes(char))[0];
}


function solvePartOne() {
    const rows = data.split('\n');

    let result = 0;

    rows.forEach(row => {
        if (row === '') {
            return;
        }
        const first = row.substring(0, row.length / 2), second = row.substring(row.length / 2, row.length);
        result += getCostOfChar(getCommonChar(first, second));
    });

    console.log(result);
}

function solvePartTwo() {
    const rows = data.split('\n');

    let result = 0;
    let currentArray = [];

    rows.forEach(row => {
        if (row === '') {
            return;
        }
        if (currentArray.length === 3) {
            result += getCostOfChar(getCommonCharForThreeString(...currentArray));
            currentArray = [];
        }
        currentArray = [row, ...currentArray];
    });

    result += getCostOfChar(getCommonCharForThreeString(...currentArray));

    console.log(result);
}

solvePartOne();
solvePartTwo();
