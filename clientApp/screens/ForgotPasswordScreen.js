import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validatePassword } from '../utils/validate';
import { forgetPassword, isEmail } from '../services/interfaces/user';

const ForgotPasswordScreen = ({ }) => {

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1 - Nhập email, 2 - Nhập mã xác nhận, 3 - Đặt lại mật khẩu
  const navigation = useNavigation();

  const handleSendCode = async () => {
    // Đây là nơi bạn có thể thực hiện gửi mã xác nhận đến email
    // Sau khi gửi mã, bạn có thể chuyển sang bước 2
    try {
      const forgotReponse = await isEmail(email);
      const { data } = forgotReponse;
      console.log(data);
      if (data == "verifyEmail_success") {
        setStep(2);
      } else {
        alert("Email không hợp lệ")
      }
    } catch (error) {
    }
  };

  const handleSubmitCode = async () => {
    // Đây là nơi bạn kiểm tra mã xác nhận
    // Nếu mã đúng, bạn có thể chuyển sang bước 3
    // Nếu mã sai, bạn có thể hiển thị thông báo lỗi

    try {
      const forgetPassword = await forgetPassword(code, newPassword, confirmPassword);
      const { data } = forgetPassword;
      if (data == "changePassword_success") {
        setStep(3);
      } else {
        alert("Không hợp lệ")
      }
    } catch (error) {

    }
  };

  const handleResetPassword = async () => {
    // Đây là nơi bạn cập nhật mật khẩu mới cho tài khoản có email tương ứng
    if (validatePassword(newPassword, confirmPassword, code)) {
      // Cập nhật mật khẩu và chuyển đến màn hình hoàn thành
      try {
        console.log("OK");
        const forgetPasswordResponse = await forgetPassword(code, newPassword, confirmPassword);
        const { data } = forgetPasswordResponse;
        if (data == "changePassword_success") {
          // setStep(3);
          navigation.goBack()
        } else {
          alert("Mã xác nhận không hợp lệ")
        }
      } catch (error) {

      }
    } else {
      // Hiển thị thông báo lỗi khi mật khẩu và xác nhận mật khẩu không khớp
      alert('Mã sai hoặc Mật khẩu không khớp');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSendCode}>
              <Text style={styles.loginButtonText}>Gửi mã xác nhận</Text>
            </TouchableOpacity>
            {/* <Button style={styles.button} title="Gửi mã xác nhận" onPress={handleSendCode} /> */}
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Nhập mã xác nhận</Text>
            <Text style={styles.subtitle}>Mã đã được gửi đến: {email}</Text>
            <TextInput
              style={styles.input}
              placeholder="Mã xác nhận"
              onChangeText={(text) => setCode(text)}
              value={code}
            />

            <TextInput
              style={styles.input}
              placeholder="Mật khẩu mới"
              secureTextEntry
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword}>
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>
            {/* <Button style={styles.button} title="Lưu mật khẩu mới" onPress={handleResetPassword} /> */}
          </View>
        );
      default:
        return null;
    }
  };

  return renderStep();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#CFCFCF'
  },
  button: {
    backgroundColor: '#008B45',
  },
  loginButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#5D7B6F'
  },
  loginButtonText: {
    color: 'white',

    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
