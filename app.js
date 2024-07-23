/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

/*-------------------------------- Variables --------------------------------*/
let currentInput = '';
let previousValue = ''; 
let operator = ''; 

/*------------------------ Cached Element References ------------------------*/


/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const value = event.target.innerText;

    if (value === 'C') {
      
      currentInput = '';
      previousValue = '';
      operator = '';
      display.innerText = '0';
    } else if (value === '=') {
      
      if (currentInput && previousValue && operator) {
        try {
          const result = calculate(Number(previousValue), operator, Number(currentInput));
          display.innerText = result;
          currentInput = result;
          operator = '';
          previousValue = '';
        } catch {
          display.innerText = 'Error';
          currentInput = '';
          operator = '';
          previousValue = '';
        }
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
     
      if (currentInput) {
        if (previousValue && operator) {
         
          try {
            previousValue = String(calculate(Number(previousValue), operator, Number(currentInput)));
            display.innerText = previousValue;
          } catch {
            display.innerText = 'Error';
            previousValue = '';
            operator = '';
            currentInput = '';
            return;
          }
        } else {
          previousValue = currentInput;
          display.innerText = '';
        }
        currentInput = '';
        operator = value;
      }
    } else if (value === '.') {
     
      if (!currentInput.includes('.')) {
        currentInput += value;
        display.innerText = currentInput;
      }
    } else {
     
      if (currentInput === '0' && value !== '.') {
        currentInput = value;  
      } else {
        currentInput += value;  
      }
      display.innerText = currentInput;
    }
  });
});

/*-------------------------------- Functions --------------------------------*/
function calculate(a, op, b) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    default: return 0;
  }
}
