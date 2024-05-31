import { View, Text, StyleSheet } from "react-native";

function CartScreen() {
    return ( <View style={styles.container}>
       <Text>Giỏ hàng</Text>
    </View> );
}
const styles = StyleSheet.create({
    container : {

        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})
export default CartScreen;