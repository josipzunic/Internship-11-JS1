function writeButtonsToHTML(array, HTMLElement, property) {
    for(let i = 0; i < array.length; i++) {
        HTMLElement[i].innerHTML = array[i][property];
    }
}

function writeToDisplay(text, display) {
    display.innerHTML += text;
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

shiftButton.addEventListener("click", event => {
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
    btn.addEventListener("click", event => {writeToDisplay(btn.innerHTML, display);});
});

CButton.addEventListener("click", event => {
    display.innerHTML = "";
});

const decimalPointButton = buttonsFromHTML.find(btn => 
    btn.innerHTML === calculatorOperationButtons.decimalPoint);

decimalPointButton.addEventListener("click", event => {
    writeToDisplay(decimalPointButton.innerHTML, display);
});





