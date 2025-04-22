// script file
const calcDisplay = document.querySelector("#display");
const decimalBtn = document.querySelector(".decimal");

console.log(decimalBtn);
let displayValue = "0";


let number1 = 0;
let number2 = 0;
let operatorCount = 0;



function updateDisplay(){
    let valueToDisplay = Number(displayValue);

    // Check if it's a valid number
    if (!isNaN(valueToDisplay)) {
        displayValue = Number.isInteger(valueToDisplay)
            ? valueToDisplay
            : valueToDisplay.toFixed(1);
    }

    calcDisplay.textContent = displayValue;
}

function appendToDisplay(newString){

    console.log(newString);
    
    // actions if decimal is chosen. validated and diable the decimal button


   


    // actions if operators are chosen
    if (/[+\-*/]/.test(newString)) {
        // allow only 1 operator in display
        let lastChar = displayValue.toString().slice(-1);
        if (/[+\-*/]/.test(lastChar)) {
            displayValue = displayValue.toString().slice(0, -1) + newString;
            updateDisplay();
            return;
        }

        // compute if two operarors were clicked
        if(++operatorCount > 1){
            calculate(); 
            displayValue += newString;
            operatorCount=1;
            return;
        }   
    } 
    
    (displayValue===0) ? (displayValue = newString): (displayValue += newString)
       

    updateDisplay();
       
     //allow 1 decimal in the display only
    //  
     console.log(`display value ${displayValue}  testresult: ${/[.]/.test(displayValue)}`);
     decimalBtn.disabled = /[.]/.test(displayValue);
   

}   

function clearDisplay(){
    displayValue = 0;
    operatorCount = 0;
    updateDisplay();
}

function calculate() {
    if (operatorCount == 0){
        return;
    }
        
    const operatorMatch = displayValue.toString().match(/[+\-*/]/);
    const operator = operatorMatch[0];
            const parts = displayValue.split(operator);
            const num1 = Number(parts[0]);
            const num2 = Number(parts[1]);

    switch (operator) {
        case '+':
            displayValue = num1 + num2;
            break;
        case '-':
            displayValue = num1 - num2;
            break
        case '*':
            displayValue = num1 * num2;
            break;
        case '/':
            displayValue = num2 !== 0 ? num1 / num2 : 'Error';
            break
        default:
            return null;
    }
    
    updateDisplay();
    operatorCount = 0;
}

function deleteLastChar() {
    if (displayValue.toString().length > 1) {
        displayValue = displayValue.toString().slice(0, -1);
    } else {
        displayValue = 0;
    }
    updateDisplay();
}
