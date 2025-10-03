import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
import { Modal, StyleSheet, View } from 'react-native';
import { NavigationButton } from '../Buttons/navigationButton';
import { StyledText } from '../StyledText';

interface AlertModalProps {
    visible: boolean;
    onContinue: () => void;
    onClose: () => void;
}

export function AlertModal({ visible, onContinue, onClose }: AlertModalProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            animationType="fade"
        >
            <View style={styles.modalBackdrop}>
                <View style={styles.modalContainer}>
                    <StyledText style={styles.title}>
                        Perfil do Investidor necessário
                    </StyledText>
                    <StyledText style={styles.description}>
                        Para aplicar neste fundo você deve fazer a Análise de Perfil do Investidor. Faça o teste clicando no botão abaixo.
                    </StyledText>
                    <NavigationButton
                        onPress={onContinue}
                        text="Continuar"
                        width={261}
                    />
                </View>
            </View>
        </Modal>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        modalBackdrop: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'flex-end',
        },
        modalContainer: {
            backgroundColor: theme.backgroundCards,
            padding: 24,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            gap: 20,
        },
        title: {
            fontSize: 22,
            fontFamily: 'Whitney-Bold',
            color: theme.text,
            textAlign: 'center',
        },
        description: {
            fontSize: 16,
            color: theme.textSecundary,
            textAlign: 'center',
            lineHeight: 22,
        },
    });
};