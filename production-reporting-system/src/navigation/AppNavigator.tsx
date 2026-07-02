import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../screens/Homescreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import OperatorInfoScreen from "../screens/OperatorInfoScreen";
import ProductionScreen from "../screens/ProductionScreen";
import SummaryScreen from "../screens/SummaryScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import OperatorsScreen from "../screens/OperatorsScreen";
import MachinesScreen from "../screens/MachinesScreen";
import JobsScreen from "../screens/JobsScreen";
import ReportsScreen from "../screens/ReportsScreen";
import MachineStatusScreen from "../screens/MachineStatusScreen";
import DowntimeReasonsScreen from "../screens/DowntimeReasonsScreen";
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
                <Stack.Screen
                    name="AdminLogin"
                    component={AdminLoginScreen}
                />
                <Stack.Screen
                    name="AdminDashboard"
                    component={AdminDashboardScreen}
                />
                <Stack.Screen
                    name="Operators"
                    component={OperatorsScreen}
                />
                <Stack.Screen
                    name="Machines"
                    component={MachinesScreen}
                />
                <Stack.Screen
                    name="Jobs"
                    component={JobsScreen}
                />
                <Stack.Screen
                    name="DowntimeReasons"
                    component={DowntimeReasonsScreen}
                />
                <Stack.Screen
                    name="Reports"
                    component={ReportsScreen}
                />
                <Stack.Screen
                    name="MachineStatus"
                    component={MachineStatusScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}