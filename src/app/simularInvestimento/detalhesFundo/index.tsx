import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { AcceptanceTerm } from '@/src/components/InfoTexts/acceptanceTerm';
import { FundClass } from '@/src/components/InfoTexts/fundClass';
import { FundDetails } from '@/src/components/InfoTexts/fundDetails';
import DropdownInput from '@/src/components/Input/dropdownInput';
import PriceInput from '@/src/components/Input/priceInput';
import { useTheme } from "@/src/hooks/useTheme";
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const formatCurrency = (valueInCents: number) => {
    const valueInReais = valueInCents / 100;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueInReais);
};

export default function DetalhesInvestimento() {
    const { fundData } = useLocalSearchParams();
    const theme = useTheme();
    const styles = getStyles(theme);

    //Comunicação entre componentes inputs com o Pai
    const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
    const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
    const [valorMensalOpcional, setValorMensalOpcional] = useState(0);
    const [termoVisivel, setTermoVisivel] = useState(false);
    const [mostrarResultados, setMostrarResultados] = useState(false);

    const fund: FundoInvestimento | null = typeof fundData === 'string' ? JSON.parse(fundData) : null;

    //Bloqueio do botãm sem informação e se for menor que o valor minimo
    const isButtonEnabled = fund ? valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100 && valorSalvoDropdown !== '' : false;

    const handleShowResults = () => {
        setTermoVisivel(false); // Fecha o modal de aceite
        setMostrarResultados(true); // Mostra a view de resultados
    };

    // Função para voltar da tela de resultados para a de simulação
    const handleReturnToSimulation = () => {
        setMostrarResultados(false);
    }

    return (
        <>
            {fund ? (
                !mostrarResultados ? (
                    <>
                        <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                            <View style={styles.container}>

                                <FundDetails fund={fund} />

                                <Text style={styles.midLabel}>Aplicação inicial</Text>
                                <PriceInput
                                    value={valorAplicarEmCentavos}
                                    onValueChange={setValorAplicarEmCentavos}
                                    placeholder={fund.valorAplicacaoInicial * 100}
                                />

                                <Text style={styles.midLabel}>Data</Text>
                                <DropdownInput
                                    content={['1 mês', '3 meses', '6 meses', '1 ano', '3 anos', '5 anos']}
                                    placeholder="Tempo estimado"
                                    onValueChange={setValorSalvoDropdown}
                                />

                                <Text style={styles.midLabel}>Aplicação Mensal</Text>
                                <PriceInput
                                    value={valorMensalOpcional}
                                    onValueChange={setValorMensalOpcional}
                                    alternativeText='Opcional'
                                />

                                <FundClass fund={fund} />

                                <View style={styles.buttonBox}>
                                    <NavigationButton
                                        onPress={() => setTermoVisivel(true)}
                                        text={'Simular'}
                                        width={261}
                                        height={37}
                                        disabled={!isButtonEnabled}
                                    />
                                </View>

                            </View>
                        </ScrollView>

                        <AcceptanceTerm
                            visible={termoVisivel}
                            onClose={() => setTermoVisivel(false)}
                            onAccept={handleShowResults}
                        />

                    </>
                ) : (
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.container}>
                            <Text style={styles.title}>{fund.nome}</Text>
                            <View style={styles.separator} />
                            <View style={styles.detailRow}>
                                <Text style={styles.label}>Aplicação Inicial:</Text>
                                <Text style={styles.value}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fund.valorAplicacaoInicial)}
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

                            <View style={styles.resultsContainer}>
                                <View style={styles.valueDisplay}>
                                    <Text style={styles.mainValues}>
                                        Aplicação inicial
                                    </Text>
                                    <Text style={styles.mainValues}>
                                        {formatCurrency(valorAplicarEmCentavos)}
                                    </Text>
                                </View>

                                <View style={styles.valueDisplay}>
                                    <Text style={styles.mainValues}>
                                        Resgate
                                    </Text>
                                    {/* //TODO Adicionar calculo do resultado */}
                                    {/* RESULTADO PLACEHOLDER NÃO É VERDADE ESSE ! ! ! */}
                                    <Text style={styles.mainValues}>
                                        {formatCurrency(valorAplicarEmCentavos + (valorAplicarEmCentavos * 0.10))}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.valueDisplay}>
                                <Text style={styles.textPitch}>Deseja utilizar esses valores para um investimento real?</Text>
                            </View>

                            <View style={styles.buttonBox}>
                                <NavigationButton
                                    onPress={() => console.log("Pressionado")}
                                    text='Aplicar Investimento'
                                    width={261}
                                    height={37}
                                />
                            </View>

                        </View>
                    </ScrollView>
                )
            ) : (
                <View style={styles.container}>
                    <Text>Erro: Dados do fundo não encontrados.</Text>
                </View>
            )}
        </>
    )
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        scrollView: {
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            paddingLeft: 25,
            paddingRight: 25,
            paddingBottom: 25,
        },
        midLabel: {
            fontSize: 20,
            color: theme.text,
            marginTop: 15,
            marginBottom: 10,
            fontWeight: 'bold'
        },
        buttonBox: {
            alignItems: "center",
        },
        title: {
            fontSize: 28,
            color: theme.text,
            fontFamily: "Roboto",
            marginBottom: 15,
            fontWeight: 'bold'
        },
        detailRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
        },
        separator: {
            height: 1,
            backgroundColor: theme.border,
            marginBottom: 10,
            marginTop: 10
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
        resultsContainer: {
            marginTop: 25,
            gap: 16,
            marginBottom: 25,
        },
        valueDisplay: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            minHeight: 46
        },
        mainValues: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text
        },
        textPitch: {
            fontSize: 12,
            fontStyle: 'italic',
            color: theme.textSecundary
        },
    });
};
