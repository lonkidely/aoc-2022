fs = require('fs');
path = require('path');

const txtPath = path.resolve(__dirname, 'txt');
const fileName = 'input'
const inputFilePath = txtPath + '/' + fileName + '.txt';

const data = fs.readFileSync(inputFilePath, 'utf-8');

let monkeys = [];
let lcm = 1n;

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

const prepare = () => {
    const rows = data.split('\n').concat("");

    let currentMonkey = {};

    for (let i = 0; i < rows.length / 7; i++) {
        currentMonkey["inspected_items_count"] = 0;

        const indexRow = rows[i * 7].trim().split(' ');
        currentMonkey["index"] = BigInt(indexRow[1].slice(0, indexRow[1].length - 1));

        const itemsRow = rows[i * 7 + 1].trim().split(' ');
        currentMonkey["items"] = itemsRow.slice(2, itemsRow.length).map(el => {
            if (el[el.length - 1] === ",") {
                el = el.slice(0, el.length - 1);
            }
            return BigInt(el);
        });

        const operationRow = rows[i * 7 + 2].trim().split(' ');
        currentMonkey["operation"] = operationRow.slice(3, operationRow.length);

        const testRow = rows[i * 7 + 3].trim().split(' ');
        currentMonkey["divisible"] = BigInt(testRow[3]);

        lcm *= BigInt(testRow[3]);

        const trueRow = rows[i * 7 + 4].trim().split(' ');
        currentMonkey["true"] = BigInt(trueRow[5]);

        const falseRow = rows[i * 7 + 5].trim().split(' ');
        currentMonkey["false"] = BigInt(falseRow[5]);

        monkeys.push(currentMonkey);
        currentMonkey = {};
    }
};


const solvePartOne = () => {
    monkeys = [];

    prepare();

    const countRounds = 20;

    for (let i = 0; i < countRounds; i++) {
        monkeys.forEach(monkey => {
            if (monkey["items"].length === 0) return;
            monkey["items"].forEach(item => {
                if (monkey["operation"][2] === "old") {
                    item = operations[monkey["operation"][1]](item, item);
                } else {
                    item = operations[monkey["operation"][1]](item, BigInt(monkey["operation"][2]));
                }

                item %= lcm;
                item = item / 3n;

                if (item % monkey["divisible"] === 0n) {
                    monkeys[monkey["true"]].items.push(item);
                } else {
                    monkeys[monkey["false"]].items.push(item);
                }

                monkey["inspected_items_count"]++;
            });

            monkey["items"] = [];
        });
    }

    monkeys.sort((a, b) => b["inspected_items_count"] - a["inspected_items_count"]);

    console.log(monkeys[0]["inspected_items_count"] * monkeys[1]["inspected_items_count"]);
};

solvePartOne();

const solvePartTwo = () => {
    monkeys = [];

    prepare();

    const countRounds = 10000;

    for (let i = 0; i < countRounds; i++) {
        monkeys.forEach(monkey => {
            if (monkey["items"].length === 0) return;
            monkey["items"].forEach(item => {
                if (monkey["operation"][2] === "old") {
                    item = operations[monkey["operation"][1]](item, item);
                } else {
                    item = operations[monkey["operation"][1]](item, BigInt(monkey["operation"][2]));
                }

                item %= lcm;

                if (item % monkey["divisible"] === 0n) {
                    monkeys[monkey["true"]].items.push(item);
                } else {
                    monkeys[monkey["false"]].items.push(item);
                }

                monkey["inspected_items_count"]++;
            });

            monkey["items"] = [];
        });
    }

    monkeys.sort((a, b) => b["inspected_items_count"] - a["inspected_items_count"]);

    console.log(monkeys[0]["inspected_items_count"] * monkeys[1]["inspected_items_count"]);
};

solvePartTwo();