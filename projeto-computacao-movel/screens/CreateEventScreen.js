import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateEventScreen({ navigation }) {

  const [NomeEvento, setNomeEvento] = useState('');
  const [LocEvento, setLocEvento] = useState('');
  const [DataEvento, setDataEvento] = useState('');
  const [HoraIniEvento, setHoraIniEvento] = useState('');
  const [HoraFinalEvento, setHoraFinalEvento] = useState('');

  // Função para salvar o evento
  const handleSaveEvent = async () => {
    // Validando os campos
    if (!NomeEvento || !LocEvento || !DataEvento || !HoraIniEvento || !HoraFinalEvento) {
      Alert.alert('Erro', 'Preencha os campos restantes!');
      return;
    }

    // Salvando o evento no AsyncStorage
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


      <Button title="Salvar Evento" onPress={handleSaveEvent} />
    </View>

  );
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});


