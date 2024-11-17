import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,StyleSheet,Alert,TouchableOpacity,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons'; // Ícones para a lixeira

export default function EventDetailsScreen() {

  const [evento, setEvents] = useState([]);

  // Função para carregar eventos do AsyncStorage
  const carregarEventos = async () => {

    try {

      const listaEvento = await AsyncStorage.getItem('@evento');

      const parsedEvents = listaEvento ? JSON.parse(listaEvento) : [];
      setEvents(parsedEvents);
    } catch (error) {
      
      Alert.alert('Erro', 'Não foi possível carregar os eventos.');
    }
  };

  const deletarEventos = async (indexToDelete) => {
    try {
      const updatedEvento = evento.filter((_, index) => index !== indexToDelete);
      setEvents(updatedEvento);
      
      await AsyncStorage.setItem('@evento', JSON.stringify(updatedEvento));
      
      Alert.alert('Sucesso', 'Evento excluído com sucesso!');
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o evento.');
    }
  };

  useEffect(() => {

    carregarEventos();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Detalhes dos Eventos</Text>

      {evento.length === 0 ? (

        <Text style={styles.noEvents}>Nenhum evento criado.</Text>
      ) : (
        <FlatList
          data={evento}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.eventCard}>
              <View style={styles.eventHeader}>

                <Text style={styles.eventName}>{item.name}</Text>
}
                <TouchableOpacity onPress={() => deletarEventos(index)}>

                  <Ionicons name="trash-bin" size={20} color="red" />

                </TouchableOpacity>
              </View>

              <Text>Data: {item.date}</Text>

              <Text>Local: {item.location}</Text>

            </View>

          )}

        />
      )}

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
  noEvents: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  eventCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});



