import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "../stacks/HomeStack";
import CartStack from "../stacks/CartStack";
import MainStack from "../stacks/MainStack";
const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tab.Navigator>
            
            <Tab.Screen name="MainScreen" component={MainStack}  />
            
        </Tab.Navigator>
    );
}

export default TabNavigation;