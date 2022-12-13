fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

let set = new Set();

const insert = (x, y) => {
    set.add(`${x}_${y}`);
}


const getDX = (direction) => {
    switch (direction) {
        case 'U':
            return 0;
        case 'D':
            return 0;
        case 'L':
            return -1;
        case 'R':
            return 1;
    }
}

const getDY = (direction) => {
    switch (direction) {
        case 'U':
            return 1;
        case 'D':
            return -1;
        case 'L':
            return 0;
        case 'R':
            return 0;
    }
}


const solvePartOne = () => {
    const rows = data.split('\n').map(val => val.split(' '));

    let tailX = 0, tailY = 0, headX = 0, headY = 0;
    insert(tailX, tailY);

    rows.forEach(row => {
        [direction, count] = [row[0], parseInt(row[1])];

        const dx = getDX(direction);
        const dy = getDY(direction);

        for (let i = 0; i < count; i++) {
            headY += dy;
            headX += dx;

            const difX = headX - tailX;
            const difY = headY - tailY;

            if (Math.abs(difX) > 1 || Math.abs(difY) > 1) {
                tailX += Math.sign(difX);
                tailY += Math.sign(difY);
            }

            insert(tailX, tailY);
        }
    });

    console.log(set.size);
};

solvePartOne();

const solvePartTwo = () => {
    const rows = data.split('\n').map(val => val.split(' '));

    let ropeX = Array(10).fill(0);
    let ropeY = Array(10).fill(0);

    const last = 9;

    set.clear();
    insert(ropeX[last], ropeY[last]);

    rows.forEach(row => {
        [direction, count] = [row[0], parseInt(row[1])];

        const dx = getDX(direction);
        const dy = getDY(direction);

        for (let i = 0; i < count; i++) {
            ropeX[0] += dx;
            ropeY[0] += dy;

            for (let j = 1; j <= last; j++) {
                const difX = ropeX[j - 1] - ropeX[j];
                const difY = ropeY[j - 1] - ropeY[j];

                if (Math.abs(difX) > 1 || Math.abs(difY) > 1) {
                    ropeX[j] += Math.sign(difX);
                    ropeY[j] += Math.sign(difY);
                }
            }
            insert(ropeX[last], ropeY[last]);
        }
    });

    console.log(set.size);
};

solvePartTwo();
