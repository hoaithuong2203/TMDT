import axios from "axios";
import * as SecureStore from 'expo-secure-store'

const BASE_URL = "http://10.0.2.2:8080/api/v1";

const loginData = {
  email: String,
  password: String,
};

const registerData = {
  username: String,
  email: String,
  password: String,
};

export const LoginStore = (email, password) => {
  const loginData = { email, password }; // Thêm const để đảm bảo tạo biến local
  console.log(email);
  return axios({
    method: "POST",
    url: BASE_URL.concat("/auth/authenticate"),
    data: loginData, // Thay data: { email, password } bằng loginData
  });
};

export const RegisterStore = (name, email, password) => {
  const registerData = { name, email, password }; // Thêm const để đảm bảo tạo biến local
  console.log(email, "store");
  return axios({
    method: "POST",
    url: BASE_URL.concat("/auth/register"),
    data: registerData, 
  });
};

export const setAccessToken = async (accessToken) => {
  if (!accessToken) {
    return false
  }
  try {
    await SecureStore.setItemAsync('accessToken', accessToken)
    addTokenToAxios(accessToken)
    return true
  } catch (error) {
    console.log("Lỗi lưu token vào Axios headers ")
  }
  return false
}

export const getAccessToken = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync('accessToken')
    return accessToken
  } catch (error) {
    console.log("Lấy token bị lỗi", error);
  }
}

export const addTokenToAxios = (accessToken) => {
  axios.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `BEARER ${accessToken}`
      return config;
    },
    function (error) {
      return Promise.reject(error)
    }
  )
}

export const CheckEmail = async (loginData) => {
  const response = await axios({
    method: 'POST',
    url: BASE_URL.concat(''),
    data: {
      email
    }
  })
  return response
}
