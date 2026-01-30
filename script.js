function writeButtonsToHTML(array, HTMLElement, property) {
    for(let i = 0; i < array.length; i++) {
        HTMLElement[i].innerHTML = array[i][property];
    }
}

function writeToDisplay(text, display) {
    display.innerHTML += text;
}

// function checkDisplayOverload(displayText, operation) {
//     return 0;
// }

function addition(x, y) {
    return x+y;
}

function subraction(x, y) {
    return x-y;
}

function multiplication(x, y) {
    return x*y;
}

function division(x, y) {
    if (y === 0) return "division by 0!";
    return x/y;
}

function square(x) {
    return x*x;
}

function squareRoot(x) {
    if (x < 0) return "square root of negative number!";
    return Math.sqrt(x);
}

function factorial(x) {
    if (x < 0) return "factorial of negative number!";
    const factors = [];
    for(let i = x; i >= 1; i--) factors.push(i);
    
    const factorial = factors.reduce((factor, product) => product *= factor, 1);
    return factorial;
}

function logarithm(x) {
    if (x < 0) return "logarithm of negative number!";
    return Math.log(x);
}

function cube(x) {
    return square(x)*x;
}

function cubeRoot(x) {
    return Math.sign(x) * Math.pow(Math.abs(x), 1/3);
}

function findOperations(btnHTML, operations) {
    let operationsArray = [];
    for(let key in operations) operationsArray.push(operations[key]);
    const found = operationsArray.filter(operation => 
        btnHTML.includes(operation.replaceAll("x", "").replaceAll(")", "")));
    
    return found.sort((a, b) => {
    const aTrimmed = a.replaceAll("x", "").replaceAll(")", "");
    const bTrimmed = b.replaceAll("x", "").replaceAll(")", "");
    return bTrimmed.length - aTrimmed.length;
});
}

function operationCase(firstOperation, number1, number2) {
    let result;

    switch (firstOperation) {
        case calculatorOperationButtons.addition:
            result = addition(number1, number2);
            break;

        case calculatorOperationButtons.subtract:
            result = subraction(number1, number2);
            break;

        case calculatorOperationButtons.multiply:
            result = multiplication(number1, number2);
            break;

        case calculatorOperationButtons.division:
            result = division(number1, number2);
            if (!isNaN(result)) {
                result = Math.round(result*1000)/1000;
            }
            break;

        case calculatorOperationButtons.square:
            result = square(number1);
            break;

        case calculatorOperationButtons.sqaureRoot:
            result = squareRoot(number1);
            if (!isNaN(result)) {
                result = Math.round(result*1000)/1000;
            }
            break;

        case calculatorOperationButtons.factorial:
            result = factorial(number1);
            break;

        case calculatorOperationButtons.logarithm:
            result = logarithm(number1);
            if (!isNaN(result)) {
                result = Math.round(result*1000)/1000;
            }
            break;

        case calculatorOperationButtons.cube:
            result = cube(number1);
            break;

        case calculatorOperationButtons.cubeRoot:
            result = cubeRoot(number1);
            break;
    }

    return result;
}

function writeHistory(history, display, result, operation, numbers, historyArray) {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    const time = new Date;

    const historyObject = {
        number1: numbers[0],
        number2: numbers[1],
        operation: operation,
        result: result,
        timeOfOperation: time
    };

    historyArray.push(historyObject);

    let item;

    if(!isNaN(historyObject.number2))
        item = `${historyObject.number1} ${historyObject.operation} ${historyObject.number2} = ${historyObject.result}, ${historyObject.timeOfOperation.getHours()}:${historyObject.timeOfOperation.getMinutes()}`;
    else {
        let calculation = historyObject.operation.replaceAll("x", historyObject.number1);
        item = `${calculation} = ${historyObject.result}, ${historyObject.timeOfOperation.getHours()}:${historyObject.timeOfOperation.getMinutes()}`;
    }
    historyItem.innerHTML = item;
    history.appendChild(historyItem);  
}



function equals(display, operations, btnHTML, history, historyArray) {
    const operationsArray = findOperations(btnHTML, operations);
    const operationsTrimmed = operationsArray.map(operation => 
        operation.replaceAll("x", "").replaceAll(")", ""));
    const displayString = display.innerHTML.trim();
    const firstOperationTrimmed = operationsTrimmed[0];
    const firstOperation = operationsArray[0];
    const numbersAsString = displayString.split(firstOperationTrimmed).map(s => s.trim());
    const numbers = numbersAsString
        .map(numberString => parseFloat(numberString))
        .filter(numberCandidat => !isNaN(numberCandidat));

    const result = operationCase(firstOperation, numbers[0], numbers[1]);
    
    let tempDisplayText = display.innerHTML;
    display.innerHTML = `${result}`;
    writeHistory(history, tempDisplayText, result, firstOperation, numbers, historyArray);
}

const calculatorOperationButtons = {
    C : "C",
    shift: "shift",
    square: "x^2",
    sqaureRoot: "sqrt(x)",
    multiply: "·",
    factorial: "!",
    addition: "+",
    cubeRoot: "cbrt(x)",
    logarithm: "log(x)",
    subtract: "-",
    division: "/",
    cube: "x^3",
    decimalPoint: ".",
    equals: "=",
    history: "history",
    filterByOperation: "f: op",
    filterByText: "f: text"
};


const calculatorButtons = [
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.C,
        shiftFaceValue: calculatorOperationButtons.C
    }, 
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.shift,
        shiftFaceValue: calculatorOperationButtons.shift
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.square,
        shiftFaceValue: calculatorOperationButtons.sqaureRoot
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.multiply,
        shiftFaceValue: calculatorOperationButtons.factorial
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.addition,
        shiftFaceValue: calculatorOperationButtons.logarithm
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.history,
        shiftFaceValue: calculatorOperationButtons.history
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.division,
        shiftFaceValue: calculatorOperationButtons.cube
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.filterByOperation,
        shiftFaceValue: calculatorOperationButtons.filterByOperation
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.subtract,
        shiftFaceValue: calculatorOperationButtons.cubeRoot
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.filterByText,
        shiftFaceValue: calculatorOperationButtons.filterByText
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.decimalPoint,
        shiftFaceValue: calculatorOperationButtons.decimalPoint
    },
    {
        regularFace: "regularFaceValue",
        shiftFace: "shiftFaceValue",
        regularFaceValue: calculatorOperationButtons.equals,
        shiftFaceValue: calculatorOperationButtons.equals
    }
];

const numberButtons = [
    {
        numberFace: "numberValue",
        numberValue: "9",
    },
    {
        numberFace: "numberValue",
        numberValue: "8",
    },
    {
        numberFace: "numberValue",
        numberValue: "7",
    },
    {
        numberFace: "numberValue",
        numberValue: "6",
    },
    {
        numberFace: "numberValue",
        numberValue: "5",
    },
    {
        numberFace: "numberValue",
        numberValue: "4",
    },
    {
        numberFace: "numberValue",
        numberValue: "3",
    },
    {
        numberFace: "numberValue",
        numberValue: "2",
    },
    {
        numberFace: "numberValue",
        numberValue: "1",
    },
    {
        numberFace: "numberValue",
        numberValue: "0",
    }
];

const body = document.querySelector("body");
const calculator = body.querySelector("#calculator");
const buttons = calculator.querySelector(".buttons");
const button = buttons.querySelectorAll(".button");
const numberButton = buttons.querySelectorAll(".number-button");
const display = calculator.querySelector(".display");
const historyItems = document.querySelector(".calculator-history .history-items");
const history = document.querySelector(".calculator-history");

writeButtonsToHTML(calculatorButtons, button, calculatorButtons[0].regularFace);
writeButtonsToHTML(numberButtons, numberButton, numberButtons[0].numberFace);

const buttonsFromHTML = [...button];

const shiftButton = buttonsFromHTML.find(btn => btn.innerHTML === calculatorOperationButtons.shift);
const CButton = buttonsFromHTML.find(btn => btn.innerHTML === calculatorOperationButtons.C);
let shiftActive = false;

shiftButton.addEventListener("click", () => {
    if (shiftActive) {
        writeButtonsToHTML(calculatorButtons, button, calculatorButtons[0].regularFace);
        shiftActive = false;
    }
    else {
        writeButtonsToHTML(calculatorButtons, button, calculatorButtons[0].shiftFace);
        shiftActive = true;
    }
});

numberButton.forEach(btn => {
    btn.addEventListener("click", () => {writeToDisplay(btn.innerHTML, display);});
});

CButton.addEventListener("click", () => {
    display.innerHTML = "";
});

const decimalPointButton = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.decimalPoint);

decimalPointButton.addEventListener("click", () => {
    writeToDisplay(decimalPointButton.innerHTML, display);
});

const nonShiftOperations = [
    calculatorOperationButtons.addition,
    calculatorOperationButtons.multiply,
    calculatorOperationButtons.subtract,
    calculatorOperationButtons.division,
    calculatorOperationButtons.square
];

const nonShiftButtons = buttonsFromHTML.filter(btn => {
    return nonShiftOperations.includes(btn.innerHTML);
});

let btnHTML;
let historyArray = [];

nonShiftButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let tempHTML = btn.innerHTML;

        if(btn.innerHTML.includes("x") || btn.innerHTML.includes(")")) {
            tempHTML = tempHTML.replaceAll("x", "").replaceAll(")", "");
        }
        writeToDisplay(tempHTML, display);
        btnHTML = display.innerHTML;
    });
});

const equalsSign = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.equals);


equalsSign.addEventListener("click", () => {
    equals(display, calculatorOperationButtons, btnHTML, historyItems, historyArray);
});

const historyButton = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.history
);

let isHistoryActive = false;

historyButton.addEventListener("click", () => {
    if (isHistoryActive) {
        history.style.display = "none";
        isHistoryActive = false;
    }
    else {
        history.style.display = "flex";
        isHistoryActive = true;
    }
});
