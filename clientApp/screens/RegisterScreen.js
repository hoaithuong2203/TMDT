import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Thay 'FontAwesome' bằng tên thư viện biểu tượng bạn muốn sử dụng
import { RegisterStore, setAccessToken } from '../services/interfaces/authentication';
import {
    registerUser, resetRegistrationState,
} from '../redux/registrationSlice';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../redux/tokenSlice';
const RegisterScreen = ({ navigation }) => {
    useEffect(() => {
        dispatch(resetRegistrationState())
    }, []);

    const dispatch = useDispatch();
    const { isLoading, isSuccess, isError, error, user } = useSelector(
        (state) => state.registration
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        // Thêm kiểm tra email và mật khẩu ở đây (nếu cần)

        try {
            const userData = { name, email, password };
            const registerResponse = await dispatch(registerUser(userData));

            const { payload } = registerResponse;
            console.log(payload);
            dispatch(setToken(payload.token));
            // lưu token lại

            if (registerResponse.payload.token) {
                //thông báo thành công và chuyển màn
                navigation.push("Login"); // Chuyển màn hình sau khi đăng nhập thành công

            } else {
                //thông báo lỗi
                alert("Message: ".concat(payload.message))
            }
            // Xử lý dữ liệu phản hồi từ API ở đây

        } catch (error) {
            // Xử lý lỗi mạng hoặc lỗi từ API
            if (error.response) {
                const { data } = error.response;
                alert(data.message); // Hiển thị thông báo lỗi từ API
            } else {
                console.error(error); // Log lỗi không mong muốn
            }
        }
    };
    const showPass = () => {
        setShowPassword(!showPassword);
      };

    return (
        <ScrollView contentContainerStyle={styles.containerWrapper}>
            <View style={styles.container}>
                <Image source={require('../assets/images/bk.png')} style={styles.logo} />
                <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15, marginTop: 25 }}>Sign up and start shopping</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#666"
                                placeholder='Username'
                                onChangeText={(text) => setName(text)}
                                value={name}
                            />
                            <Icon name="user" size={18} color="#333" style={styles.iconInput} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#666"
                                placeholder='Enter email'
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                            />
                            <Icon name="envelope" size={16} color="#333" style={styles.iconInput} />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#666"
                                placeholder='Password'
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={!showPassword}
                                value={password}
                            />

                            <Icon name="lock" size={18} color="#333" style={styles.iconInput} />
                            <Icon
                                name={showPassword ? "eye" : "eye-slash"}
                                onPress={showPass}
                                style={styles.iconRight}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#666"
                                placeholder='Confirm Password'
                                secureTextEntry={!showPassword}
                                value={confirmPassword}
                            />
                            
                            <Icon name="lock" size={18} color="#333" style={styles.iconInput} />
                            <Icon
                                name={showPassword ? "eye" : "eye-slash"}
                                onPress={showPass}
                                style={styles.iconRight}
                            />
                        </View>
                    </View>
                </View>
                {isLoading && <Text>Đang tải...</Text>}
                {isError && <Text style={{ color: 'red' }}>{error}</Text>}
                {isSuccess && <Text style={{ color: 'green' }}>Đăng ký thành công!</Text>}
                <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                    <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerWrapper: {
        width: "auto"
    },
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',

    },
    logo: {
        width: screenWidth * 0.7,
        height: screenHeight / 3,
        resizeMode: 'contain',
        marginTop: 50,
    },
    formContainer: {
        width: '85%',
        marginTop: screenHeight / 50
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputWrapper: {
        position: 'relative',
    },
    label: {
        textAlign: 'right',
        fontSize: 12,
        color: "#333",
        opacity: 0.7
    },
    input: {
        width: '100%',
        height: 45,
        borderColor: '#ccc',
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
        marginTop: 5,
        paddingHorizontal: 10,
        fontSize: 12,
        paddingLeft: 40
    },
    iconInput: {
        position: 'absolute',
        left: 15,
        opacity: 0.5, // Điều chỉnh khoảng cách từ bên phải
        top: '50%', // Để căn giữa theo chiều dọc
        transform: [{ translateY: -6 }] // Để căn giữa icon theo chiều dọc
        // Thêm các kiểu style cho icon tại đây
    },
    loginButton: {
        width: '85%',
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
    forgotPasswordButton: {
        marginTop: 10,
    },
    forgotPasswordButtonText: {
        color: 'red',
        textDecorationLine: 'none',
        textAlign: "right", justifyContent: "flex-end",
        marginLeft: "50%",
        marginBottom: 10
    },

    wrappIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 4,
    },
    iconLogin: {

    },
    iconRight: {
        position: "absolute",
        right: 10,
        zIndex: 1,
        fontSize: 20,
        color: 'gray',
        transform: [{ translateY: 18 }]
      },
});

export default RegisterScreen;
