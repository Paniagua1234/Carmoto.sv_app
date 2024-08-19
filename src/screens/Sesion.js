import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Input from '../components/Inputs/Input';
import Buttons from '../components/Button/Button';
import * as Constantes from '../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';

export default function Sesion({ navigation }) {
  const ip = Constantes.IP;
  const [isContra, setIsContra] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  useFocusEffect(
    // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
    React.useCallback(() => {
      validarSesion(); // Llama a la función getDetalleCarrito.
    }, [])
  );

  const validarSesion = async () => {
    try {
        const response = await fetch(`${ip}/Carmoto.sv/api/services/public/cliente.php?action=getUser`, {
            method: 'GET'
        });

        const data = await response.json();

        if (data.status === 1) {
            navigation.navigate('TabNavigator', {
                nombreCliente: data.name, // Aquí debería mostrar el nombre correctamente
            });
            console.log("Sesión activa como:", data.name);
        } else {
            console.log("No hay sesión activa");
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
};

  


  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/Carmoto.sv/api/services/public/cliente.php?action=logOut`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.status === 1) {
        Alert.alert("Sesión Finalizada");
      } else {
        console.log(data);
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  const handlerLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('correo', usuario);
      formData.append('contrasenia', contrasenia);
  
      const response = await fetch(`${ip}/Carmoto.sv/api/services/public/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.status === 1) {
        // Aquí se asegura que el nombre de usuario se obtiene correctamente
        const nombreUsuario = data.name || 'Usuario';
  
        // Navega a la pantalla de inicio pasando el nombre de usuario
        navigation.navigate('Home', { nombre: nombreUsuario });
  
        setContrasenia('');
        setUsuario('');
      } else {
        console.log(data);
        Alert.alert('Error sesion', data.error || 'Ocurrió un error');
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };
  
// Función para navegar hacia la pantalla de recuperación de contraseña
const Recuperar = async () => {
  navigation.navigate('RecuperarContrasena');
};

  const irRegistrar = async () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../img/carsmotosv.jpeg')}
        style={styles.image}
      />

      <View style={[styles.loginContainer, { backgroundColor: '#333', borderWidth: 2, borderColor: '#fff' }]}>
        <Input
          placeHolder='Usuario'
          setValor={usuario}
          setTextChange={setUsuario}
          inputStyle={[styles.inputField, { color: '#fff' }]}
        />
        <Input
          placeHolder='Contraseña'
          setValor={contrasenia}
          setTextChange={setContrasenia}
          contra={isContra}
          inputStyle={[styles.inputField, { color: '#fff' }]}
        />
        <Buttons
          textoBoton='Iniciar Sesión'
          accionBoton={handlerLogin}
          buttonStyle={[styles.loginButton, { backgroundColor: '#FF0000' }]}
          textStyle={{ color: '#fff' }}
        />
        <Buttons
          textoBoton='Cerrar Sesión'
          accionBoton={cerrarSesion}
          buttonStyle={[styles.closeButton]}
          textStyle={styles.closeText}
        />
      </View>

      <TouchableOpacity onPress={irRegistrar} style={styles.BotonRegistrar}>
        <Text style={styles.textRegistrar}>Registrar Usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Recuperar}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
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
    borderColor: "#AF8260",
    width: 150,
    borderRadius: 10,
    backgroundColor: "#AF8260",
    padding: 10,
    marginVertical: 10,
  },
  BotonRegistrar: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 20,
    width: 250,
    backgroundColor: '#000000',
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: "#FFF",
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  texto: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 20,
  },
  textRegistrar: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    width: 150,
    height: 75,
    marginBottom: 10,
  },
  loginContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
  },
  closeText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
