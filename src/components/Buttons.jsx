import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const PrimaryButton = ({ onPress, title }) => (
  <TouchableOpacity
    className="bg-blue-500 px-4 py-2 rounded-md shadow"
    onPress={onPress}
  >
    <Text className="text-white font-semibold text-center">{title}</Text>
  </TouchableOpacity>
);

export const SecondaryButton = ({ onPress, title }) => (
  <TouchableOpacity
    className="bg-gray-300 px-4 py-2 rounded-md shadow"
    onPress={onPress}
  >
    <Text className="text-gray-700 font-semibold text-center">{title}</Text>
  </TouchableOpacity>
);
