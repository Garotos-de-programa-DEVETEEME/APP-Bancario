import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { StyleSheet, TextInput } from 'react-native';

interface PriceInputProps {
    value: number;
    onValueChange: (value: number) => void;
    placeholderValue: number;
}

const formatCurrency = (valueInCents: number) => {
    const valueInReais = valueInCents / 100;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valueInReais);
};

export default function PriceInput({
    value,
    onValueChange,
    placeholderValue,
}: PriceInputProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    const handleTextChange = (text: string) => {
        const apenasNumeros = text.replace(/\D/g, '');
        const valorEmCentavos = parseInt(apenasNumeros, 10) || 0;
        onValueChange(valorEmCentavos);
    };

    return (
        <TextInput
            style={styles.input}
            value={value > 0 ? formatCurrency(value) : ''}
            onChangeText={handleTextChange}
            keyboardType="numeric"
            placeholder={formatCurrency(placeholderValue)}
            placeholderTextColor={theme.textSecundary}
        />
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        input: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            padding: 16,
            fontSize: 16,
            color: theme.alternativeText, 
        },
    });
};