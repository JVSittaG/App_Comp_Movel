import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


import logo from './fei.png';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Image source={logo} style={styles.logo} />
      
      <Text style={styles.title}>Planner FEI</Text>

      <Text style={styles.description}>
        Organize seus eventos de maneira fácil e eficiente!
      </Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={styles.buttonText}>Criar Evento</Text>
      </TouchableOpacity>

  
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('EventDetails')}
      >
        <Text style={styles.buttonText}>Eventos Marcados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F1F1', 
    padding: 20,
  },
  logo: {
    width: 120,  
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#003366', 
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333333', 
    marginBottom: 40,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#003366', 
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#003366',
  },
});




