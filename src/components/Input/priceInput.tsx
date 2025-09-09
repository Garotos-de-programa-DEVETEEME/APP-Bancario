import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
import { StyleSheet, TextInput } from 'react-native';

interface PriceInputProps {
    value: number;
    onValueChange: (value: number) => void;
    placeholder: number | string;
}

//Placeholder: const [valorAplicarEmCentavos, setValorAplicarEmCentavos] = useState(0);

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
    placeholder,
}: PriceInputProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    const handleTextChange = (text: string) => {
        const apenasNumeros = text.replace(/\D/g, '');
        const valorEmCentavos = parseInt(apenasNumeros, 10) || 0;
        onValueChange(valorEmCentavos);
    };

    let placeholderText: string;
    if (typeof placeholder === 'number') {
        // Se for um número, formata como moeda
        placeholderText = formatCurrency(placeholder);
    } else {
        // Se for texto, usa diretamente
        placeholderText = placeholder;
    }

    return (
        <TextInput
            style={styles.input}
            value={value > 0 ? formatCurrency(value) : ''}
            onChangeText={handleTextChange}
            keyboardType="numeric"
            placeholder={placeholderText}
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