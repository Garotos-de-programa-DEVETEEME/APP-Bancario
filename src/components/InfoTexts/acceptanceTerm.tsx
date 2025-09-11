import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationButton } from '../Buttons/navigationButton';

interface AcceptanceTermProps {
    visible: boolean;
    onClose: () => void;
    onAccept: () => void;
}

export function AcceptanceTerm({ visible, onClose, onAccept }: AcceptanceTermProps) {
    const theme = useTheme();
    const styles = getStyles(theme);
    const [isChecked, setIsChecked] = useState(false);

    const handleAccept = () => {
        if (isChecked) {
            onAccept();
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.termoContainer}>
                    <View>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                color="#4C9AFE"
                                size={26} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.midLabel}>Termo de Aceite</Text>

                    <Text style={styles.label}>
                        Prezado(a) Cliente, {'\n'}
                        Antes de prosseguir com a utilização da nossa ferramenta de simulação de fundo de investimento, é fundamental que você leia, compreenda e concorde com os termos e condições descritos abaixo. Ao participar da Simulação, você manifesta sua plena e inequívoca aceitação a este Termo.
                    </Text>
                    <Text style={styles.label}>
                        1. Natureza da Simulação:{'\n'}
                        1.1. A Simulação é uma ferramenta desenvolvida com propósitos puramente educacionais e ilustrativos. Ela visa proporcionar uma experiência interativa para demonstrar o funcionamento hipotético de um fundo de investimento, com base em cenários e dados pré-definidos ou históricos. 1.2. A Simulação não envolve dinheiro real. Quaisquer valores, aportes, resgates, rentabilidades, saldos ou movimentações financeiras exibidas na Simulação são inteiramente fictícios e virtuais.
                    </Text>
                    <Text style={styles.label}>
                        2. Ausência de Ganhos ou Perdas Reais:{'\n'}
                        2.1. Os resultados apresentados na Simulação, sejam eles positivos (lucros) ou negativos (prejuízos), são meramente hipotéticos. Eles não geram qualquer direito a ganhos financeiros reais, nem implicam em qualquer obrigação de arcar com perdas financeiras reais.{'\n'}
                        2.2. A participação na Simulação não resultará em qualquer crédito, débito, ou impacto financeiro em suas contas bancárias ou investimentos reais.
                    </Text>
                    <Text style={styles.label}>
                        3. Finalidade Educacional e Ilustrativa – Não Constitui Aconselhamento:{'\n'}
                        3.1. A Simulação e todas as informações nela contidas são fornecidas exclusivamente para fins de aprendizado e familiarização com conceitos de investimento.{'\n'}
                        3.2. A Simulação não constitui, em nenhuma hipótese, aconselhamento financeiro, recomendação de investimento, oferta de produtos financeiros, análise de perfil de investidor, ou qualquer tipo de consultoria de investimentos.{'\n'}
                        3.3. As informações e resultados gerados pela Simulação não devem ser interpretados como uma sugestão para comprar, vender ou manter qualquer ativo financeiro real, nem como uma garantia de rentabilidade futura em investimentos reais.
                    </Text>
                    <Text style={styles.label}>
                        4. Desempenho Passado e Simulado Não é Garantia de Resultados Futuros:{'\n'}
                        4.1. Quaisquer dados históricos ou projeções utilizados na Simulação servem apenas para fins ilustrativos. O desempenho passado de mercados ou ativos, ou o desempenho simulado, não é garantia nem indicador confiável de resultados futuros em investimentos reais.{'\n'}
                        4.2. Investimentos reais estão sujeitos a diversos riscos de mercado, liquidez, crédito, entre outros, que podem resultar na perda parcial ou total do capital investido. Estes riscos podem não ser integralmente replicados ou abordados na Simulação.
                    </Text>
                    <Text style={styles.label}>
                        5. Isenção de Responsabilidade:{'\n'}
                        5.1. Nós não nos responsabilizamos por quaisquer decisões de investimento que você venha a tomar com base nas informações ou resultados obtidos através da Simulação.{'\n'}
                        5.2. Você é o único responsável por buscar aconselhamento financeiro profissional e qualificado antes de tomar qualquer decisão de investimento real.{'\n'}
                        5.3. Não garantimos a precisão, completude ou atualidade contínua dos dados utilizados na Simulação, embora envidemos esforços para utilizar informações confiáveis. A Simulação é oferecida &quot;como está&quot; e &quot;conforme disponível&quot;.
                    </Text>
                    <Text style={styles.label}>
                        6. Ausência de Relação Fiduciária:{'\n'}
                        6.1. A sua participação na Simulação não cria qualquer tipo de relação fiduciária, de clientela ou de consultoria entre você e nossa instituição, para além do estabelecido neste Termo para o uso da ferramenta de simulação.
                    </Text>
                    <Text style={styles.label}>
                        7. Aceitação do Cliente:{'\n'}
                        7.1. Ao marcar a caixa de seleção/clicar no botão &quot;Concordo&quot; / &quot;Aceito&quot; / &quot;Iniciar Simulação&quot; (ou funcionalidade similar), você declara que: a. Leu atentamente todos os termos e condições deste documento. b. Compreendeu integralmente a natureza e os objetivos da Simulação. c. Está ciente de que a Simulação não envolve dinheiro real e não gera quaisquer ganhos ou perdas financeiras reais. d. Entende que a Simulação não constitui aconselhamento ou recomendação de investimento. e. Concorda em isentar nossa instituição de qualquer responsabilidade por decisões de investimento que possa tomar com base no uso da Simulação.
                    </Text>
                    <Text style={styles.label}>
                        Caso não concorde com qualquer um dos termos aqui expostos, por favor, não prossiga com a utilização da Simulação.{'\n\n'}
                        Atenciosamente,{'\n'}
                        Banestes DTVM
                    </Text>

                    <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
                        <MaterialIcons
                            name={isChecked ? "check-box" : "check-box-outline-blank"}
                            size={24}
                            color={isChecked ? "#4C9AFE" : theme.text}
                        />
                        <Text style={styles.checkboxLabel}>Li e concordo com os termos.</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonBox}>
                        <NavigationButton
                            onPress={handleAccept}
                            text="Continuar"
                            height={37}
                            width={261}
                            disabled={!isChecked}
                        />
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        scrollView: {
            backgroundColor: theme.background
        },
        termoContainer: {
            padding: 25,
            alignContent: 'center',
            justifyContent: 'center',
            gap: 10
        },
        midLabel: {
            fontSize: 20,
            color: theme.text,
            marginTop: 15,
            marginBottom: 10,
            fontWeight: 'bold'
        },
        label: {
            fontSize: 15,
            color: theme.text
        },
        buttonBox: {
            alignItems: "center",
        },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
        },
        checkboxLabel: {
            marginLeft: 10,
            fontSize: 15,
            color: theme.text,
        },
    });
};

