import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../screens/Homescreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import OperatorInfoScreen from "../screens/OperatorInfoScreen";
import ProductionScreen from "../screens/ProductionScreen";
import SummaryScreen from "../screens/SummaryScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={WelcomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="OperatorInfo"
                    component={OperatorInfoScreen}
                    options={{
                        title: "Operator Information",
                    }}
                />
                <Stack.Screen
                    name="Production"
                    component={ProductionScreen}
                    options={{
                        title: "Production",
                    }}
                />
                <Stack.Screen
                    name="Summary"
                    component={SummaryScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}