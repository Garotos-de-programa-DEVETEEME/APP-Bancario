import { StylesType } from '@/@Types/stylesType';
import { TERMS_CONTENT } from '@/constants/termoAceite';
import { useTheme } from '@/hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationButton } from '../buttons/navigationButton';

interface AcceptanceTermProps {
    onAccept: () => void;
    isChecked: boolean;
    onToggleChecked: () => void;
}

const DIMENSIONS = {
    checkboxIconSize: 24,
    buttonHeight: 37,
    buttonWidth: 261,
    bottomSpacing: 48,
};

const COLORS = {
    checkedCheckbox: '#4C9AFE',
};

export function AcceptanceTerm({ onAccept, isChecked, onToggleChecked }: AcceptanceTermProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    const handleAccept = () => {
        if (isChecked) {
            onAccept();
        }
    };

    return (
        <ScrollView style={styles.termoContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.midLabel}>{TERMS_CONTENT.title}</Text>
            <Text style={styles.label}>
                {TERMS_CONTENT.greeting} {'\n'}
                {TERMS_CONTENT.introduction}
            </Text>
            <Text style={styles.label}>{TERMS_CONTENT.section1}</Text>
            <Text style={styles.label}>{TERMS_CONTENT.section2}</Text>
            <Text style={styles.label}>{TERMS_CONTENT.section3}</Text>
            <Text style={styles.label}>{TERMS_CONTENT.section4}</Text>
            <Text style={styles.label}>{TERMS_CONTENT.section5}</Text>
            <Text style={styles.label}>{TERMS_CONTENT.section6}</Text>
            <Text style={styles.label}>{TERMS_CONTENT.section7}</Text>
            <Text style={styles.label}>{TERMS_CONTENT.closing}</Text>

            <TouchableOpacity style={styles.checkboxContainer} onPress={onToggleChecked}>
                <MaterialIcons
                    name={isChecked ? "check-box" : "check-box-outline-blank"}
                    size={DIMENSIONS.checkboxIconSize}
                    color={isChecked ? COLORS.checkedCheckbox : theme.text}
                />
                <Text style={styles.checkboxLabel}>{TERMS_CONTENT.checkboxLabel}</Text>
            </TouchableOpacity>

            <View style={styles.buttonBox}>
                <NavigationButton
                    onPress={handleAccept}
                    text={TERMS_CONTENT.continueButton}
                    height={DIMENSIONS.buttonHeight}
                    width={DIMENSIONS.buttonWidth}
                    disabled={!isChecked}
                />
            </View>
            <View style={{ height: DIMENSIONS.bottomSpacing }} />
        </ScrollView>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        termoContainer: {
            padding: 25,
        },
        midLabel: {
            fontSize: 20,
            color: theme.text,
            marginTop: 15,
            marginBottom: 10,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        label: {
            fontSize: 15,
            color: theme.text,
            marginBottom: 10,
        },
        buttonBox: {
            alignItems: "center",
        },
        checkboxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 10,
            alignSelf: 'center'
        },
        checkboxLabel: {
            marginLeft: 10,
            fontSize: 15,
            color: theme.text,
        },
    });
};
