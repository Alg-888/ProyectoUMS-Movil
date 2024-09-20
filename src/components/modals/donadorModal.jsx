import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDonadores } from '../../context/DonadoresContext';
import commonStyles from '../styles/styles';

export default function DonadorModal({ visible, onClose, donadorToEdit }) {
  const { createDonador, updateDonador } = useDonadores();
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    contacto: '',
    tipoDonador: 'Natural',
    tipoDocumen: 'C.C',
    telefono: '',
    direccion: '',
    correoElectronico: '',
    estado: 'activo',
  });

  useEffect(() => {
    if (donadorToEdit) {
      setFormData(donadorToEdit);
    }
  }, [donadorToEdit]);

  const handleSubmit = async () => {
    if (donadorToEdit) {
      await updateDonador(donadorToEdit._id, formData);
    } else {
      await createDonador(formData);
    }
    onClose();
  };

  const renderInput = (label, key, placeholder, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={commonStyles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={formData[key]}
        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderPicker = (label, key, options) => (
    <View style={styles.inputContainer}>
      <Text style={commonStyles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData[key]}
          onValueChange={(itemValue) => setFormData({ ...formData, [key]: itemValue })}
          style={styles.picker}
        >
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={commonStyles.modalOverlay}>
        <View style={commonStyles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={commonStyles.title}>
              {donadorToEdit ? 'Editar Donador' : 'Agregar Donador'}
            </Text>
            {renderInput('Identificación', 'identificacion', 'Ingrese la identificación')}
            {renderInput('Nombre', 'nombre', 'Ingrese el nombre')}
            {renderInput('Contacto', 'contacto', 'Ingrese el contacto')}
            {renderPicker('Tipo de Donador', 'tipoDonador', ['Natural', 'Empresa'])}
            {renderPicker('Tipo de Documento', 'tipoDocumen', ['C.C', 'C.E', 'NIT'])}
            {renderInput('Teléfono', 'telefono', 'Ingrese el teléfono', 'phone-pad')}
            {renderInput('Dirección', 'direccion', 'Ingrese la dirección')}
            {renderInput('Correo Electrónico', 'correoElectronico', 'Ingrese el correo electrónico', 'email-address')}
            {renderPicker('Estado', 'estado', ['activo', 'inactivo'])}
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