import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1";


const emailData = {
    email: String
};

const forgetPassworData = {
    verificationCode: String,
    password: String,
    rePassword: String,
}
  
export const isEmail = (email) => {
    const emailData = { email };
    return axios({
        method: "POST",
        url: BASE_URL.concat("/user/account/password/forgotPassword"),
        data: emailData
    })
}

export const forgetPassword = ( verificationCode, password, rePassword ) => {
    const forgetPassworData = { verificationCode, password, rePassword };
    return axios({
        method: "POST",
        url: BASE_URL.concat("/user/account/password/changePassword"),
        data: forgetPassworData
    })
}
