const form = document.getElementById("registerForm");


const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


// Hiển thị thông báo và đổi màu viền
function showError(input, errorId, message) {
    const error = document.getElementById(errorId);


    if (message !== "") {
        input.classList.add("invalid");
        input.classList.remove("valid");


        error.textContent = "✗ " + message;
        error.className = "message error";
    } else {
        input.classList.remove("invalid");
        input.classList.add("valid");


        error.textContent = "✓ Hợp lệ";
        error.className = "message success";
    }
}


// Kiểm tra họ tên
function validateFullname() {
    if (fullname.value.trim() === "") {
        showError(
            fullname,
            "fullnameError",
            "Họ tên không được để trống"
        );
        return false;
    }


    showError(fullname, "fullnameError", "");
    return true;
}


// Kiểm tra email bằng Regex
function validateEmail() {
    const value = email.value.trim();


    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (value === "") {
        showError(email, "emailError",
            "Email không được để trống");
        return false;
    }


    if (!emailRegex.test(value)) {
        showError(email, "emailError",
            "Email không hợp lệ");
        return false;
    }


    showError(email, "emailError", "");
    return true;
}


// Kiểm tra mật khẩu tối thiểu 6 ký tự
function validatePassword() {
    if (password.value.length < 6) {
        showError(password, "passwordError",
            "Mật khẩu phải có ít nhất 6 ký tự");
        return false;
    }


    showError(password, "passwordError", "");
    return true;
}


// Kiểm tra xác nhận mật khẩu
function validateConfirmPassword() {
    if (confirmPassword.value === "") {
        showError(confirmPassword, "confirmPasswordError",
            "Vui lòng xác nhận mật khẩu");
        return false;
    }


    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "confirmPasswordError",
            "Mật khẩu xác nhận không khớp");
        return false;
    }


    showError(confirmPassword, "confirmPasswordError", "");
    return true;
}


// Kiểm tra khi rời khỏi ô nhập
fullname.addEventListener("blur", validateFullname);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);


// Kiểm tra lại xác nhận nếu mật khẩu thay đổi
password.addEventListener("input", function () {
    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }
});


// Xử lý khi nhấn nút Đăng ký
form.addEventListener("submit", function (event) {
    // Ngăn form gửi khi chưa kiểm tra dữ liệu
    event.preventDefault();


    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();


    const successMessage =
        document.getElementById("successMessage");


    if (
        isFullnameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmValid
    ) {
        successMessage.textContent = "✓ Đăng ký thành công!";
        successMessage.style.color = "#16a34a";
    } else {
        successMessage.textContent = "";
    }
});


