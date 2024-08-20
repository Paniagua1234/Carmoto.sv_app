import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home.js'   
import Sesion from './src/screens/Sesion.js'
import SignUp from './src/screens/SignUp.js'
import Producto from './src/screens/Products.js'
import Carrito from './src/screens/Carrito.js';
import UpdateUser from './src/screens/UpdateUser.js'; // Importa la pantalla de Actualización de Usuario
import TabNavigator from './src/screens/tabNavigator/TabNavigator.js'; // Importa el navegador de pestañas
import RecuperarContrasena from './src/screens/RecuperarContrasena.js';
import VerificarCodigo from './src/screens/VerificarCodigo.js';
import NuevaClave from './src/screens/NuevaClave.js';
import HistorialCompras from './src/screens/HistorialCompras.js';



export default function App() {


  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Sesion'

        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Producto" component={Producto} />
        <Stack.Screen name="Carrito" component={Carrito}/>
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} /> 
        <Stack.Screen name="RecuperarContrasena" component={RecuperarContrasena} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} />
        <Stack.Screen name="NuevaClave" component={NuevaClave} />
        <Stack.Screen name="HistorialCompras" component={HistorialCompras} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

