import { Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyledText } from '../StyledText';

interface favoriteButtonsProps {
  onPress: () => void;
  selected: boolean;
  text?: string;
}

export const FavoriteButton = ({
  onPress,
  selected,
  text,
}: favoriteButtonsProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row items-center gap-[9px]"
    >
      <MaterialIcons
        name={selected ? 'star' : 'star-outline'}
        size={32}
        style={{ color: '#DF9F1C' }}
      />
      <StyledText className="text-2xl" style={{ color: '#DF9F1C' }}>
        {text}
      </StyledText>
    </Pressable>
  );
};