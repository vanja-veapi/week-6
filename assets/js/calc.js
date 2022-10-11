const output = document.querySelector("#output");
const equal = document.querySelector("#equal");
const del = document.querySelector("#delete");
const reset = document.querySelector("#reset");
const nums = document.querySelectorAll(".key__num");
const operatorBtns = document.querySelectorAll(".operator")

const operatorList = ["+", "-", "*", "/"];

output.value = "0"
let previousNumber = 0;
let operator = null;
let dot = false;

window.addEventListener("load", function () {
  reset.addEventListener("click", restartCalculator);
  del.addEventListener("click", removeLastCharacter);

  nums.forEach(num => num.addEventListener('click', e => printNumber(e.target.value)));
  operatorBtns.forEach(operatorBtn => operatorBtn.addEventListener('click', e => printOperator(e.target.value)))
  equal.addEventListener("click", calc);

  this.window.addEventListener("keydown", e => {
    if (e.key === "Backspace") {
      return removeLastCharacter();
    } else if (e.key === "Enter") {
      return calc();
    }

    operatorList.includes(e.key) ? printOperator(e.key) : printNumber(e.key)
  });
});

function printNumber(val) {
  if (val === "." && dot) return;

  if (!isNaN(Number(val)) || val === ".") {
    if (val === ".") {
      dot = true;
      return output.value += val
    }

    if (val === "-" || val === "=") return

    output.value === "0" ? output.value = val : output.value += val;
  }
}

function printOperator(o) {
  if (!operator) {
    // Restartujem dot na false da bi drugi broj isto mogao da bude decimalan
    dot = false;

    operator = o;
    output.value += o
  }
};

function calculate(a, b, operator) {
  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "x") {
    return a * b;
  } else if (operator === "/") {
    return a / b;
  }
}

function removeLastCharacter() {
  let str = output.value.substring(0, output.value.length - 1);
  dot = false;
  return output.value = str;
}

function calc() {
  previousNumber = output.value; // Ako samo kliknem jednako da mi ispise ovaj rez
  if (operator) {
    let firstNegativeNumber = null
    // Ako je prvi karakter minus, to znaci da je negativan broj i ispod kazem programu izbaci mi - iz stringa i onda ga ubacujem u sledecem ifu...
    const splitString = output.value[0] === "-" ? output.value.substr(1).split(operator) : output.value.split(operator);

    if (output.value[0] === "-") {
      firstNegativeNumber = "-".concat(splitString[0]);
    }

    previousNumber = calculate(parseFloat(output.value[0] === "-" ? firstNegativeNumber : splitString[0]), parseFloat(splitString[1]), operator)
    operator = null;
  }

  output.value = previousNumber;
}

function restartCalculator() {
  output.value = "0"
  previousNumber = 0;
  operator = null;
  dot = false;
}