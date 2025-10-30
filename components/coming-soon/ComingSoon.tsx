import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ComingSoonProps = {
    title?: string;
    subtitle?: string;
    items?: string[];
};

export default function ComingSoon({
    title = 'Em breve',
    subtitle = 'Estamos trabalhando em novidades incríveis para você.',
    items = ['Novos recursos', 'Melhorias de desempenho', 'Experiência aprimorada']
}: ComingSoonProps) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.emoji}>🚧</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                    <View key={`${item}-${index}`} style={styles.itemRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e8e8e8'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    emoji: {
        fontSize: 22,
        marginRight: 8
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1d2939'
    },
    subtitle: {
        fontSize: 14,
        color: '#475467',
        marginBottom: 12
    },
    itemsContainer: {
        marginTop: 4
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6
    },
    bullet: {
        marginRight: 8,
        color: '#12b76a',
        fontSize: 16,
        lineHeight: 20
    },
    itemText: {
        flex: 1,
        fontSize: 14,
        color: '#344054',
        lineHeight: 20
    }
});


