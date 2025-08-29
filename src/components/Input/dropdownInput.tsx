import { useTheme } from "@/src/hooks/useTheme";
import { StylesType } from "@/src/themes/Colors";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface DropdownInputProps {
    content: Array<string>;
    placeholder: string;
    onValueChange?: (value: string) => void;
}

//Página Pai: const [valorSalvo, setValorSalvo] = useState('');

export default function DropdownInput({
    content,
    placeholder,
    onValueChange,
}: DropdownInputProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    const [selectedValue, setSelectedValue] = useState(placeholder);
    const [dropdownAberto, setDropdownAberto] = useState(false);

    const isValueSelected = selectedValue !== placeholder;

    const handleSelect = (item: string) => {
        setSelectedValue(item);
        setDropdownAberto(false);
        if (onValueChange) {
            onValueChange(item);
        }
    };

    return (
        <>
            {!dropdownAberto ? (
                <Pressable 
                    style={styles.dropdownFechado} 
                    onPress={() => setDropdownAberto(true)}
                >
                    <Text style={isValueSelected ? styles.dropdownValue : styles.dropdownPlaceholder}>
                        {selectedValue}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color={theme.textSecundary} />
                </Pressable>
            ) : (
                <View style={styles.dropdownAbertoContainer}>
                    <Pressable style={styles.dropdownHeader} onPress={() => setDropdownAberto(false)}>
                        <Text style={styles.dropdownPlaceholder}>{placeholder}</Text>
                        <MaterialIcons name="keyboard-arrow-up" size={24} color={theme.textSecundary} />
                    </Pressable>
                    {content.map((item) => (
                        <Pressable
                            key={item}
                            style={styles.dropdownItem}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.dropdownItemText}>{item}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
        </>
    );
}

const getStyles = (theme: StylesType) =>{
    return StyleSheet.create({
        dropdownFechado: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            padding: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 46
        },
        dropdownPlaceholder: {
            fontSize: 20,
            color: theme.textSecundary,
        },
        dropdownValue: {
            fontSize: 20,
            color: theme.alternativeText,
        },
        dropdownAbertoContainer: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 16,
            overflow: 'hidden',
        },
        dropdownHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            height: 46
        },
        dropdownItem: {
            padding: 12,
        },
        dropdownItemText: {
            fontSize: 20,
            color: theme.textSecundary,
        },
    });
};