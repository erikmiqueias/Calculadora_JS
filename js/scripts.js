const display = document.querySelector("#display-content");
const buttons = document.querySelectorAll(".button");
const clearButton = document.querySelector("#clear-button");
let currentValue = null;
let oldValue = null;
let currentOperator = null;
let result = 0;

const clearDisplay = () => {
  display.textContent = "0";
  currentValue = null;
  oldValue = null;
  currentOperator = null;
  result = 0;
};

const operators = ["+", "-", "*", "/", "=", "C"];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.value;

    if (operators.includes(value)) {
      switch (value) {
        case "C":
          clearDisplay();
          break;
        case "=":
          if (
            currentValue !== null &&
            oldValue !== null &&
            currentOperator !== null
          ) {
            switch (currentOperator) {
              case "+":
                result = oldValue + parseFloat(currentValue);
                break;
              case "-":
                result = oldValue - parseFloat(currentValue);
                break;
              case "*":
                result = oldValue * parseFloat(currentValue);
                break;
              case "/":
                if (parseFloat(currentValue) !== 0) {
                  result = oldValue / parseFloat(currentValue);
                } else {
                  display.textContent = "Erro na divisão!";
                  return;
                }
                break;
            }
            display.textContent = result;
            oldValue = result;
            currentValue = oldValue;
            currentOperator = null;
          }
          break;
        default:
          if (currentValue !== null) {
            oldValue = parseFloat(display.textContent);
            currentOperator = value;
            display.textContent = value;
            currentValue = null;
          }
          break;
      }
    } else {
      if (
        display.textContent === "0" ||
        operators.includes(display.textContent)
      ) {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
      currentValue = display.textContent;
    }
  });
});
