import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDonaciones } from '../../context/DonacionesContext';
import { useDonadores } from '../../context/DonadoresContext';
import { Ionicons } from '@expo/vector-icons';
import commonStyles from '../styles/styles';

export default function DonacionModal({ visible, onClose, donacionToEdit }) {
  const { createDonacion, updateDonacion } = useDonaciones();
  const { donadores } = useDonadores();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    fecha: new Date(),
    donaciones: [{ nombre: '', cantidad: '', tipo: 'Monetaria' }],
    estado: 'activa',
    donador: '',
  });

  useEffect(() => {
    if (donacionToEdit) {
      setFormData({
        ...donacionToEdit,
        fecha: new Date(donacionToEdit.fecha),
        donaciones: donacionToEdit.donaciones.map(d => ({...d, cantidad: d.cantidad.toString()})),
      });
    }
  }, [donacionToEdit]);

  const handleSubmit = async () => {
    if (!formData.donador) {
      Alert.alert('Error', 'Por favor seleccione un donador');
      return;
    }

    if (formData.donaciones.some(d => !d.nombre || !d.cantidad)) {
      Alert.alert('Error', 'Todas las donaciones deben tener nombre y cantidad');
      return;
    }

    const donacionData = {
      ...formData,
      fecha: formData.fecha.toISOString().split('T')[0],
      donaciones: formData.donaciones.map(d => ({
        ...d,
        cantidad: d.tipo === 'Monetaria' ? parseFloat(d.cantidad) : d.cantidad,
      })),
    };

    try {
      if (donacionToEdit) {
        await updateDonacion(donacionToEdit._id, donacionData);
      } else {
        await createDonacion(donacionData);
      }
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar la donación');
    }
  };

  const addDonacion = () => {
    setFormData({
      ...formData,
      donaciones: [...formData.donaciones, { nombre: '', cantidad: '', tipo: 'Monetaria' }],
    });
  };

  const updateDonacionItem = (index, field, value) => {
    const newDonaciones = [...formData.donaciones];
    newDonaciones[index] = { ...newDonaciones[index], [field]: value };
    setFormData({ ...formData, donaciones: newDonaciones });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, fecha: selectedDate });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={commonStyles.modalOverlay}>
        <View style={commonStyles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={commonStyles.title}>
              {donacionToEdit ? 'Editar Donación' : 'Agregar Donación'}
            </Text>
            <View style={styles.inputContainer}>
              <Text style={commonStyles.label}>Fecha</Text>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{formData.fecha.toISOString().split('T')[0]}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.fecha}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={commonStyles.label}>Donador</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.donador}
                  onValueChange={(itemValue) => setFormData({ ...formData, donador: itemValue })}
                  style={styles.picker}
                >
                  <Picker.Item label="Seleccione un donador" value="" />
                  {donadores.map((donador) => (
                    <Picker.Item key={donador._id} label={donador.nombre} value={donador._id} />
                  ))}
                </Picker>
              </View>
            </View>
            {formData.donaciones.map((donacion, index) => (
              <View key={index} style={styles.donacionItem}>
                <Text style={commonStyles.label}>Donación {index + 1}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={donacion.nombre}
                  onChangeText={(text) => updateDonacionItem(index, 'nombre', text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  value={donacion.cantidad}
                  onChangeText={(text) => updateDonacionItem(index, 'cantidad', text)}
                  keyboardType={donacion.tipo === 'Monetaria' ? 'numeric' : 'default'}
                />
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={donacion.tipo}
                    onValueChange={(itemValue) => updateDonacionItem(index, 'tipo', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Monetaria" value="Monetaria" />
                    <Picker.Item label="Material" value="Material" />
                  </Picker>
                </View>
              </View>
            ))}
            <TouchableOpacity onPress={addDonacion} style={styles.addButton}>
              <Ionicons name="add-circle-outline" size={24} color="#3b82f6" />
              <Text style={styles.addButtonText}>Agregar donación</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <Text style={commonStyles.label}>Estado</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.estado}
                  onValueChange={(itemValue) => setFormData({ ...formData, estado: itemValue })}
                  style={styles.picker}
                >
                  <Picker.Item label="Activa" value="activa" />
                  <Picker.Item label="Anulada" value="anulada" />
                </Picker>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginBottom: 8,
  },
  picker: {
    height: 40,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  donacionItem: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#3b82f6',
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 4,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});