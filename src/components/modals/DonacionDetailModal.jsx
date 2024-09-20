import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import commonStyles from '../styles/styles';

export default function DonacionDetailModal({ visible, onClose, donacion }) {
  if (!donacion) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={commonStyles.modalOverlay}>
        <View style={commonStyles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={commonStyles.title}>Detalle de Donación</Text>
            
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Información General</Text>
              <Text style={styles.detailItem}>Fecha: {donacion.fecha}</Text>
              <Text style={styles.detailItem}>Tipo: {donacion.tipo}</Text>
              <Text style={styles.detailItem}>Estado: {donacion.estado}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Donador</Text>
              <Text style={styles.detailItem}>Nombre: {donacion.donador?.nombre || 'No especificado'}</Text>
              <Text style={styles.detailItem}>Identificación: {donacion.donador?.identificacion || 'No especificado'}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Donaciones</Text>
              {donacion.donaciones.map((item, index) => (
                <View key={index} style={styles.donacionItem}>
                  <Text style={styles.detailItem}>Nombre: {item.nombre}</Text>
                  <Text style={styles.detailItem}>Cantidad: {item.cantidad}</Text>
                  <Text style={styles.detailItem}>Tipo: {item.tipo}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3b82f6',
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  donacionItem: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});