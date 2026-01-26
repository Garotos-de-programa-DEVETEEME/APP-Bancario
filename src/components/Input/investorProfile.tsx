import { StylesType } from '@/src/@Types/stylesType';
import { formSteps } from '@/src/data/investidorPerfilPergunta';
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
}

export function InvestorProfile({ visible, onClose, onAccept, clientName}: InvestorProfileProps) {
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
                                <Image source={require('../../assets/Images/User.jpg')} style={styles.image} />
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