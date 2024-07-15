import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import ProductoCard from '../components/Cards/cardProduct';
import Buttons from '../components/Button/Button';
import ModalCompra from '../components/Modales/ModalCompra';
import RNPickerSelect from 'react-native-picker-select';
import * as Constantes from '../utils/constantes';

export default function Productos({ navigation }) {
  const ip = Constantes.IP;
  const [dataCascos, setDataCascos] = useState([]);
  const [dataModelos, setDataModelos] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [talla, setTalla]= useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [idProductoModal, setIdProductoModal] = useState('');
  const [nombreProductoModal, setNombreProductoModal] = useState('');

  const volverInicio = () => {
    navigation.navigate('Home');
  };

  const handleCompra = (nombre, id) => {
    setModalVisible(true);
    setIdProductoModal(id);
    setNombreProductoModal(nombre);
  };

  const getCascos = async (idModeloSelect = 1) => {
    try {
      if (idModeloSelect <= 0) return;
      const formData = new FormData();
      formData.append('id_modelo_de_casco', idModeloSelect);

      const response = await fetch(`${ip}/Carmoto.sv/api/services/public/producto.php?action=readAll`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.status) {
        setDataCascos(data.dataset);
      } else {
        Alert.alert('Error cascos', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al listar los cascos');
    }
  };

  const getModelos = async () => {
    try {
      const response = await fetch(`${ip}/Carmoto.sv/api/services/public/producto.php?action=readAll`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.status) {
        setDataModelos(data.dataset);
      } else {
        Alert.alert('Error modelos', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al listar los modelos');
    }
  };

  useEffect(() => {
    getCascos();
    getModelos();
  }, []);

  const irCarrito = () => {
    navigation.navigate('Carrito');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo de Cascos</Text>
      <Buttons textoBoton="Volver a Home" accionBoton={volverInicio} />
      <ModalCompra
        visible={modalVisible}
        cerrarModal={setModalVisible}
        nombreProductoModal={nombreProductoModal}
        idProductoModal={idProductoModal}
        cantidad={cantidad}
        talla={talla}
        setTalla={setTalla}
        setCantidad={setCantidad}
      />
      <View>
        <Text style={styles.subtitle}>Selecciona un modelo para filtrar cascos</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{ inputAndroid: styles.picker }}
            onValueChange={(value) => getCascos(value)}
            placeholder={{ label: 'Selecciona un modelo...', value: null }}
            items={dataModelos.map((modelo) => ({
              label: modelo.nombre_modelo,
              value: modelo.id_modelo_de_casco,
            }))}
          />
        </View>
      </View>
      <SafeAreaView style={styles.containerFlat}>
        <FlatList
          data={dataCascos}
          keyExtractor={(item) => item.id_casco.toString()}
          renderItem={({ item }) => (
            <ProductoCard
              ip={ip}
              imagenProducto={item.imagen_casco}
              idProducto={item.id_casco}
              nombreProducto={item.nombre_casco}
              descripcionProducto={item.descripcion_casco}
              precioProducto={item.precio_casco}
              existenciasProducto={item.existencia_casco}
              accionBotonProducto={() => handleCompra(item.nombre_casco, item.id_casco)}
            />
          )}
        />
      </SafeAreaView>
      <TouchableOpacity style={styles.cartButton} onPress={irCarrito}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
        <Text style={styles.cartButtonText}>Ir al carrito</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#F01212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#5C3D2E',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
    marginHorizontal: 5,
    color: '#5C3D2E',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#AF8260',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: '#AF8260',
  },
  picker: {
    color: '#ffffff',
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
