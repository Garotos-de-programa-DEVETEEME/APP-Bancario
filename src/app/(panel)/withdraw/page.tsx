import { BaseScreen } from '@/components/BaseScreen/BaseScreen';
import { ScreenStates } from '@/components/BaseScreen/ScreenStates';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return 'R$ 0,00'; {/* Conectar a API para pegar o valor inicial */}
    return (parseInt(numbers) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const infoData = [
    { label: 'Disponível para resgate', value: 'R$ .......' }, /* Conectar a API para pegar o valor disponível para resgate */
    { label: 'Saldo mínimo de permanência', value: 'R$ 1,00' }, /* Conectar a API para pegar o saldo mínimo de permanência */
    { label: 'Valor mínimo de resgate', value: 'R$ 100,00' }, /* Conectar a API para pegar o valor mínimo de resgate */
];

export default function Withdraw() {
    const [screenState, setScreenState] = useState(ScreenStates.loading());
    const [amount, setAmount] = useState('R$ 0,00');
    const [redeemTotal, setRedeemTotal] = useState(false);
    
    useEffect(() => setScreenState(ScreenStates.content()), []);

    return BaseScreen({
        state: screenState,
        children: (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="#3E75BC" />
                    </Pressable>
                    <Text style={styles.title}>Resgatar</Text>
                    <View style={styles.placeholder} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.question}>
                        Qual <Text style={styles.boldText}>valor</Text> deseja resgatar?
                    </Text>

                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        onChangeText={(text) => setAmount(formatCurrency(text))}
                        keyboardType="numeric"
                        placeholder="R$ 0,00"
                    />
                    <View style={styles.inputLine} />

                    <View style={styles.toggleSection}>
                        <Text style={styles.toggleLabel}>Resgatar valor total</Text>
                        <Switch
                            value={redeemTotal}
                            onValueChange={setRedeemTotal}
                            trackColor={{ false: '#e0e0e0', true: '#3E75BC' }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.infoSection}>
                        {infoData.map((item, index) => (
                            <View key={index} style={styles.infoRow}>
                                <Text style={styles.infoLabel}>{item.label}</Text>
                                <Text style={styles.infoValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                        
                    <View style={styles.disclaimer}>
                        <Text style={styles.disclaimerText}>{/* Conectar a API para pegar a hora  correta*/}
                            O resgate desse fundo pode ser realizado até às <Text style={styles.disclaimerEmphasis}>17:00 em dias úteis</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable 
                        style={styles.continueButton}
                        onPress={() => Alert.alert('Continuar', 'Funcionalidade de resgate em desenvolvimento')}
                    >
                        <Text style={styles.continueButtonText}>Continuar</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    });
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: { width: 40, alignItems: 'center' },
    backIcon: { fontSize: 24, color: colors.zinc },
    title: { fontSize: 18, fontWeight: 'bold', color: colors.zinc },
    placeholder: { width: 40 },
    content: { flex: 1, paddingHorizontal: 20, paddingTop: 24 },
    question: { fontSize: 16, color: colors.zinc, marginBottom: 16 },
    boldText: { fontWeight: 'bold' },
    amountInput: { fontSize: 28, fontWeight: '300', color: colors.zinc, marginBottom: 8 },
    inputLine: { height: 2, backgroundColor: '#3E75BC', marginBottom: 24 },
    toggleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    toggleLabel: { fontSize: 16, color: colors.zinc },
    infoSection: { marginBottom: 24 },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: { fontSize: 14, color: colors.zinc, flex: 1 },
    infoValue: { fontSize: 14, fontWeight: '600', color: colors.zinc },
    disclaimer: {
        marginTop: 'auto',
        marginBottom: 32,
        paddingHorizontal: 24,
    },
    disclaimerText: { fontSize: 16, color: colors.zinc, lineHeight: 22, textAlign: 'center', fontWeight: '400' },
    disclaimerEmphasis: { fontWeight: '800' },
    buttonContainer: { paddingHorizontal: 20, paddingBottom: 20 },
    continueButton: {
        backgroundColor: '#3E75BC',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});