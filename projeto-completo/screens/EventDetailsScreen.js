import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function EventDetailsScreen() {
  const [eventos, setEventos] = useState([]);

  const carregarEventos = async () => {
    try {
      const listaEventos = await AsyncStorage.getItem('@evento');
      const eventosParseados = listaEventos ? JSON.parse(listaEventos) : [];
      setEventos(eventosParseados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os eventos.');
    }
  };

  const deletarEvento = async (index) => {
    try {
      const eventosAtualizados = eventos.filter((_, i) => i !== index);
      setEventos(eventosAtualizados);
      await AsyncStorage.setItem('@evento', JSON.stringify(eventosAtualizados));
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

      {eventos.length === 0 ? (
        <Text style={styles.noEvents}>Nenhum evento planejado.</Text>
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventName}>{item.name}</Text>
                <TouchableOpacity onPress={() => deletarEvento(index)}>
                  <Ionicons name="trash-bin" size={20} color="red" />
                </TouchableOpacity>
              </View>
              <Text>Data: {item.date}</Text>
              <Text>Hora de Início: {item.startTime}</Text>
              <Text>Hora de Término: {item.endTime}</Text>
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
    backgroundColor: '#F1F1F1', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#003366', 
  },
  noEvents: {
    fontSize: 16,
    color: '#666666', 
    textAlign: 'center',
  },
  eventCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#FFFFFF', 
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
    color: '#003366', 
  },
});

