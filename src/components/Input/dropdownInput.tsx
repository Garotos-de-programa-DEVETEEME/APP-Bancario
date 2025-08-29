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
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        dropdownPlaceholder: {
            fontSize: 16,
            color: theme.textSecundary,
        },
        dropdownValue: {
            fontSize: 16,
            color: theme.alternativeText,
            fontWeight: '600',
        },
        dropdownAbertoContainer: {
            backgroundColor: theme.backgroundCards,
            borderRadius: 8,
            overflow: 'hidden',
        },
        dropdownHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        dropdownItem: {
            padding: 16,
        },
        dropdownItemText: {
            fontSize: 16,
            color: theme.textSecundary,
        },
    });
};