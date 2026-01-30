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

function findOperations(btnHTML, operations) {
    let operationsArray = [];
    for(let key in operations) operationsArray.push(operations[key]);
    return operationsArray.filter(operation => 
        btnHTML.includes(operation.replaceAll("x", "").replaceAll(")", "")));
}

function equals(display, operations, btnHTML) {
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

    let result;
    // console.log(operationsArray);
    // console.log(displayString);
    // console.log(numbersAsString);
    // console.log(operationsTrimmed);
    // console.log(firstOperation);
    // console.log(numbers);

    switch (firstOperation) {
        case calculatorOperationButtons.addition:
            result = addition(numbers[0], numbers[1]);
            break;

        case calculatorOperationButtons.subtract:
            result = subraction(numbers[0], numbers[1]);
            break;

        case calculatorOperationButtons.multiply:
            result = multiplication(numbers[0], numbers[1]);
            break;

        case calculatorOperationButtons.division:
            result = division(numbers[0], numbers[1]);
            if (!isNaN(result)) {
                result = Math.round(result*1000)/1000;
            }
            break;

        case calculatorOperationButtons.square:
            result = square(numbers[0]);
            break;

        case calculatorOperationButtons.sqaureRoot:
            result = squareRoot(numbers[0]);
            if (!isNaN(result)) {
                result = Math.round(result*1000)/1000;
            }
            break;

        case calculatorOperationButtons.factorial:
            result = factorial(numbers[0]);
            break;

        case calculatorOperationButtons.logarithm:
            result = logarithm(numbers[0]);
            if (!isNaN(result)) {
                result = Math.round(result*1000)/1000;
            }
            break;
    }
    display.innerHTML = `${result}`;
}

const calculatorOperationButtons = {
    C : "C",
    shift: "shift",
    square: "x^2",
    sqaureRoot: "sqrt(x)",
    multiply: "·",
    factorial: "!",
    addition: "+",
    logarithm: "log(x)",
    subtract: "-",
    cubeRoot: "x^1/3",
    division: "/",
    cube: "x^3",
    decimalPoint: ".",
    equals: "="
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
        regularFaceValue: calculatorOperationButtons.subtract,
        shiftFaceValue: calculatorOperationButtons.cubeRoot
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

equalsSign.addEventListener("click", () => {equals(display, calculatorOperationButtons, btnHTML);});

