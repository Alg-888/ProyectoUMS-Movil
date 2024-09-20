import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import commonStyles from '../styles/styles';

export default function DonadorDetailModal({ visible, onClose, donador }) {
  if (!donador) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={commonStyles.modalOverlay}>
        <View style={commonStyles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={commonStyles.title}>Detalle del Donador</Text>
            
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Información General</Text>
              <Text style={styles.detailItem}>Nombre: {donador.nombre}</Text>
              <Text style={styles.detailItem}>Identificación: {donador.identificacion}</Text>
              <Text style={styles.detailItem}>Tipo de Donador: {donador.tipoDonador}</Text>
              <Text style={styles.detailItem}>Tipo de Documento: {donador.tipoDocumen}</Text>
              <Text style={styles.detailItem}>Estado: {donador.estado}</Text>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Contacto</Text>
              <Text style={styles.detailItem}>Teléfono: {donador.telefono}</Text>
              <Text style={styles.detailItem}>Dirección: {donador.direccion}</Text>
              <Text style={styles.detailItem}>Correo Electrónico: {donador.correoElectronico}</Text>
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