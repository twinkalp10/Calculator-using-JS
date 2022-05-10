let buffer = "0";
let runningTotal = 0;
let previosOperator;
let screen = document.querySelector(".screen");

document
  .querySelector(".cal-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  console.log(value);
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  show();
}

function show() {
  screen.innerText = buffer;
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
  console.log("this is number");
}

function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "<-":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
    case "=":
      if (previosOperator === null) {
        return;
      } else {
        flush(parseInt(buffer));
        previosOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
        break;
      }
    default:
      handleMath(value);
      break;
  }
  console.log("this is symbol");
}

function handleMath(value) {
  if (buffer === "0") {
    return;
  }
  let intbuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intbuffer;
  } else {
    flush(intbuffer);
  }
  previosOperator = value;
  buffer = "0";
}

function flush(intbuffer) {
  if (previosOperator === "+") {
    runningTotal += intbuffer;
  } else if (previosOperator === "-") {
    runningTotal -= intbuffer;
  } else if (previosOperator === "*") {
    runningTotal *= intbuffer;
  } else {
    runningTotal /= intbuffer;
  }
}
