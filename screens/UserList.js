import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { database } from '../database/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Usuarios from './Usuarios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const collectionRef = collection(database, 'usuarios');
    const q = query(collectionRef, orderBy('name', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
          userNumber: index + 1,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const goToUserDetail = (userId) => {
    navigation.navigate('UserDetailScreen', { userId });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Lista de Usuarios</Text>
      {users.map((usuario) => (
        <TouchableOpacity
          key={usuario.id}
          style={styles.userContainer}
          onPress={() => goToUserDetail(usuario.id)}
        >
          <Text style={styles.userHeading}>{`Usuario ${usuario.userNumber}:`}</Text>
          <Usuarios {...usuario} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#084CA8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10, 
  },
  userHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserList;
