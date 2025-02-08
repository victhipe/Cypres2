const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let operator = null;
let previousInput = null;

function updateDisplay() {
    display.value = currentInput;
}

function handleNumberClick(number) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperatorClick(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    currentInput = '0';
}

function handleEqualsClick() {
    if (operator === null) return;
    calculate();
    operator = null;
}

function handleClearClick() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    updateDisplay();
    previousInput = null;
}

buttons.addEventListener('click', (event) => {
    if (!event.target.value) return;

    const value = event.target.value;

    if (!isNaN(parseInt(value)) || value === '.') {
        handleNumberClick(value);
    } else if (['+', '-', '*', '/'].includes(value)) {
        handleOperatorClick(value);
    } else if (value === '=') {
        handleEqualsClick();
    } else if (value === 'C') {
        handleClearClick();
    }
});