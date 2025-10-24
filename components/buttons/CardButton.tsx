import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CardButtonProps {
    iconName: 'folder1' | 'wallet' | 'line-chart';
    text: string;
    onPress: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ iconName, text, onPress }) => {
    let iconComponent;

    // Renderiza o ícone apropriado com base no nome
    switch (iconName) {
        case 'wallet':
            iconComponent = <Ionicons name="wallet-outline" size={20} color="#007aff" />;
            break;
        case 'folder1':
            iconComponent = <MaterialCommunityIcons name="folder-multiple" size={20} color="#007aff" />;
            break;
        case 'line-chart':
            iconComponent = <AntDesign name="line-chart" size={20} color="#007aff" />;
            break;
        default:
            iconComponent = null;
    }

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <View style={styles.iconWrapper}>
                {iconComponent}
            </View>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    iconWrapper: {
    },
    buttonText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CardButton;
