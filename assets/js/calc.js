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

    if (output.value === "0") output.value = "";
    output.value += val;
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
  } else if (operator === "*") {
    return a * b;
  } else if (operator === "/") {
    return a / b;
  }
}

function removeLastCharacter() {
  if (output.value.length === 1) output.value = "00";

  let str = output.value.substring(0, output.value.length - 1);
  dot = false;
  return output.value = str;
}

function calc() {
  previousNumber = output.value; // Ako samo kliknem jednako da mi ispise ovaj rez
  if (operator) {
    // Ako je prvi karakter minus, to znaci da je negativan broj i ispod kazem programu izbaci mi - iz stringa i onda ga ubacujem u sledecem ifu...
    const [a, b] = output.value[0] === "-" ? output.value.substr(1).split(operator) : output.value.split(operator);

    if (output.value[0] === "-") {
      a = "-".concat(splitString[0]);
    }

    // Ako korisnik pokusa uradi operaciju tipa 3 - prazno -> // Broj b ce da ima vrednost isto kao A, inace b je u tom trenutku <empty string>
    previousNumber = !b ? calculate(parseFloat(a), parseFloat(a), operator) : calculate(parseFloat(a), parseFloat(b), operator)
    if (Number.isInteger(previousNumber)) {
      previousNumber.toFixed(2);
    }
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