const calcDisplay = document.querySelector("#display");
const decimalBtn = document.querySelector(".decimal");

let displayValue = "0";
let operatorCount = 0;

// ✅ Update the calculator display
function updateDisplay() {
    let valueToDisplay = Number(displayValue);

    // if (!isNaN(valueToDisplay)) {
    //     displayValue = Number.isInteger(valueToDisplay)
    //         ? valueToDisplay
    //         : valueToDisplay.toFixed(1);
    // }

    calcDisplay.textContent = displayValue;
}

// ✅ Append characters to the display and control decimal logic
function appendToDisplay(newChar) {
    console.log(`Input: ${newChar}`);

    // ✅ Prevent double decimals
    if (newChar === ".") {
        if (displayValue.slice(-1) === ".") return;
    
        const [operator, num1, num2] = getDisplayVariables();
        const current = operator ? num2.toString() : num1.toString();
        if (current.includes(".")) return;
    }

    // ✅ Handle operator logic
    if (/[+\-*/]/.test(newChar)) {
        const lastChar = displayValue.toString().slice(-1);
        if (/[+\-*/]/.test(lastChar)) {
            displayValue = displayValue.toString().slice(0, -1) + newChar;
            updateDisplay();
            return;
        }

        if (++operatorCount > 1) {
            calculate(); 
            displayValue += newChar;
            operatorCount = 1;
            return;
        }
    }

    // ✅ Prevent leading zero
   // ✅ Handle starting decimal properly
    if (displayValue === "0" && newChar === ".") {
        displayValue = "0.";
    } else if (displayValue === "0") {
                displayValue = newChar;
            } else {
                displayValue += newChar;
            }


    updateDisplay();
    updateDecimalButton();
}

// ✅ Enable/disable decimal based on current number
function updateDecimalButton() {
    const [operator, num1, num2] = getDisplayVariables();
    const current = operator ? num2.toString() : num1.toString();
    decimalBtn.disabled = current.includes(".");
}

// ✅ Clear the calculator state
function clearDisplay() {
    displayValue = "0";
    operatorCount = 0;
    decimalBtn.disabled = false;
    updateDisplay();
}

// ✅ Parse the display into operator, num1, num2
function getDisplayVariables() {
    const operatorMatch = displayValue.toString().match(/[+\-*/]/);

    let operator = '';
    let num1 = 0;
    let num2 = 0;

    if (operatorMatch) {
        operator = operatorMatch[0];
        const [part1, part2 = "0"] = displayValue.split(operator);
        num1 = Number(part1);
        num2 = Number(part2);
    } else {
        num1 = Number(displayValue);
    }

    return [operator, num1, num2];
}

// ✅ Perform calculation based on the operator
function calculate() {
    if (operatorCount === 0) return;

    const [operator, num1, num2] = getDisplayVariables();
    console.log(`Calculating: ${num1} ${operator} ${num2}`);

    switch (operator) {
        case '+':
            displayValue = num1 + num2;
            break;
        case '-':
            displayValue = num1 - num2;
            break;
        case '*':
            displayValue = num1 * num2;
            break;
        case '/':
            displayValue = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            return;
    }

    operatorCount = 0;
    updateDisplay();
    updateDecimalButton();
}

// ✅ Handle backspace/delete
function deleteLastChar() {
    displayValue = displayValue.length > 1
        ? displayValue.slice(0, -1)
        : "0";

    updateDisplay();
    updateDecimalButton();
}
