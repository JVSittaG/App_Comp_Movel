import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateEventScreen({ navigation }) {
  const [NomeEvento, setNomeEvento] = useState('');
  const [LocEvento, setLocEvento] = useState('');
  const [DataEvento, setDataEvento] = useState('');
  const [HoraIniEvento, setHoraIniEvento] = useState('');
  const [HoraFinalEvento, setHoraFinalEvento] = useState('');

  const handleSaveEvent = async () => {
    if (!NomeEvento || !LocEvento || !DataEvento || !HoraIniEvento || !HoraFinalEvento) {
      Alert.alert('Erro', 'Preencha os campos restantes!');
      return;
    }

    const NovoEvento = {
      name: NomeEvento,
      date: DataEvento,
      startTime: HoraIniEvento,
      endTime: HoraFinalEvento,
      location: LocEvento,
    };

    try {
      const listaEventos = await AsyncStorage.getItem('@evento');
      const evento = listaEventos ? JSON.parse(listaEventos) : [];
      evento.push(NovoEvento);

      await AsyncStorage.setItem('@evento', JSON.stringify(evento));
      Alert.alert('Sucesso', 'Evento criado com sucesso!');
      navigation.navigate('EventDetails');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o evento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Evento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Evento"
        value={NomeEvento}
        onChangeText={setNomeEvento}
      />
      <TextInput
        style={styles.input}
        placeholder="Local"
        value={LocEvento}
        onChangeText={setLocEvento}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/YYYY)"
        value={DataEvento}
        onChangeText={setDataEvento}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de Início (HH:MM)"
        value={HoraIniEvento}
        onChangeText={setHoraIniEvento}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora de Término (HH:MM)"
        value={HoraFinalEvento}
        onChangeText={setHoraFinalEvento}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveEvent}>
        <Text style={styles.buttonText}>Salvar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F1F1', 
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#003366', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF', 
    fontSize: 16,
    color: '#333333', 
  },
  button: {
    backgroundColor: '#003366', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', 
    fontWeight: 'bold',
  },
});



