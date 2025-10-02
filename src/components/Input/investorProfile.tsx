import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
import { useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationButton } from '../Buttons/navigationButton';
import { StyledText } from '../StyledText';
import { QuestionBox } from './questionBox';

interface InvestorProfileProps {
    visible: boolean;
    onClose: () => void;
    onAccept: () => void;
    clientName: string;
    image: string;
}

const formSteps = [
    {
        id: 1,
        question: 'Por qual período você deseja manter os seus investimentos?',
        options: ['Menor que 6 meses.', 'De 6 meses a 1 ano.', 'De 1 a 3 anos.', 'Acima de 3 anos.'],
    },
    {
        id: 2,
        question: 'Com relação aos riscos envolvidos nos investimentos, como reagiria ao verificar que determinado investimento, após certo período, apresentou retorno negativo?',
        options: ['Resgataria Imediatamente', 'Determinaria um valor máximo de perda antes de resgatar', 'Realizaria aportes adicionais', 'Só resultados de longo prazo preocupariam'],
    },
    {
        id: 3,
        question: 'Qual valor atual da sua renda mensal?',
        options: ['Até R$2 Mil.', 'De R$2 mil a R$5 mil', 'Mais de R$5 mil até R$10 mil', 'Acima de R$10 mil.'],
    },
    {
        id: 4,
        question: 'Qual valor aproxima do seu patrimônio?',
        options: ['Até R$100 mil.', 'Entre R$100 mil e R$500 mil', 'Entre R$500 mil e R$1 milhão', 'Acima de R$1 milhão'],
    }
];

export function InvestorProfile({ visible, onClose, onAccept, clientName, image }: InvestorProfileProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    const [view, setView] = useState<'welcome' | 'questions'>('welcome');
    
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<Record<number, string | null>>({});

    const currentStepData = formSteps.find(s => s.id === step);

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            setView('welcome');
        }
    };

    const handleContinue = () => {
        if (step < formSteps.length) {
            setStep(step + 1);
        } else {
            console.log("Respostas Finais:", answers);
            onAccept();
        }
    };

    const handleSelectOption = (option: string) => {
        setAnswers(prev => ({ ...prev, [step]: option }));
    };

    const handleClose = () => {
        setView('welcome');
        setStep(1);
        setAnswers({});
        onClose();
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}
            animationType="slide"
        >
            <View style={styles.pageContainer}>
                {/* Cabeçalho */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={view === 'welcome' ? handleClose : handleBack} style={styles.backButton}>
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            color={theme.tint}
                            size={32} />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <StyledText style={styles.title}>
                            Perfil de Investidor
                        </StyledText>
                    </View>
                    <View style={styles.backButton} />
                </View>

                {/* 3. Renderização condicional do conteúdo */}
                {view === 'welcome' ? (
                    // --- TELA DE BOAS-VINDAS ---
                    <>
                        <View style={styles.content}>
                            <View style={styles.profileCard}>
                                <StyledText style={styles.cardGreeting}>Tudo bem {clientName}?</StyledText>
                                <Image source={{ uri: image }} style={styles.image} />
                                <StyledText style={styles.cardTitle}>Vamos Começar Seu Perfil de Investidor!</StyledText>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <NavigationButton
                                onPress={() => setView('questions')}
                                text="Continuar"
                                width={300}
                            />
                        </View>
                    </>
                ) : (
                    // --- FLUXO DE PERGUNTAS ---
                    <>
                        <View style={styles.content}>
                            {currentStepData && (
                                <QuestionBox
                                    question={currentStepData.question}
                                    options={currentStepData.options}
                                    selectedOption={answers[step]}
                                    onSelectOption={handleSelectOption}
                                />
                            )}
                        </View>
                        <View style={styles.footer}>
                            <StyledText style={styles.progressText}>
                                {step}/{formSteps.length}
                            </StyledText>
                            <NavigationButton
                                onPress={handleContinue}
                                text="Continuar"
                                width={300}
                                disabled={!answers[step]}
                            />
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
}


// --- ESTILOS (com pequenas adições) ---
const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        pageContainer: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'space-between',
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        backButton: {
            width: 40
        },
        titleContainer: {
            flex: 1, alignItems: 'center'
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text 
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        profileCard: {
            backgroundColor: theme.backgroundCards,
            width: '95%',
            borderRadius: 15,
            paddingVertical: 30,
            paddingHorizontal: 20,
            alignItems: 'center',
            gap: 20,
            elevation: 5,
        },
        cardGreeting: {
            fontSize: 28,
            color: theme.text,
            fontWeight: 'bold' 
        },
        image: {
            height: 200,
            width: 200,
            borderRadius: 100
        },
        cardTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            textAlign: 'center' 
        },
        footer: {
            alignItems: "center",
            paddingBottom: 20 
        },
        progressText: {
            color: theme.textSecundary,
            marginBottom: 10 
        },
    });
};