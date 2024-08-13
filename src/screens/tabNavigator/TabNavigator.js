import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

// Importa tus componentes de pantalla aquí
import Productos from '../Products';
import Home from '../Home';
import Carrito from '../Carrito';
import UpdateUser from '../UpdateUser'; // Importa la pantalla UpdateUser


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#AF8260',
                tabBarInactiveTintColor: '#B99873',
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    height: Platform.OS === 'ios' ? 80 : 60,
                    borderTopWidth: 0
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Productos') {
                        iconName = focused ? 'cafe' : 'cafe-outline';
                    } else if (route.name === 'Carrito') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'UpdateUser') { // Agrega la lógica para UpdateUser
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ title: 'Inicio' }}
            />
            <Tab.Screen
                name="Productos"
                component={Productos}
                options={{ title: 'Productos' }}
            />
            <Tab.Screen
                name="Carrito"
                component={Carrito}
                options={{ title: 'Carrito' }}
            />
            <Tab.Screen
                name="UpdateUser"
                component={UpdateUser}
                options={{ title: 'Actualizar Usuario' }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;