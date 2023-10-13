import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { database } from '../database/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

const UserDetailScreen = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDocRef = doc(database, 'usuarios', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUser(userDocSnapshot.data());
        } else {
          console.log('El usuario no existe');
        }
      } catch (error) {
        console.error('Error al obtener detalles del usuario', error);
      }
    };

    getUserDetails();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Detalles del Usuario</Text>
        {user ? (
          <View>
             <View style={styles.detailRow}>
                <Text style={styles.subtitle}>ID:</Text>
                <Text style={styles.userDetail}>{userId}</Text>
              </View>
             <View style={styles.detailRow}>
                <Text style={styles.subtitle}>Nombre:</Text>
                <Text style={styles.userDetail}>{user.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.subtitle}>Email:</Text>
                <Text style={styles.userDetail}>{user.email}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.subtitle}>Teléfono:</Text>
                <Text style={styles.userDetail}>{user.phone}</Text>
              </View>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#3498db" />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  detailContainer: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userDetail: {
    fontSize: 18,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default UserDetailScreen;
