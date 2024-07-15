import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ProductoCard({ ip, imagenProducto, idProducto, nombreProducto, descripcionProducto, precioProducto, existenciasProducto, accionBotonProducto }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/Carmoto.sv/api/Imagenes/img/Carmoto.sv/Imagenes de AGV/${imagenProducto}` }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>{idProducto}</Text>
      <Text style={styles.textTitle}>{nombreProducto}</Text>
      <Text style={styles.text}>{descripcionProducto}</Text>
      <Text style={styles.textTitle}>Precio: <Text style={styles.textDentro}>${precioProducto}</Text></Text>
      <Text style={styles.textTitle}>Existencias: <Text style={styles.textDentro}>{existenciasProducto} {(existenciasProducto === 10) ? 'Unidad' : 'Unidades'}</Text></Text>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={accionBotonProducto}>
        <FontAwesome name="plus-circle" size={24} color="white" />
        <Text style={styles.cartButtonText}>Seleccionar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textDentro: {
    fontWeight: '400',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#AF8260',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
