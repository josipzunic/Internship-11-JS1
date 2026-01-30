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

function findOperation(display, operations) {
    const displayString = display.innerHTML;
    let operationsArray = [];
    for(let key in operations) operationsArray.push(operations[key]);
    return operationsArray.find(operation => displayString.includes(operation));
}

function equals(display, operations) {
    const operation = findOperation(display, operations);
    const displayString = display.innerHTML;
    const numbersAsString = displayString.split(operation);
    const numbers = numbersAsString.map(numberString => parseFloat(numberString));

    let result;

    switch (operation) {
        case calculatorOperationButtons.addition:
            result = addition(numbers[0], numbers[1]);
            break;
        case calculatorOperationButtons.subtract:
            result = subraction(numbers[0], numbers[1]);
            break;
    }

    console.log(result);
}

const calculatorOperationButtons = {
    C : "C",
    shift: "shift",
    square: "x^2",
    sqaureRoot: "sqrt(x)",
    multiply: "x",
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

const nonShiftButtons = buttonsFromHTML.filter(btn => 
    nonShiftOperations.includes(btn.innerHTML));

nonShiftButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(btn.innerHTML.includes("x") || btn.innerHTML.includes(")")) {
            btn.innerHTML = btn.innerHTML.replace("x", "");
            btn.innerHTML = btn.innerHTML.replace(")", "");
        }
        writeToDisplay(btn.innerHTML, display);
    });
});

const equalsSign = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.equals);

equalsSign.addEventListener("click", () => {equals(display, calculatorOperationButtons);});

