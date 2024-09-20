import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Sidebar component now only handles the menu items and its content
const Sidebar = ({ slideAnim, toggleSidebar }) => {
  const navigation = useNavigation();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
    toggleSidebar(); // Close sidebar when navigating
  };

  return (
    <Animated.View
      style={[
        styles.sidebar,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.sidebarContent}>
        <Text style={styles.sidebarTitle}>Menu</Text>
        <TouchableOpacity
          onPress={() => navigateTo("Donaciones")}
          style={styles.sidebarItem}
        >
          <Ionicons name="gift-outline" size={24} color="#4B5563" />
          <Text style={styles.sidebarItemText}>Donaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo("Donadores")}
          style={styles.sidebarItem}
        >
          <Ionicons name="people-outline" size={24} color="#4B5563" />
          <Text style={styles.sidebarItemText}>Donadores</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Main component manages the sidebar state and the toggle button
const SidebarWithButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0]; // Sidebar starts off-screen

  const toggleSidebar = () => {
    const toValue = isOpen ? -250 : 0; // Slide in or out
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen); // Toggle state
  };

  return (
    <View style={styles.container}>
      {/* Menu button is outside of the sidebar, controlling its visibility */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
        <Ionicons name={isOpen ? "close" : "menu"} size={28} color="#fff" />
      </TouchableOpacity>

      {/* Sidebar component */}
      <Sidebar slideAnim={slideAnim} toggleSidebar={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 30,
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 30,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sidebarItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#4B5563",
  },
});

export default Sidebar;
