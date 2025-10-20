import { FilterType } from '@/src/@Types/Filter';
import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from '@/src/hooks/useTheme';
import { Pressable, StyleSheet } from 'react-native';
import { StyledText } from '../StyledText';

interface filterOptionProps {
  info: FilterType;
  isSelected: boolean;
  onSelect: (option: number) => void;
  height?: number;
  width?: number;
}

export const FilterOption = ({
  info,
  isSelected,
  onSelect,
  height,
  width,
}: filterOptionProps) => {
  const theme = useTheme();
  const style = styles(theme, info.color, height, width);

  return (
    <Pressable
      onPress={() => onSelect(info.id)}
      style={[
        style.filterOptionContainer,
        isSelected ? style.backgoundCardSelected : style.backgroundCardDefault,
      ]}
    >
      <StyledText style={isSelected ? style.cardTextSelected : style.cardText}>
        {info.text}
      </StyledText>
    </Pressable>
  );
};

const styles = (
  theme: StylesType,
  colorIcon?: string,
  height?: number,
  width?: number,
) => {
  return StyleSheet.create({
    filterOptionContainer: {
      color: theme.text,
      width: width ? width : 120,
      height: height ? height : 32,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
    },
    backgroundCardDefault: {
      backgroundColor: theme.backgroundCards,
    },
    backgoundCardSelected: {
      backgroundColor: colorIcon ? colorIcon : theme.tint,
    },
    cardText: {
      color: colorIcon ? colorIcon : theme.text,
      fontSize: 14,
    },
    cardTextSelected: {
      color: theme.background,
      fontSize: 14,
    },
  });
};
