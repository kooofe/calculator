let operator = '';
let displayVar = '';
let displayVar2 = '';
let backUpVar = ''
let result = 0;

const displayShow = document.querySelector('.calculator-display');

function operate() {
    const operators = document.querySelectorAll('.operator-btn');
    operators.forEach((operator_btn) => {
        operator_btn.addEventListener('click', () => {
            if (displayVar2 === '') {
                displayVar2 = displayVar;
                displayVar = '';
                operator = operator_btn.value;
            } else {
                // Check if the pressed operator is the same as the current operator
                if (operator === operator_btn.value) {
                    // Perform the operation again with the same operands
                    calculate();
                    displayVar2 = result;
                    displayVar = ''
                } else {
                    // If the operators are different, perform the current operation
                    calculate();
                    displayVar2 = result;
                    displayVar = ''
                    operator = operator_btn.value;
                }
            }
        });
    });
}

function calculate() {
    if (displayVar === '') {
        return;
    }
    if (operator === '+') {
        result = add(parseFloat(displayVar2), parseFloat(displayVar));
    } else if (operator === '-') {
        result = subtract(parseFloat(displayVar2), parseFloat(displayVar));
    } else if (operator === 'x') {
        result = multiply(parseFloat(displayVar2), parseFloat(displayVar));
    } else if (operator === '/') {
        if (displayVar === '0') {
            displayShow.textContent = "Error: You can't divide by zero!";
            return;
        }
        result = divide(parseFloat(displayVar2), parseFloat(displayVar));
        if (!isFinite(result)) {
            displayShow.textContent = "Error: Infinity! Math is hard.";
            return;
        }
    }
    result = roundResult(result);
    displayShow.textContent = result;
}
function roundResult(value) {
    // Round to 5 decimal places
    return Math.round(value * 100000) / 100000;
}

function populateDisplay() {
    const number_buttons = document.querySelectorAll(".numb-btn");
    number_buttons.forEach((button) => {
        button.addEventListener("click", () => {
            displayVar += button.value;
            displayShow.textContent = displayVar;
        });
    });
}

function clearDisplay() {
    const clear_btn = document.querySelector('.clear-btn');
    clear_btn.addEventListener('click', () => {
        displayVar = '';
        displayVar2 = '';
        displayShow.textContent = '';
    });
}

function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

populateDisplay();
operate();
clearDisplay();
