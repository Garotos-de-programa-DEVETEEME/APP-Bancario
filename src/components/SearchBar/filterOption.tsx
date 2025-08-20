import { FilterType } from '@/src/@Types/Filter'
import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { Pressable, StyleSheet } from 'react-native'
import { StyledText } from '../StyledText'

interface filterOptionProps {
  info: FilterType
  isSelected: boolean
  onSelect: (option: number) => void
  height?: number
  width?: number
}

export const FilterOption = ({
  info,
  isSelected,
  onSelect,
  height,
  width,
}: filterOptionProps) => {
  const theme = useTheme();
  const style = styles(theme, isSelected,info.color, height, width);

  return (
    <Pressable
      onPress={() => onSelect(info.id)}
      style={style.filterOptionContainer}
    >
      <StyledText style={style.cardText}>{info.placeholder}</StyledText>
    </Pressable>
  )
}

const styles = (
  theme: StylesType,
  isSelected:boolean,
  colorIcon?: string,
  height?: number,
  width?: number,
) => {
  return StyleSheet.create({
    filterOptionContainer: {
      backgroundColor: isSelected? colorIcon? colorIcon:theme.tint:theme.backgroundCards,
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
    cardText: {
      color: colorIcon? isSelected? theme.text:colorIcon:theme.text,
      fontSize: 14,
    },
    cardTextSelected: {
      color: theme.text,
      fontSize: 14,
    },
  })
}
