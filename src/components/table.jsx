import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const Table = ({ data, columns, onDelete, onEdit }) => {
  const renderItem = ({ item }) => (
    <View className="flex-row border-b border-gray-200 py-2">
      {columns.map((column) => (
        <View key={column.key} className="flex-1 px-2">
          <Text className="text-gray-700">{item[column.key]}</Text>
        </View>
      ))}
      <View className="flex-row justify-end px-2">
        <TouchableOpacity onPress={() => onEdit(item)} className="mr-2">
          <Text className="text-blue-500">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item)}>
          <Text className="text-red-500">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row bg-gray-100 py-2">
        {columns.map((column) => (
          <View key={column.key} className="flex-1 px-2">
            <Text className="font-bold text-gray-700">{column.title}</Text>
          </View>
        ))}
        <View className="w-20 px-2">
          <Text className="font-bold text-gray-700">Actions</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Table;