import { Pressable, StyleSheet } from 'react-native';
import { StyledText } from '../StyledText';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface favoriteButtonsProps {
  onPress: () => void;
  selected: boolean;
  text?: string;
}

export const FavoriteButton = ({ onPress, selected, text }: favoriteButtonsProps) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Pressable onPress={onPress} style={styles.container} android_ripple={{ color: 'rgba(0,0,0,0.05)' }}>
      <MaterialIcons
        name={selected ? 'star' : 'star-outline'}
        size={32}
        style={styles.icon}
        color={'#DF9F1C'}
      />
      <StyledText style={styles.text}>
        {text}
      </StyledText>
    </Pressable>
  );
};

const getStyles = (_theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      // gap was removed; spacing handled by icon marginRight
    },
    icon: {
      marginRight: 9,
      // color is passed via prop to icon; keep style for layout only
    },
    text: {
      fontSize: 24, // equivalent to text-2xl
      color: '#DF9F1C',
    },
  });