import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const AddEditForm = ({ initialData, onSubmit, formType }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md">
      <Text className="text-2xl font-bold text-blue-500 mb-4">
        {formType === "add" ? "Add" : "Edit"}{" "}
        {formType === "donation" ? "Donation" : "Donor"}
      </Text>
      {formType === "donation" ? (
        <>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Amount"
            value={formData.amount}
            onChangeText={(text) => handleChange("amount", text)}
            keyboardType="numeric"
          />
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Date"
            value={formData.date}
            onChangeText={(text) => handleChange("date", text)}
          />
        </>
      ) : (
        <>
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <TextInput
            className="border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
          />
        </>
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 py-2 px-4 rounded-md"
      >
        <Text className="text-white text-center font-bold">
          {formType === "add" ? "Add" : "Update"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEditForm;
