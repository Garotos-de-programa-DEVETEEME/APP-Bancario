import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import { coinFormat } from '@/utils/coinFormat';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';

interface PriceInputProps {
    value: number;
    onValueChange: (value: number) => void;
    placeholder?: number;
    alternativeText?: string;
    alternativeStyle?: StyleProp<TextStyle>;
}

export default function PriceInput({
    value,
    onValueChange,
    placeholder,
    alternativeText,
    alternativeStyle
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
            style={alternativeStyle ? alternativeStyle : styles.input}
            value={value > 0 ? coinFormat(value / 100) : ''}
            onChangeText={handleTextChange}
            keyboardType="numeric"
            placeholder={alternativeText ? alternativeText : placeholder ? coinFormat(placeholder / 100) : 'R$ 0,00'}
            placeholderTextColor={theme.textSecundary}
            multiline={false}
        />
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        input: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            padding: 12,
            fontSize: 20,
            color: theme.alternativeText,
            height: 46,
            textAlignVertical: 'center',
        },
    });
};