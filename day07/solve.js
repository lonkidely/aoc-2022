fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

let graph = {};
let vertexSize = {};
let used = {};

const addVertex = (v, u) => {
    if (!(v in graph)) {
        graph[v] = [];
    }
    graph[v].push(u);
};

const updateVertexSize = (v, size) => {
    if (!(v in vertexSize)) {
        vertexSize[v] = 0;
    }
    vertexSize[v] += size;
};

const updatePath = (path, next) => {
    if (next === "..") {
        path = path.substring(0, path.lastIndexOf("/"));
        if (path === "") {
            path = "/";
        }
    } else {
        if (path === "/") {
            path += next;
        } else {
            path += "/" + next;
        }
    }
    return path;
}

const dfs = (vertex) => {
    used[vertex] = true;

    if (!(vertex in graph)) return;

    graph[vertex].forEach(nextVertex => {
        if (!used[nextVertex]) {
            dfs(nextVertex);
            updateVertexSize(vertex, vertexSize[nextVertex]);
        }
    });
}

const prepare = () => {
    const allRows = data.split('\n');
    const rows = allRows.slice(1, allRows.length);

    let currentPath = "/";
    rows.forEach((row, index) => {
        const splitData = row.split(' ');
        if (splitData[0] === "$") {
            if (splitData[1] === "ls") {
                let currentIndex = index + 1;
                while (currentIndex < rows.length && rows[currentIndex][0] !== "$") {
                    [first, second] = rows[currentIndex].split(' ');
                    if (first !== "dir") {
                        updateVertexSize(currentPath, parseInt(first));
                    } else {
                        addVertex(currentPath, updatePath(currentPath, second));
                        updateVertexSize(updatePath(currentPath, second), 0);
                    }
                    currentIndex++;
                }
            } else {
                const nextVertex = splitData[2];
                currentPath = updatePath(currentPath, nextVertex);
            }
        }
    });

    dfs('/');
};

prepare();

const MaxSizeOfFile = 100000;

const solvePartOne = () => {
    const result = Object.values(vertexSize).filter(val => val <= MaxSizeOfFile).reduce((acc, val) => acc += val, 0);
    console.log(result);
};

const MaxSizeFileSystem = 70000000;
const RequiredSpace = 30000000;

const solvePartTwo = () => {
    const emptySpace = MaxSizeFileSystem - vertexSize['/'];
    const spaceRequired = RequiredSpace - emptySpace;

    const directorySizeToDelete = Object.values(vertexSize)
        .filter(val => val >= spaceRequired)
        .sort((a, b) => a - b)[0];
    console.log(directorySizeToDelete);
}

solvePartOne();
solvePartTwo();
