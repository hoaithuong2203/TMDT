export const validateEmail = (valueToValidate) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(valueToValidate);
}

export const validatePassword = (newPassword, confirmPassword, code) => {
    if (newPassword === confirmPassword) {
        return true; // Mật khẩu và xác nhận mật khẩu khớp nhau
    } else {
        return false; // Mật khẩu và xác nhận mật khẩu không khớp
    }
};


export const validate = (email, password) => {
    if (!email || !password) {
        alert("Email or Password null")
        return false
    }

    if (!validateEmail(email)) {
        return false
    }

    const trimmedPassword = password.trim();

    if (trimmedPassword.length < 8) {
        alert("Mật khẩu phải có ít nhất 8 ký tự");
        return false
    }

    if (/\s/.test(trimmedPassword)) {
        alert("Mật khẩu không được chứa khoảng trắng");
        return false
    }
    return true;
}