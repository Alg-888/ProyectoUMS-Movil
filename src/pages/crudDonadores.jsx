import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDonadores } from '../context/DonadoresContext';
import DonadorModal from '../components/modals/donadorModal';
import DonadorDetailModal from '../components/modals/DonadorDetailModal';
import { Ionicons } from '@expo/vector-icons';
import commonStyles from '../components/styles/styles';

export default function CrudDonadores() {
  const { donadores, getAllDonadores, deleteDonador } = useDonadores();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDonador, setSelectedDonador] = useState(null);

  useEffect(() => {
    getAllDonadores();
  }, []);

  const handleEditDonador = (donador) => {
    setSelectedDonador(donador);
    setModalVisible(true);
  };

  const handleViewDonador = (donador) => {
    setSelectedDonador(donador);
    setDetailModalVisible(true);
  };

  const handleDeleteDonador = async (donador) => {
    Alert.alert(
      "Eliminar Donador",
      "¿Estás seguro de que quieres eliminar este donador?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: async () => {
            const result = await deleteDonador(donador._id);
            if (result.success) {
              getAllDonadores();
            } else {
              Alert.alert("Error", result.error || "No se pudo eliminar el donador");
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nombre}</Text>
      <Text style={styles.itemSubtitle}>{item.tipoDonador} - {item.estado}</Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => handleViewDonador(item)} style={styles.actionButton}>
          <Ionicons name="eye-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditDonador(item)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteDonador(item)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Donadores</Text>
      <FlatList
        data={donadores}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={commonStyles.floatingActionButton}
        onPress={() => {
          setSelectedDonador(null);
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      <DonadorModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          getAllDonadores();
        }}
        donadorToEdit={selectedDonador}
      />
      <DonadorDetailModal
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
        }}
        donador={selectedDonador}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 80,
  },
  itemContainer: {
    ...commonStyles.tableContainer,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 16,
  },
});