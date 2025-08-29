import { FundoInvestimento } from '@/src/@Types/fundos';
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DropdownInput from '@/src/components/Input/dropdownInput';
import PriceInput from '@/src/components/Input/priceInput';

export default function DetalhesInvestimento() {
    const { fundData } = useLocalSearchParams();
    const theme = useTheme();
    const styles = getStyles(theme);

    const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
    const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);

    const fund: FundoInvestimento | null = typeof fundData === 'string' ? JSON.parse(fundData) : null;

    return (
        <ScrollView style={styles.scrollView}>
            <Stack.Screen options={{ title: "Simular Investimento" }} />
            <View style={styles.container}>
                {!fund ? (
                    <Text>Erro: Dados do fundo não encontrados.</Text>
                ) : (
                    <>
                        <Text style={styles.title}>{fund.nome}</Text>
                        <View style={styles.separator} />
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Aplicação Inicial:</Text>
                            <Text style={styles.value}>
                                R$ {fund.valorAplicacaoInicial.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Rentabilidade dos últimos 12 meses:</Text>
                            <Text style={styles.rentabilidade}>{fund.taxaRentabilidade}%</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Taxa Global:</Text>
                            <Text style={styles.value}>{fund.taxaAdministracao}% a.a.</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Hora limite da aplicação:</Text>
                            <Text style={styles.value}>
                                {fund.horaLimite}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Movimentação (aplic/resg):</Text>
                            <Text style={styles.value}>
                                R$ {fund.valorMinimoAplicacaoInternet / fund.valorMinimoResgateInternet}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Cotatização de resgate:</Text>
                            <Text style={styles.value}>
                                D+30 (Dias Corridos)
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Cotatização de resgate:</Text>
                            <Text style={styles.value}>
                                D+{fund.prazoConversaoResgate} (Dias Úteis)
                            </Text>
                        </View>

                        <Text style={styles.midLabel}>Aplicação inicial</Text>
                        
                        <PriceInput
                            value={valorAplicarEmCentavos}
                            onValueChange={setValorAplicarEmCentavos}
                            placeholderValue={fund.valorAplicacaoInicial * 100}
                        />

                        <Text style={styles.midLabel}>Data</Text> 
                        
                        <DropdownInput 
                            content={['1 mês', '3 meses', '6 meses', '1 ano', '3 anos', '5 anos']}
                            placeholder="Tempo estimado"
                            onValueChange={setValorSalvoDropdown}
                        />

                        <Text style={styles.midLabel}>Aplicação Mensal</Text> 

                        
                    </>
                )}
            </View>
        </ScrollView>
    )
  }

const getStyles = (theme: StylesType) =>{
    return StyleSheet.create({
        scrollView: { 
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            padding: 25 
        },
        title: {
            fontSize: 28,
            color: theme.text,
            fontFamily: "Roboto",
            marginBottom: 20,
            fontWeight: 'bold'
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
        },
        separator: {
            height: 1,
            backgroundColor: '#2A2A2A',
            marginBottom: 10,
        },
        label: {
            fontSize: 15, color: theme.text 	
        },
        value: {
           fontSize: 13, fontWeight: '600', color: theme.text
        },
        rentabilidade: {
            fontSize: 15, color: '#4C9AFE'
        },
        input: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            padding: 16,
            fontSize: 16,
            // Cor do texto que o usuário digita
            color: theme.alternativeText, 
        },
        midLabel: {
            fontSize: 20,
            color: theme.text,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: 'bold'
        },
        dropdownFechado: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        // Estilo para o texto de placeholder (cinza)
        dropdownPlaceholder: {
            fontSize: 16,
            color: theme.textSecundary,
        },
        // NOVO: Estilo para o valor selecionado
        dropdownValue: {
            fontSize: 16,
            color: theme.alternativeText, // Cor para o valor escolhido
            fontWeight: '600',
        },
        dropdownAbertoContainer: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 8,
            overflow: 'hidden',
        },
        dropdownHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        dropdownItem: {
            padding: 16,
        },
        // Estilo para os itens na lista de seleção (cinza)
        dropdownItemText: {
            fontSize: 16,
            color: theme.textSecundary,
        },
    });
};