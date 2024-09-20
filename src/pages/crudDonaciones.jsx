import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDonaciones } from '../context/DonacionesContext';
import DonacionModal from '../components/modals/donacionModal';
import DonacionDetailModal from '../components/modals/DonacionDetailModal';
import { Ionicons } from '@expo/vector-icons';
import commonStyles from '../components/styles/styles';

export default function CrudDonaciones() {
  const { donaciones, getAllDonaciones, anularDonacion } = useDonaciones();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDonacion, setSelectedDonacion] = useState(null);

  useEffect(() => {
    getAllDonaciones();
  }, []);

  const handleEditDonacion = (donacion) => {
    setSelectedDonacion(donacion);
    setModalVisible(true);
  };

  const handleViewDonacion = (donacion) => {
    setSelectedDonacion(donacion);
    setDetailModalVisible(true);
  };

  const handleAnularDonacion = async (donacion) => {
    Alert.alert(
      "Anular Donación",
      "¿Estás seguro de que quieres anular esta donación?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Anular", 
          onPress: async () => {
            const result = await anularDonacion(donacion._id);
            if (result.success) {
              getAllDonaciones();
            } else {
              Alert.alert("Error", result.error || "No se pudo anular la donación");
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.tipo} - {item.fecha}</Text>
      <Text style={styles.itemSubtitle}>Estado: {item.estado}</Text>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => handleViewDonacion(item)} style={styles.actionButton}>
          <Ionicons name="eye-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEditDonacion(item)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAnularDonacion(item)} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Donaciones</Text>
      <FlatList
        data={donaciones}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={commonStyles.floatingActionButton}
        onPress={() => {
          setSelectedDonacion(null);
          setModalVisible(true);
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
      <DonacionModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          getAllDonaciones();
        }}
        donacionToEdit={selectedDonacion}
      />
      <DonacionDetailModal
        visible={detailModalVisible}
        onClose={() => {
          setDetailModalVisible(false);
        }}
        donacion={selectedDonacion}
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