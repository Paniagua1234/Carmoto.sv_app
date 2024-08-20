import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import * as Constantes from '../utils/constantes';

const HistorialCompras = () => {
  const [historial, setHistorial] = useState([]);
  const ip = Constantes.IP;

  const obtenerHistorial = async () => {
    try {
      const response = await fetch(`${ip}/Carmoto.sv/api/services/public/pedido.php?action=readHistorial`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.status) {
        setHistorial(data.dataset);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el historial de compras');
    }
  };

  useEffect(() => {
    obtenerHistorial();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID Pedido: {item.id_pedido}</Text>
      <Text>Fecha: {item.fecha_registro}</Text>
      <Text>Estado: {item.estado_pedidos}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Compras</Text>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id_pedido.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EAD8C0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default HistorialCompras;
