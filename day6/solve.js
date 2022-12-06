fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

const checkUniqStr = (str) => {
    return (set = new Set(str)).size === str.length;
}

const solve = (markerLength) => {
    let i = 0;
    for (;i < data.length - markerLength - 1; i++){
        if (checkUniqStr(data.substring(i, i + markerLength))) {
            break;
        }
    }
    console.log(i + markerLength);
};

solve(4);
solve(14);
