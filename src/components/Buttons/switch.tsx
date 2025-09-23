import React, { useRef, useEffect } from 'react';
import { View, Pressable, StyleSheet, Animated } from 'react-native';
import { StylesType } from "@/src/@Types/stylesType";
import { useTheme } from "@/src/hooks/useTheme";

interface SwitchButtonProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export const SwitchButton = ({ value, onValueChange }: SwitchButtonProps) => {
    const theme = useTheme();
    const styles = getStyles(theme);

    // Animated value para a posição do 'thumb'
    const thumbPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        // Anima a posição do 'thumb' quando o valor muda
        Animated.timing(thumbPosition, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    // Interpola a posição para o movimento horizontal
    const translateX = thumbPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 22],
    });

    return (
        <Pressable onPress={() => onValueChange(!value)}>
            <View style={[styles.track, value && styles.trackEnabled]}>
                <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
            </View>
        </Pressable>
    );
};

const getStyles = (theme: StylesType) => {
    return StyleSheet.create({
        track: {
            width: 44,
            height: 22,
            borderRadius: 11,
            backgroundColor: theme.border,
            justifyContent: 'center',
        },
        trackEnabled: {
            backgroundColor: '#3478F6', // Azul do design
        },
        thumb: {
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: theme.backgroundCards,
            position: 'absolute',
            left: 2,
        },
    });
};