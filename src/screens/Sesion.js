import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Input from '../components/Inputs/Input'
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes'

export default function Sesion({ navigation }) {


  const ip = Constantes.IP;

  const [isContra, setIsContra] = useState(true)
  const [usuario, setUsuario] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  //const [confirmarContrasenia, setConfirmarContrasenia] = useState('')
  //http://localhost/coffeeshop/api/services/public/cliente.php?action=signUpMovil

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });

      const data = await response.json();

      if (data.status) {
        Alert.alert("Sesion Finalizada")
      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión con bryancito');
    }
  }


  const handlerLogin = async () => {

    try {

      const formData = new FormData();
      formData.append('correo', usuario);
      formData.append('clave', contrasenia);
      //utilizar la direccion IP del servidor y no localhost
      const response = await fetch(`${ip}/coffeeshop/api/services/public/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.status) {
        setContrasenia('')
        setUsuario('')
        navigation.navigate('Home');

      } else {
        console.log(data);
        // Alert the user about the error
        Alert.alert('Error sesion', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");

      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const irRegistrar = async () => {
    navigation.navigate('SignUp');
  };



  return (
    <View style={styles.container}>
      <Image
        source={require('../img/carsmotosv.jpeg')} // Ruta de la imagen dentro de la carpeta de activos
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
          {/* Boton de ayuda para finalizar la sesión */}
      <Buttons
        textoBoton='Cerrar Sesion'
        accionBoton={cerrarSesion}
        buttonStyle={[styles.closeButton]}
        textStyle={styles.closeText}
      />
      </View>

      <TouchableOpacity onPress={irRegistrar}>
        <Text style={styles.textRegistrar}>Registrar Usuario</Text>
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
    marginVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: "#FFF", fontWeight: '800', textTransform: 'uppercase'
  },
  texto: {
    color: '#FFFFFF', fontWeight: '900',
    fontSize: 20
  },
  textRegistrar: {
    color: '#FFFFFF', fontWeight: '700',
    fontSize: 18
  },
  image: {
    width: 150,
    height: 75,
    marginBottom: 10
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
