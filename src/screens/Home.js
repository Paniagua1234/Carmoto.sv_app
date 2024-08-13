import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Button/Button';
import Input from '../components/Inputs/Input'
import InputMultiline from '../components/Inputs/InputMultiline'
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState(null); // Estado para almacenar el nombre del usuario
  const ip = Constantes.IP;

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/Carmoto.sv/api/services/public/cliente.php?action=logOut`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.status) {
        navigation.navigate('Sesion');
      } else {
        console.log(data);
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  // Función para obtener el nombre del usuario desde la API
  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/Carmoto.sv/api/services/public/cliente.php?action=getUser`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.status) {
        // Guarda el nombre del usuario en el estado
        setNombre(data.name.nombre_cliente); 
      } else {
        console.log(data);
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener la información del usuario');
    }
  };

  // useEffect para llamar a getUser al cargar el componente
  useFocusEffect(
    React.useCallback(() => { 
        getUser();
    }, [])  
);

  const irActualizar = async () => {
    navigation.navigate('Producto');
  };

  const EditUser = () => {
    navigation.navigate('UpdateUser');
  };

  const volverInicio = () => {
    navigation.navigate('TabNavigator');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenid@</Text>
      <Text style={styles.subtitle}>
        {nombre ? nombre : 'No hay nombre para mostrar'}
      </Text>
      
      <Buttons
        textoBoton='Cerrar Sesión'
        accionBoton={handleLogout}
      />
      
      <Buttons
        textoBoton='Ver Productos'
        accionBoton={irActualizar}
      />
       
      <Buttons
        textoBoton='Editar Usuario'
        accionBoton={EditUser}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F01212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: 'black',
    width: 100,
    borderRadius: 10,
    backgroundColor: 'darkblue',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
});
