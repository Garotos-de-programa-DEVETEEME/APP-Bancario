import { FilterType } from '@/src/@Types/Filter'
import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { Pressable, StyleSheet, Text } from 'react-native'
import { StyledText } from '../StyledText'

interface filterOptionProps {
  info: FilterType
  isSelected: boolean
  onSelect: (option: number) => void
  type?: 'default' | 'risk' | 'searchBar'
  height?: number
  width?: number
}

export const FilterOption = ({
  info,
  isSelected,
  onSelect,
  height,
  width,
  type = 'default',
}: filterOptionProps) => {
  const theme = useTheme()
  const style = styles(theme, info.color, height, width)

  return (
    <Pressable
      onPress={() => onSelect(info.id)}
      style={
        isSelected
          ? style.filteoptrOptionContainerSelected
          : style.filterOptionContainer
      }
    >
      {type === 'risk' && !isSelected && (
        <StyledText style={style.placeholderRiskIcon}></StyledText> /*TODO alterar o fundo  */
      )}
      <StyledText style={style.placeholderText}>{info.placeholder}</StyledText>
    </Pressable>
  )
}

const styles = (
  theme: StylesType,
  colorIcon?: string,
  height?: number,
  width?: number,
) => {
  return StyleSheet.create({
    filterOptionContainer: {
      backgroundColor: theme.backgroundCards,
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
    filteoptrOptionContainerSelected: {
      backgroundColor: colorIcon ? colorIcon : theme.tint,
      color: theme.text,
      width: width ? width : 120,
      height: height ? height : 32,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: 2,
    },
    placeholderText: {
      color: theme.text,
      fontSize: 14,
    },
    placeholderRiskIcon: {
      width: 10,
      height: 10,
      borderRadius: 10 / 2,
      backgroundColor: colorIcon,
    },
  })
}
