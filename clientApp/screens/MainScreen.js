import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from 'react'

function MainScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Sử dụng `setInterval` để giả lập thời gian chờ loading (ví dụ: 3 giây)
        const loadingInterval = setInterval(() => {
            setIsLoading(false);
            clearInterval(loadingInterval); // Dừng setInterval khi loading hoàn thành
            navigation.navigate('Login')
        }, 3000);
        // Thời gian chờ loading (3 giây)
    }, []);
    
    return (<View style={styles.container}>
        
            <View style={styles.wrapper}>

                <Image
                    source={require("../assets/images/bk.png")} // Đường dẫn đến tập tin ảnh
                    style={styles.image}
                />
                <Text style={styles.text}>
                    Huce Shopping
                </Text>
            </View>
        
    </View>);
}
const styles = StyleSheet.create({
    image: {
        width: 141, // Chiều rộng của ảnh
        height: 141, // Chiều cao của ảnh
        resizeMode: 'contain', // Chế độ hiển thị ảnh (contain, cover, stretch, ...)
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        gap: 10
    },

    text: {
        fontSize: 27,
        fontWeight: "bold"
    }
})
export default MainScreen;