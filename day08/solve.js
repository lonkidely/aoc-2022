fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

let visibleVerticalFromUp;
let visibleVerticalFromDown;
let visibleHorizontalFromLeft;
let visibleHorizontalFromRight;
let visibleCountVerticalFromUp;
let visibleCountVerticalFromDown;
let visibleCountHorizontalFromLeft;
let visibleCountHorizontalFromRight;
let trees;

const fillDefaultValues = (rowsCount, colsCount) => {
    visibleVerticalFromUp = new Array(rowsCount);
    visibleVerticalFromDown = new Array(rowsCount);
    visibleHorizontalFromLeft = new Array(rowsCount);
    visibleHorizontalFromRight = new Array(rowsCount);

    visibleCountVerticalFromUp = new Array(rowsCount);
    visibleCountVerticalFromDown = new Array(rowsCount);
    visibleCountHorizontalFromLeft = new Array(rowsCount);
    visibleCountHorizontalFromRight = new Array(rowsCount);

    trees = new Array(rowsCount);

    for (let i = 0; i < rowsCount; i++) {
        visibleVerticalFromUp[i] = new Array(colsCount).fill(false);
        visibleVerticalFromDown[i] = new Array(colsCount).fill(false);
        visibleHorizontalFromLeft[i] = new Array(colsCount).fill(false);
        visibleHorizontalFromRight[i] = new Array(colsCount).fill(false);

        visibleCountVerticalFromUp[i] = new Array(rowsCount).fill(0);
        visibleCountVerticalFromDown[i] = new Array(rowsCount).fill(0);
        visibleCountHorizontalFromLeft[i] = new Array(rowsCount).fill(0);
        visibleCountHorizontalFromRight[i] = new Array(rowsCount).fill(0);
    }
};

const prepare = () => {
    const rows = data.split('\n');

    const rowsCount = rows.length;
    const colsCount = rows[0].length;
    fillDefaultValues(rowsCount, colsCount);

    rows.forEach((row, index) => {
        trees[index] = Array.from(row).map(val => parseInt(val));
    });

    for (let i = 0; i < rowsCount; i++) {
        visibleHorizontalFromLeft[i][0] = true;
        visibleHorizontalFromRight[i][colsCount - 1] = true;
    }
    for (let i = 0; i < colsCount; i++) {
        visibleVerticalFromUp[0][i] = true;
        visibleVerticalFromDown[rowsCount - 1][i] = true;
    }

    for (let j = 0; j < colsCount; j++) {
        let maxTreeHeight = trees[0][j];
        for (let i = 1; i < rowsCount; i++) {
            if (trees[i][j] > maxTreeHeight) {
                visibleVerticalFromUp[i][j] = true;
                maxTreeHeight = trees[i][j];
            }
        }
    }
    for (let j = 0; j < colsCount; j++) {
        let maxTreeHeight = trees[rowsCount - 1][j];
        for (let i = rowsCount - 2; i >= 0; i--) {
            if (trees[i][j] > maxTreeHeight) {
                visibleVerticalFromDown[i][j] = true;
                maxTreeHeight = trees[i][j];
            }
        }
    }
    for (let i = 0; i < rowsCount; i++) {
        let maxTreeHeight = trees[i][0];
        for (let j = 1; j < colsCount; j++) {
            if (trees[i][j] > maxTreeHeight) {
                visibleHorizontalFromLeft[i][j] = true;
                maxTreeHeight = trees[i][j];
            }
        }
    }
    for (let i = 0; i < rowsCount; i++) {
        let maxTreeHeight = trees[i][colsCount - 1];
        for (let j = colsCount - 2; j >= 0; j--) {
            if (trees[i][j] > maxTreeHeight) {
                visibleHorizontalFromRight[i][j] = true;
                maxTreeHeight = trees[i][j];
            }
        }
    }

    const getVisibleCountUp = (i, j) => {
      let result = 0;
      let k = i - 1;
      for (; k >= 0 && trees[i][j] > trees[k][j]; k--) {
          result++;
      }
      if (k >= 0) {
          result++;
      }
      return result;
    };
    const getVisibleCountDown = (i, j) => {
        let result = 0;
        let k = i + 1;
        for (; k < rowsCount && trees[i][j] > trees[k][j]; k++) {
            result++;
        }
        if (k < rowsCount) {
            result++;
        }
        return result;
    };

    const getVisibleCountLeft = (i, j) => {
        let result = 0;
        let k = j - 1;
        for (; k >= 0 && trees[i][j] > trees[i][k]; k--) {
            result++;
        }
        if (k >= 0) {
            result++;
        }
        return result;
    }

    const getVisibleCountRight = (i, j) => {
        let result = 0;
        let k = j + 1;
        for (; k < colsCount && trees[i][j] > trees[i][k]; k++) {
            result++;
        }
        if (k < colsCount) {
            result++;
        }
        return result;
    }

    for (let j = 1; j < colsCount - 1; j++) {
        for (let i = 1; i < rowsCount - 1; i++) {
            visibleCountVerticalFromUp[i][j] = getVisibleCountUp(i, j);
            visibleCountVerticalFromDown[i][j] = getVisibleCountDown(i, j);
            visibleCountHorizontalFromLeft[i][j] = getVisibleCountLeft(i, j);
            visibleCountHorizontalFromRight[i][j] = getVisibleCountRight(i, j);
        }
    }
};

prepare();

const solvePartOne = () => {
    let result = 0;

    trees.forEach((row, rowIndex) => {
       row.forEach((col, colIndex) => {
           result += (visibleVerticalFromUp[rowIndex][colIndex] | visibleVerticalFromDown[rowIndex][colIndex]
               | visibleHorizontalFromLeft[rowIndex][colIndex] | visibleHorizontalFromRight[rowIndex][colIndex]) ? 1 : 0;
       });
    });

    console.log(result);
};

solvePartOne();

const solvePartTwo = () => {
    let maxScenicScore = 0;

    const getScenicScore = (i, j) => {
        return visibleCountHorizontalFromLeft[i][j] * visibleCountHorizontalFromRight[i][j]
            * visibleCountVerticalFromUp[i][j] * visibleCountVerticalFromDown[i][j];
    };

    trees.forEach((row, indexRow) => {
       row.forEach((_, indexCol) => {
           maxScenicScore = Math.max(maxScenicScore, getScenicScore(indexRow, indexCol));
       });
    });

    console.log(maxScenicScore);
};

solvePartTwo();
