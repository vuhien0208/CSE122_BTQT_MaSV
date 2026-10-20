const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const keys = document.querySelector(".keys");


let expression = "";
let justCalculated = false;


// Xử lý khi bấm nút
keys.addEventListener("click", function (event) {
    const button = event.target.closest("button");


    if (!button) return;


    // Nút C: xóa tất cả
    if (button.dataset.action === "clear") {
        expression = "";
        justCalculated = false;
        expressionDisplay.textContent = "";
        resultDisplay.textContent = "0";
        return;
    }


    // Nút bằng: tính kết quả
    if (button.dataset.action === "equals") {
        calculate();
        return;
    }


    let value = button.dataset.value;


    // Tự chọn ngoặc mở hoặc ngoặc đóng
    if (value === "( )") {
        const open = (expression.match(/\(/g) || []).length;
        const close = (expression.match(/\)/g) || []).length;


        value = open > close ? ")" : "(";
    }


    // Sau khi tính xong, nhập số mới sẽ bắt đầu phép tính mới
    if (justCalculated && /[0-9.(]/.test(value)) {
        expression = "";
    }


    justCalculated = false;


    // Không cho nhập nhiều dấu chấm trong cùng một số
    if (value === ".") {
        const currentNumber = expression.split(/[+\-−×÷%()]/).pop();


        if (currentNumber.includes(".")) return;


        if (currentNumber === "") {
            value = "0.";
        }
    }


    expression += value;


    expressionDisplay.textContent = expression;
    resultDisplay.textContent = expression || "0";
});


// Hàm tính toán
function calculate() {
    if (expression.trim() === "") return;


    try {
        let formula = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-")
            .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");


        // Chỉ chấp nhận các ký tự toán học hợp lệ
        if (!/^[0-9+\-*/().\s]+$/.test(formula)) {
            throw new Error("Biểu thức không hợp lệ");
        }


        const answer = Function(
            '"use strict"; return (' + formula + ')'
        )();


        if (!Number.isFinite(answer)) {
            throw new Error("Không thể tính");
        }


        const result = Number(
            answer.toPrecision(12)
        ).toString();


        expressionDisplay.textContent = expression + " =";
        resultDisplay.textContent = result;


        expression = result;
        justCalculated = true;


    } catch (error) {
        resultDisplay.textContent = "Lỗi";
        justCalculated = true;
    }
}


// Hỗ trợ sử dụng bàn phím máy tính
document.addEventListener("keydown", function (event) {
    const key = event.key;


    if (/^[0-9.]$/.test(key) || ["+", "(", ")", "%"].includes(key)) {
        addKeyboardValue(key);
    } else if (key === "*") {
        addKeyboardValue("×");
    } else if (key === "/") {
        addKeyboardValue("÷");
    } else if (key === "-") {
        addKeyboardValue("−");
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Escape") {
        expression = "";
        justCalculated = false;
        expressionDisplay.textContent = "";
        resultDisplay.textContent = "0";
    } else if (key === "Backspace") {
        expression = expression.slice(0, -1);
        justCalculated = false;
        expressionDisplay.textContent = expression;
        resultDisplay.textContent = expression || "0";
    }
});


// Nhập phép tính từ bàn phím vật lý
function addKeyboardValue(value) {
    if (justCalculated && /[0-9.(]/.test(value)) {
        expression = "";
    }


    justCalculated = false;
    expression += value;


    expressionDisplay.textContent = expression;
    resultDisplay.textContent = expression || "0";
}