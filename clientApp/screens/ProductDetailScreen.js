import { StyleSheet, Text, View } from "react-native";

function ProductDetailScreen() {
    return (<View style={styles.container}>
        <Text>ProductDetail</Text>
    </View>);
}
const styles = StyleSheet.create({
    container : {

        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})
export default ProductDetailScreen;