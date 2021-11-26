"use strict";

const answerEl = document.querySelector(".answer");
const calculationEl = document.querySelector(".calculation");
const ButtonsEl = document.querySelector(".buttons");
const eachButton = document.getElementsByClassName("eachbutton");
let arrNum = [];

for (let i = 0; i < eachButton.length; i++) {
  eachButton[i].addEventListener("click", function () {
    if (answerEl.textContent == 0) answerEl.textContent = null;
    if (calculationEl.textContent == "0 + 0 =")
      calculationEl.textContent = null;
    //NUMBERS
    if (eachButton[i].classList.contains("numbers")) {
      answerEl.textContent += eachButton[i].textContent;
    }
    //SINGLE OPERATIONS
    else if (eachButton[i].classList.contains("singular")) {
      if (eachButton[i].textContent == "%") answerEl.textContent /= 100;
      else if (eachButton[i].textContent == "1/x")
        answerEl.textContent = (1 / answerEl.textContent).toFixed(3);
      else if (eachButton[i].textContent == "x 2")
        answerEl.textContent = (answerEl.textContent ** 2).toFixed(3);
      else if (eachButton[i].textContent == "-/+")
        answerEl.textContent = -answerEl.textContent;
      else if (eachButton[i].textContent == ",") {
        const [...res] = answerEl.textContent.toString();
        if (res.includes(".")) return null;
        else answerEl.textContent = answerEl.textContent.toString() + ".";
      } else {
        answerEl.textContent = Math.sqrt(answerEl.textContent, 2).toFixed(3);
      }
    }
    //CONTROL ELEMENTS
    else if (eachButton[i].classList.contains("control")) {
      if (eachButton[i].textContent == "CE") {
        calculationEl.textContent = "0 + 0 =";
        answerEl.textContent = 0;
      } else if (eachButton[i].textContent == "C") {
        calculationEl.textContent = "0 + 0 =";
        answerEl.textContent = 0;
      } else {
        if (answerEl.textContent.toString().includes(".")) {
          let afterDot = 0;
          for (let i = 0; i < answerEl.textContent.toString().length; i++) {
            if (answerEl.textContent.toString()[i] == ".") afterDot = i;
          }
          const float = answerEl.textContent.toString().length - afterDot - 1;
          answerEl.textContent =
            (((answerEl.textContent * 10 ** float) / 10) | 0) /
            10 ** (float - 1);
        } else answerEl.textContent = (answerEl.textContent / 10) | 0;
      }
    }
    //OPERATIONS
    else if (eachButton[i].classList.contains("operations")) {
      if (eachButton[i].textContent == "/" && answerEl.textContent != 0) {
        arrNum = [answerEl.textContent, "/"];
        calculationEl.textContent = arrNum.join("");
        answerEl.textContent = 0;
      } else if (
        eachButton[i].textContent == "x" &&
        answerEl.textContent != 0
      ) {
        arrNum = [answerEl.textContent, "*"];
        calculationEl.textContent = arrNum.join(" ");
        answerEl.textContent = 0;
      } else if (
        eachButton[i].textContent == "-" &&
        answerEl.textContent != 0
      ) {
        arrNum = [answerEl.textContent, "-"];
        calculationEl.textContent = arrNum.join(" ");
        answerEl.textContent = 0;
      } else if (
        eachButton[i].textContent == "+" &&
        answerEl.textContent != 0
      ) {
        arrNum = [answerEl.textContent, "+"];
        calculationEl.textContent = arrNum.join(" ");
        answerEl.textContent = 0;
      } else if (eachButton[i].textContent == "=") {
        answerEl.textContent = eval(
          arrNum.join(" ") + answerEl.textContent
        ).toFixed(3);
        calculationEl.textContent = " ";
      }
    }
  });
}
