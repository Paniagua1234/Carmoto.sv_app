import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

export default function Buttons({textoBoton, accionBoton}) {

    return(
        <>
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderColor: "#AF8260",
        width: Platform.OS === 'ios' ? 200 : 200,
        borderRadius: 10,
        backgroundColor: "#fdfff6",
        padding: Platform.OS === 'ios' ? 15 : 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#000000", fontWeight: '800', textTransform: 'uppercase'
    }
});