import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../../screens/MainScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import ForgotPassword from '../../screens/ForgotPassword';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName='Main' >
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default MainStack;
