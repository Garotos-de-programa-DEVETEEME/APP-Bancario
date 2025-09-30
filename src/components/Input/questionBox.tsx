import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from "@/src/hooks/useTheme";
import { Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from '../StyledText';

const RadioButtonOption = ({ label, selected, onPress }: { label: string, selected: boolean, onPress: () => void }) => {
    const theme = useTheme();
    const styles = getStyles(theme);
    return (
        <Pressable
            style={[styles.optionContainer, selected && styles.selectedOptionContainer]}
            onPress={onPress}
        >
            <View style={[styles.radioCircle, selected && styles.selectedCircle]}>
                {selected && <View style={styles.selectedInnerCircle} />}
            </View>
            <StyledText style={[styles.labelText, selected && styles.selectedLabelText]}>
                {label}
            </StyledText>
        </Pressable>
    );
};

interface QuestionBoxProps {
    question: string;
    options: string[];
    selectedOption: string | null;
    onSelectOption: (option: string) => void;
}

export function QuestionBox({ question, options, selectedOption, onSelectOption }: QuestionBoxProps) {
    const theme = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.stepContainer}>
            <StyledText style={styles.questionText}>
                {question}
            </StyledText>
            <View>
                {options.map((option) => (
                    <RadioButtonOption
                        key={option}
                        label={option}
                        selected={selectedOption === option}
                        onPress={() => onSelectOption(option)}
                    />
                ))}
            </View>
        </View>
    );
}

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        stepContainer: {
            backgroundColor: theme.backgroundCards,
            width: '100%',
            borderRadius: 15,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
        },
        questionText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 24,
        },
        optionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            paddingVertical: 15,
            paddingHorizontal: 10,
            width: '100%',
        },
        selectedOptionContainer: {
            backgroundColor: theme.tint,
            borderColor: theme.tint,
        },
        radioCircle: {
            height: 20,
            width: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: theme.textSecundary,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
        },
        selectedCircle: {
            borderColor: theme.whiteText,
            backgroundColor: theme.whiteText,
        },
        selectedInnerCircle: {
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: theme.tint,
        },
        labelText: {
            fontSize: 16,
            color: theme.text,
            flex: 1,
        },
        selectedLabelText: {
            color: theme.whiteText,
            fontWeight: 'bold',
        },
    });
};