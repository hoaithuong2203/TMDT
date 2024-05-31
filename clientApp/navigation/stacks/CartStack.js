import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../../screens/CartScreen';

const Stack = createStackNavigator();
function CartStack() {
    return ( 
        <Stack.Navigator >
            <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
            {/* <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> */}
        </Stack.Navigator>
     );
}

export default CartStack;