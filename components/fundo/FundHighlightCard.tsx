import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

interface FundHighlightCardProps {
    iconName: 'trophy' | 'line-chart' | 'leaf-circle';
    title: string;
    percentage: string;
    color: string;
}

const FundHighlightCard: React.FC<FundHighlightCardProps> = ({ iconName, title, percentage, color }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={[styles.header, { backgroundColor: color }]}>
                <View style={styles.iconWrapper}>
                    {iconName === 'trophy' && <Ionicons name="trophy" size={24} color="white" />}
                    {iconName === 'line-chart' && <AntDesign name="line-chart" size={24} color="white" />}
                    {iconName === 'leaf-circle' && <MaterialCommunityIcons name="leaf-circle" size={24} color="white" />}
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.percentageContainer}>
                <Text style={styles.percentageText}>{percentage} no mês</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 110,
        borderRadius: 15,
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
        marginHorizontal: 5,
        // Adicionado: Altura fixa para todos os cards
        height: 120,
    },
    header: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // Adicionado: Flex para o header
        flex: 1,
    },
    iconWrapper: {
        marginRight: 5,
    },
    title: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flex: 1,
    },
    percentageContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // Adicionado: Garante que o container de porcentagem ocupe o espaço restante
        flex: 1,
    },
    percentageText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007aff',
        textAlign: 'center', // Adicionado: Centraliza o texto
    },
});

export default FundHighlightCard;
