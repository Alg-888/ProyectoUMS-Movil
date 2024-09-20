import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import CrudDonaciones from "./src/pages/crudDonaciones";
import CrudDonadores from "./src/pages/crudDonadores";
import { DonacionesProvider } from "./src/context/DonacionesContext";
import { DonadorProvider } from "./src/context/DonadoresContext";
import Sidebar from "./src/components/sidebar";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <DonacionesProvider>
      <DonadorProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <Sidebar {...props} />}
            screenOptions={({ route }) => ({
              drawerIcon: ({ focused, size, color }) => {
                let iconName;
                if (route.name === "Donaciones") {
                  iconName = focused ? "cash" : "cash-outline";
                } else if (route.name === "Donadores") {
                  iconName = focused ? "people" : "people-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Drawer.Screen name="Donaciones" component={CrudDonaciones} />
            <Drawer.Screen name="Donadores" component={CrudDonadores} />
          </Drawer.Navigator>
        </NavigationContainer>
      </DonadorProvider>
    </DonacionesProvider>
  );
}
