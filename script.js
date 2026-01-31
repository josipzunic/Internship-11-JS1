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

function createHistoryItem(result, operation, numbers, historyArray, operationText) {
    const time = new Date;

    const historyObject = {
        number1: numbers[0],
        number2: numbers[1],
        operation: operation,
        operationText: operationText,
        result: result,
        timeOfOperation: time
    };

    historyArray.push(historyObject);
}

function clearHistory() {
    historyContainer.innerHTML = "";
}

function writeHistory(historyArray) {
    clearHistory();

    historyArray.forEach(element => {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        
        let item;
        if(!isNaN(element.number2)) {
            item = `${element.number1} ${element.operation} ${element.number2} = ${element.result}, ${element.timeOfOperation.getHours()}:${element.timeOfOperation.getMinutes()}`;
        } else {
            let calculation = element.operation.replaceAll("x", element.number1);
            item = `${calculation} = ${element.result}, ${element.timeOfOperation.getHours()}:${element.timeOfOperation.getMinutes()}`;
        }
        
        historyItem.innerHTML = item;
        historyContainer.appendChild(historyItem);
    });
}

function findOperationKey(operationSymbol) {
    const key = Object.keys(calculatorOperationButtons)
        .find(k => calculatorOperationButtons[k] === operationSymbol);
    return calculationOperationsText[key] || null;
}

function equals(display, operations, btnHTML, historyArray) {
    const operationsArray = findOperations(btnHTML, operations);
    const operationsTrimmed = operationsArray.map(operation => 
        operation.replaceAll("x", "").replaceAll(")", ""));
    const displayString = display.innerHTML.trim();
    const firstOperationTrimmed = operationsTrimmed[0];
    const firstOperation = operationsArray[0];
    const operationText = findOperationKey(firstOperation);

    const numbersAsString = displayString.split(firstOperationTrimmed).map(s => s.trim());
    const numbers = numbersAsString
        .map(numberString => parseFloat(numberString))
        .filter(numberCandidat => !isNaN(numberCandidat));

    const result = operationCase(firstOperation, numbers[0], numbers[1]);
    
    display.innerHTML = `${result}`;

    createHistoryItem(result, firstOperation, numbers, historyArray, operationText);
}

function filterOption(condition, historyArray) {
    let filteredHistory = historyArray.filter(element =>
        element.operation === condition || element.operationText === condition
    );
    if (filteredHistory.length === 0) {
        clearHistory();
        const historyItem = document.createElement("div");
        historyItem.innerHTML = "nema takvih operacija u povijesti, provjerite jeste li dobro       unijeli operaciju";
        historyContainer.appendChild(historyItem);
        historyItem.style.color="red";
    }
    else writeHistory(filteredHistory);
}

const calculatorOperationButtons = {
    C : "C",
    shift: "shift",
    square: "x^2",
    squareRoot: "sqrt(x)",
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
    filter: "filter",
    power: "OFF"
};

const calculationOperationsText = {
    square: "kvadriranje",
    squareRoot: "kvadratni korijen",
    multiply: "mnozenje",
    factorial: "faktorijel",
    addition: "zbrajanje",
    cubeRoot: "kubni korijen",
    logarithm: "logaritmiranje",
    subtract: "oduzimanje",
    division: "dijeljenje",
    cube: "kubiranje"
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
        shiftFaceValue: calculatorOperationButtons.squareRoot
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
        regularFaceValue: calculatorOperationButtons.filter,
        shiftFaceValue: calculatorOperationButtons.filter
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
        regularFaceValue: calculatorOperationButtons.power,
        shiftFaceValue: calculatorOperationButtons.power
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
const history = document.querySelector(".calculator-history");
const historyContainer = document.querySelector(".history-items");

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
    equals(display, calculatorOperationButtons, btnHTML, historyArray);
});

const historyButton = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.history
);

let isHistoryActive = false;

historyButton.addEventListener("click", () => {
    if (isHistoryActive) {
        history.style.display = "none";
        isHistoryActive = false;
        clearHistory();
    }
    else {
        history.style.display = "flex";
        isHistoryActive = true;
        writeHistory(historyArray);
    }
});

const filterHistory = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.filter
);


filterHistory.addEventListener("click", () => {
    const filter = document.getElementsByClassName("filter")[0];
    const input = document.querySelector('input[type="text"]');
    const placeholder = "+, -, ·, /, sqrt(x), x^2...";
    filter.classList.toggle("show");
    input.placeholder = placeholder;
});


const enterButton = document.querySelector('input[type="button"]');
const input = document.querySelector('input[type="text"]');
enterButton.addEventListener("click", () => {
    const inputContent = input.value;
    filterOption(inputContent, historyArray);
    input.value = "";
});

const powerButton = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.power
);
powerButton.classList.add("power-button");

let isActive = true;

powerButton.addEventListener("click", () => {
    isActive = !isActive;
    
    if (isActive) {
        calculator.style.pointerEvents = "auto";
        calculator.style.opacity = "1";
        powerButton.innerHTML = "OFF";
    } 
    else {
        calculator.style.pointerEvents = "none";
        calculator.style.opacity = "0.5";
        powerButton.innerHTML = "ON";
        clearHistory();
    }

    powerButton.style.pointerEvents = "auto";
});