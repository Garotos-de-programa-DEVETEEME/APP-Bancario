import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PatrimonyCard: React.FC = () => {
    const [showBalance, setShowBalance] = useState<boolean>(false);
    const balance = 'R$ 1.234,56';

    const toggleBalance = () => {
        setShowBalance(!showBalance);
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Meu Patrimônio</Text>
                <TouchableOpacity onPress={toggleBalance}>
                    <Ionicons
                        name={showBalance ? 'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.balanceLabel}>Saldo líquido</Text>
            <Text style={styles.balanceValue}>
                {showBalance ? balance : '•••••'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        marginTop: -10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    balanceLabel: {
        fontSize: 14,
        color: '#888',
        marginTop: 10,
    },
    balanceValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
});

export default PatrimonyCard;
