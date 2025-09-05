import { FundoInvestimento } from '@/src/@Types/fundos';
import { StylesType } from '@/src/@Types/stylesType';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import { AcceptanceTerm } from '@/src/components/InfoTexts/acceptanceTerm';
import { FundClass } from '@/src/components/InfoTexts/fundClass';
import { FundDetails } from '@/src/components/InfoTexts/fundDetails';
import DropdownInput from '@/src/components/Input/dropdownInput';
import PriceInput from '@/src/components/Input/priceInput';
import { useTheme } from "@/src/hooks/useTheme";
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetalhesInvestimento() {
    const { fundData } = useLocalSearchParams();
    const theme = useTheme();
    const styles = getStyles(theme);

    //Comunicação entre componentes inputs com o Pai
    const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
    const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
    const [valorMensalOpcional, setValorMensalOpcional] = useState(0);
    const [termoVisivel, setTermoVisivel] = useState(false);

    const fund: FundoInvestimento | null = typeof fundData === 'string' ? JSON.parse(fundData) : null;

    //Bloqueio do botãm sem informação e se for menor que o valor minimo
    const isButtonEnabled = fund ? valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100 && valorSalvoDropdown !== '' : false;

    //Tela de resultados depois de aceitar o termo
    const handleNavigateToResults = () => {
        setTermoVisivel(false);
        const simulationData = {
            fund: fund,
            valorInicial: valorAplicarEmCentavos,
            valorMensal: valorMensalOpcional,
            periodo: valorSalvoDropdown,
        };
        router.push({
            pathname: '/simularInvestimento/detalhesFundo/simuladorResultados',
            params: { data: JSON.stringify(simulationData) } // Passa todos os dados como um objeto de texto
        });
    };

    return (
        <>
            {fund ? (
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
                                placeholder="Opcional"
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
                        onAccept={handleNavigateToResults}
                    />

                </>
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
    });
};