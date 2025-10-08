import { useTheme } from "@/src/hooks/useTheme";
import { Text } from "react-native";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";

interface ResultRowProps {
    label: string;
    value: string;
}

export function ResultRow({ label, value }: ResultRowProps) {
    const theme = useTheme();

    return (
        <Animated.View
            entering={FadeInDown.duration(140)}
            layout={LinearTransition.springify().damping(18)}
            className="rounded-2xl p-4 min-h-[46px] flex-row items-center justify-between shadow elevation-2"
            style={{ backgroundColor: theme.backgroundCards }}
        >
            <Text className="font-bold" style={{ fontSize: 18, color: theme.text }}>
                {label}
            </Text>
            <Text className="font-bold" style={{ fontSize: 18, color: theme.text }}>
                {value}
            </Text>
        </Animated.View>
    );
}