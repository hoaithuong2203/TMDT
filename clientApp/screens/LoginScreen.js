import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { validateEmail } from "../utils/validate";
import { LoginStore, getAccessToken, setAccessToken } from "../services/interfaces/authentication";
import { useEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = useSelector((state) => state.token);
  console.log('====================================');
  console.log(token, "token login");
  console.log('====================================');

  const handleLogin = async () => {
    // Thêm kiểm tra email và mật khẩu ở đây (nếu cần)
    if (validate(email, password)) {
      try {
        const loginResponse = await LoginStore(email, password);
        const { data } = loginResponse;
        console.log(data);
        // lưu token lại
        const result = await setAccessToken(data.token)
        if (result) {
          //thông báo thành công và chuyển màn
          navigation.push("Home"); // Chuyển màn hình sau khi đăng nhập thành công
        } else {
          //thông báo lỗi
        }

      } catch (error) {
        // Xử lý lỗi mạng hoặc lỗi từ API
        if (error.response) {
          const { data } = error.response;
          alert(data.message); // Hiển thị thông báo lỗi từ API
        } else {
          console.error(error); // Log lỗi không mong muốn
        }
      }
    } else {
      alert("Check lại Email, Password")
    }
  };
  const showPass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/images/bk.png")}
        style={styles.storeimage}
        resizeMode="contain"
      />
      <Text style={styles.storetext}> Login Sreen </Text>
      <View style={styles.view}>
        <Text style={styles.textemailpass}> Email </Text>
        <View style={styles.inputContainer}>
          <Icon name="envelope" style={styles.icon} />
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            style={styles.textinput}
          />
        </View>
        <Text style={styles.textemailpass}> Password </Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
            style={styles.textinput}
          />
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            onPress={showPass}
            style={styles.iconRight}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.forgotpassword} onPress={() => navigation.push('ForgotPassword')}>
        <Text style={styles.text}> Forgot password </Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>


      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.push('Register')}>
        <Text style={styles.text}> Do not have an account? Register? </Text>
      </TouchableOpacity>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    backgroundColor: "#fff",
  },
  storetext: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "800",
    marginVertical: 30,
  },
  storeimage: {
    display: 'flex',
    width: '100%',
    height: '30%'

  },
  inputContainer: {
    flexDirection: "row",
    height: 50,
    // borderColor: "gray",
    borderWidth: 0,
    marginBottom: 20,
    marginTop: 5,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,

    // marginHorizontal: 20
  },
  view: {
    width: "80%",
  },
  icon: {
    color: "gray",
    fontSize: 18,
    paddingRight: 10
  },
  iconRight: {
    position: "absolute",
    right: 10,
    zIndex: 1,
    fontSize: 20,
    color: 'gray'
  },
  textinput: {
    width: "100%",
    height: "100%",
  },
  forgotpassword: {
    width: "80%",
    alignItems: 'flex-end',
    marginBottom: 20,
    color: "#ccc",
  },
  textemailpass: {
    textAlign: "right",
    width: "100%",
    color: "gray"
  },
  text: {
    color: "#333",
  },
  button: {
    backgroundColor: "#5D7B6F",
    padding: 10,
    borderRadius: 5,
    width: "80%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default LoginScreen;
