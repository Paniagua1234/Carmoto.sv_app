import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home.js'   
import Sesion from './src/screens/Sesion.js'
import SignUp from './src/screens/SignUp.js'
import Producto from './src/screens/Products.js'
import Carrito from './src/screens/Carrito.js';


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
      </Stack.Navigator>
    </NavigationContainer>

  );
}

