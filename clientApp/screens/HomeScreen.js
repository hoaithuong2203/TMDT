import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function HomeScreen({ navigation }) {

    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('ProductDetail')}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    product: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dddddd',
        margin: 8,
        padding: 8,
    },
    productImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    productTitle: {
        fontSize: 16,
        marginTop: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
        marginTop: 4,
    },
});

export default HomeScreen;