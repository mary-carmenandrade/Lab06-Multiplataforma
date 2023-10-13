import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { database } from '../database/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === '') {
      alert('Por favor, ingrese un nombre');
    } else {
      await addDoc(collection(database, 'usuarios'), state);
      props.navigation.navigate('UserList');
    }
  };

  const goToUserList = () => {
    props.navigation.navigate('UserList');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          onChangeText={(value) => handleChangeText('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(value) => handleChangeText('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          onChangeText={(value) => handleChangeText('phone', value)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Guardar Usuario" onPress={() => saveNewUser()} color="#007AFF" />
          <View style={styles.buttonSpacer} />
          <Button title="Ver Usuarios" onPress={() => goToUserList()} color="#000" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(106,172,175)',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    background: 'linear-gradient(to bottom, #3498db, #8e44ad)',
    elevation: 3,
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSpacer: {
    height: 10,
  },
});

export default CreateUserScreen;
