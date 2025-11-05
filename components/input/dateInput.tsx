import { StylesType } from '@/@Types/stylesType';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface DateInputProps {
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  placeholder,
  onValueChange,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleTextChange = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    let formattedText = '';

    if (numbers.length > 0) {
      formattedText = numbers.substring(0, 2);
    }
    if (numbers.length > 2) {
      formattedText += '/' + numbers.substring(2, 4);
    }
    if (numbers.length > 4) {
      formattedText += '/' + numbers.substring(4, 8);
    }

    onValueChange(formattedText);
  };

  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={handleTextChange}
      placeholder={placeholder}
      placeholderTextColor={theme.textSecundary}
      keyboardType="numeric"
      maxLength={10}
    />
  );
};

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
export default DateInput;