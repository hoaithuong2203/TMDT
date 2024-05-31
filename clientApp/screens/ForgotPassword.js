import { Image, Text, TouchableOpacity, View } from "react-native";

function ForgotPassword() {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: "center", gap: 20 }}>
        <Image style={{ height: 400 }} source={require("../assets/email.png")} />
        {/* <Text></Text> */}
        <Text>Check Your Email</Text>

        <Text style={{color: "#ccc"}}>
            Please enter your registered email or mobile
            to reset your Password.        </Text>
        <TouchableOpacity style={{
            width: '80%',
            height: 40,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        }}>
            <Text style={{ color: "#FFF" }}>Go to email</Text>
        </TouchableOpacity>

    </View>);
}

export default ForgotPassword;