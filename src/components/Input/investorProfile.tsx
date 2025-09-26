import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
// CORREÇÃO: Importar o componente 'Image' do react-native
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationButton } from '../Buttons/navigationButton';
import { StyledText } from '../StyledText';

interface InvestorProfileProps {
    visible: boolean;
    onClose: () => void;
    onAccept: () => void;
    // Adicionado para tornar o componente reutilizável
    clientName: string;
    image: string;
}

export function InvestorProfile({ visible, onClose, onAccept, clientName, image }: InvestorProfileProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            animationType="slide"
        >
            <View style={styles.pageContainer}>
                
                {/* Cabeçalho */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.backButton}>
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
                
                {/* Conteúdo Central */}
                <View style={styles.content}>
                    <View style={styles.profileCard}>
                        <StyledText style={styles.cardGreeting}>Tudo bem {clientName}?</StyledText>
                        
                        <Image source={{ uri: image }} style={styles.image} />
                        
                        <StyledText style={styles.cardTitle}>Vamos Começar Seu Perfil de Investidor!</StyledText>
                    </View>
                </View>
                
                {/* Rodapé com o Botão */}
                <View style={styles.footer}>
                    <NavigationButton
                        onPress={onAccept}
                        text="Continuar"
                        width={300}
                    />
                </View>
            </View>
        </Modal>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        pageContainer: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'space-between', // Organiza em header, content e footer
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        backButton: {
            width: 40,
        },
        titleContainer: {
            flex: 1,
            alignItems: 'center',
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
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
            // Sombra para dar profundidade
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
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
            borderRadius: 100,
        },
        cardTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            textAlign: 'center',
        },
        footer: {
            alignItems: "center",
            paddingBottom: 20,
        },
    });
};