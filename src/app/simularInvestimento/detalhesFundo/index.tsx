import { FundoInvestimento } from '@/src/@Types/fundos';
import { NavigationButton } from '@/src/components/Buttons/navigationButton';
import DropdownInput from '@/src/components/Input/dropdownInput';
import PriceInput from '@/src/components/Input/priceInput';
import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DetalhesInvestimento() {
    const { fundData } = useLocalSearchParams();
    const theme = useTheme();
    const styles = getStyles(theme);
    const fund: FundoInvestimento | null = typeof fundData === 'string' ? JSON.parse(fundData) : null;

    //Comunicação entre componentes inputs com o Pai
    const [valorSalvoDropdown, setValorSalvoDropdown] = useState('');
    const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);
    const [valorMensalOpcional, setValorMensalOpcional] = useState(0);

    const [termoVisivel, setTermoVisivel] = useState(false);

    //Retorno de erro (Tem que ser aqui se não dá erro no bloqueio do botão, pois ts pode achar que o fundo é null)
    if (!fund) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{ title: "Erro" }} />
                <Text>Erro: Dados do fundo não encontrados.</Text>
            </View>
        )
    }
    //Bloqueio do botãm sem informação e se for menor que o valor minimo
    const isButtonEnabled = valorAplicarEmCentavos >= fund.valorAplicacaoInicial * 100 && valorSalvoDropdown !== '';

    

    return (
        <>
            <ScrollView style={styles.scrollView}>
                <Stack.Screen options={{ title: "Simular Investimento" }} />
                <View style={styles.container}>
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

                    <View style={styles.classArea}>
                        <View style={styles.separator} />
                        <View style={styles.detailRow}>
                            <Text style={styles.className}>Classificação de risco</Text>
                            <Text style={styles.classDetail}>PLACEHOLDER</Text>
                        </View>
                        <View style={styles.separator} />

                        <View style={styles.detailRow}>
                            <Text style={styles.className}>Classificação CVM</Text>
                            <Text style={styles.classDetail}>PLACEHOLDER</Text>
                        </View>
                        <View style={styles.separator} />

                        <View style={styles.detailRow}>
                            <Text style={styles.className}>Subclasse CVM</Text>
                            <Text style={styles.classDetail}>PLACEHOLDER</Text>
                        </View>
                        <View style={styles.separator} />

                        <View style={styles.detailRow}>
                            <Text style={styles.className}>Tipo ANBIMA</Text>
                            <Text style={styles.classDetail}>PLACEHOLDER</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>

                    <View style={[styles.buttonBox, { opacity: isButtonEnabled ? 1 : 0.5 }]}>
                        <NavigationButton onPress={() => setTermoVisivel(true)}
                            text={'Simular'}
                            width={261}
                            height={37} />
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={termoVisivel}
                onRequestClose={() => setTermoVisivel(false)}
            >

                {/* //TODO Transformar isso em Sheet Modal e refazer tudo */}
                <ScrollView style={styles.scrollView}>
                    <View style={styles.termoContainer}>

                        <Text style={styles.midLabel}>Termo de Aceite</Text>

                        <text>
                            Prezado(a) Cliente, <br />
                            Antes de prosseguir com a utilização da nossa ferramenta de simulação de fundo de investimento, é fundamental que você leia, compreenda e concorde com os termos e condições descritos abaixo. Ao participar da Simulação, você manifesta sua plena e inequívoca aceitação a este Termo.
                        </text> <text>
                            1. Natureza da Simulação:
                            1.1. A Simulação é uma ferramenta desenvolvida com propósitos puramente educacionais e ilustrativos. Ela visa proporcionar uma experiência interativa para demonstrar o funcionamento hipotético de um fundo de investimento, com base em cenários e dados pré-definidos ou históricos. 1.2. A Simulação não envolve dinheiro real. Quaisquer valores, aportes, resgates, rentabilidades, saldos ou movimentações financeiras exibidas na Simulação são inteiramente fictícios e virtuais.
                        </text> <text>
                            2. Ausência de Ganhos ou Perdas Reais:
                            2.1. Os resultados apresentados na Simulação, sejam eles positivos (lucros) ou negativos (prejuízos), são meramente hipotéticos. Eles não geram qualquer direito a ganhos financeiros reais, nem implicam em qualquer obrigação de arcar com perdas financeiras reais.
                            2.2. A participação na Simulação não resultará em qualquer crédito, débito, ou impacto financeiro em suas contas bancárias ou investimentos reais.
                        </text> <text>
                            3. Finalidade Educacional e Ilustrativa – Não Constitui Aconselhamento:
                            3.1. A Simulação e todas as informações nela contidas são fornecidas exclusivamente para fins de aprendizado e familiarização com conceitos de investimento.
                            3.2. A Simulação não constitui, em nenhuma hipótese, aconselhamento financeiro, recomendação de investimento, oferta de produtos financeiros, análise de perfil de investidor, ou qualquer tipo de consultoria de investimentos.
                            3.3. As informações e resultados gerados pela Simulação não devem ser interpretados como uma sugestão para comprar, vender ou manter qualquer ativo financeiro real, nem como uma garantia de rentabilidade futura em investimentos reais.
                        </text> <text>
                            4. Desempenho Passado e Simulado Não é Garantia de Resultados Futuros:
                            4.1. Quaisquer dados históricos ou projeções utilizados na Simulação servem apenas para fins ilustrativos. O desempenho passado de mercados ou ativos, ou o desempenho simulado, não é garantia nem indicador confiável de resultados futuros em investimentos reais.
                            4.2. Investimentos reais estão sujeitos a diversos riscos de mercado, liquidez, crédito, entre outros, que podem resultar na perda parcial ou total do capital investido. Estes riscos podem não ser integralmente replicados ou abordados na Simulação.
                        </text> <text>
                            5. Isenção de Responsabilidade:
                            5.1. Nós não nos responsabilizamos por quaisquer decisões de investimento que você venha a tomar com base nas informações ou resultados obtidos através da Simulação.
                            5.2. Você é o único responsável por buscar aconselhamento financeiro profissional e qualificado antes de tomar qualquer decisão de investimento real.
                            5.3. Não garantimos a precisão, completude ou atualidade contínua dos dados utilizados na Simulação, embora envidemos esforços para utilizar informações confiáveis. A Simulação é oferecida "como está" e "conforme disponível".
                        </text> <text>
                            6. Ausência de Relação Fiduciária:
                            6.1. A sua participação na Simulação não cria qualquer tipo de relação fiduciária, de clientela ou de consultoria entre você e nossa instituição, para além do estabelecido neste Termo para o uso da ferramenta de simulação.
                        </text> <text>
                            7. Aceitação do Cliente:
                            7.1. Ao marcar a caixa de seleção/clicar no botão "Concordo" / "Aceito" / "Iniciar Simulação" (ou funcionalidade similar), você declara que: a. Leu atentamente todos os termos e condições deste documento. b. Compreendeu integralmente a natureza e os objetivos da Simulação. c. Está ciente de que a Simulação não envolve dinheiro real e não gera quaisquer ganhos ou perdas financeiras reais. d. Entende que a Simulação não constitui aconselhamento ou recomendação de investimento. e. Concorda em isentar nossa instituição de qualquer responsabilidade por decisões de investimento que possa tomar com base no uso da Simulação.
                        </text> <text>
                            Caso não concorde com qualquer um dos termos aqui expostos, por favor, não prossiga com a utilização da Simulação.
                            Atenciosamente,
                            Banestes DTVM
                        </text>
                    </View>

                    {/* //TODO Adicionar Checkbox */}
                    <View style={styles.buttonBox}>
                        <NavigationButton
                            onPress={() => setTermoVisivel(false)}
                            text="Continuar"
                            height={37}
                            width={261}
                        />
                    </View>

                </ScrollView>

            </Modal>
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
            paddingTop: 10
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
        input: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            padding: 16,
            fontSize: 16,
            color: theme.alternativeText,
        },
        midLabel: {
            fontSize: 20,
            color: theme.text,
            marginTop: 15,
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
        dropdownPlaceholder: {
            fontSize: 16,
            color: theme.textSecundary,
        },
        dropdownValue: {
            fontSize: 16,
            color: theme.alternativeText,
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
        dropdownItemText: {
            fontSize: 16,
            color: theme.textSecundary,
        },
        classArea: {
            marginTop: 20
        },
        className: {
            fontSize: 16,
            fontWeight: 500,

        },
        classDetail: {
            fontSize: 15,
            fontWeight: 300
        },
        buttonBox: {
            alignItems: "center",
        },
        termoContainer: {
            padding: 25,
            alignContent: 'center',
            justifyContent: 'center',
            gap: 10
        }
    });
};