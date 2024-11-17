import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    try {
      const userListado = await AsyncStorage.getItem('@user');
      if (!userListado) {
        Alert.alert('Erro', 'Usuário não encontrado. Cadastre-se primeiro.');
        return;
      }

      const user = JSON.parse(userListado);
      if (email === user.email && senha === user.senha) {
        Alert.alert('Sucesso', 'Login bem-sucedido!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}

        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}

        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput

        style={styles.input}
        placeholder="Senha"

        value={senha}
        onChangeText={setSenha}

        secureTextEntry
      />

      <Button title="Entrar" onPress={login} />

      <Button title="Não tem uma conta? Cadastre-se" onPress={() => navigation.navigate('Register')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',

  },

  title: {

    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',

  },

  input: {
    
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',

  },
});
