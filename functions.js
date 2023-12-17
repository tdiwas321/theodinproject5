let operator = "";
let currentValue = "";
let previousValue = "";

document.addEventListener("DOMContentLoaded", function () {
  let clear = document.querySelector(".clearButton");
  let equal = document.querySelector(".buttonEqual");
  let decimal = document.querySelector(".buttonDecimal");

  let numbers = document.querySelectorAll(".buttonNumber");
  let operators = document.querySelectorAll(".buttonOperator");

  let current = document.querySelector(".currentInput");
  let previous = document.querySelector(".prevInput");

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      current.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      previous.textContent = previousValue + "" + operator;
      current.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    operator = "";
    previousValue = "";
    currentValue = "";

    previous.textContent = currentValue;
    current.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (previousValue !== "" && currentValue !== "") {
      calculate();
      previous.textContent = "";
      if (previousValue.length <= 5) {
        current.textContent = previousValue;
      } else {
        current.textContent = previousValue.slice(0, 5) + "...";
      }
    }
  });

  decimal.addEventListener("click",function(){
    addDecimal();
  })
});

function handleNumber(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "*") {
    previousValue *= currentValue;
  } else if (operator === "/") {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if(!currentValue.includes(".")){
        currentValue += ".";
    }
}