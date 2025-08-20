import { FilterType } from '@/src/@Types/Filter'
import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { StyleSheet, View } from 'react-native'
import { StyledText } from '../StyledText'

interface filterSelectedProps {
  data: FilterType
}

export const FiltersSelected = ({ data }: filterSelectedProps) => {
  const theme = useTheme()
  const style = getStyle(theme, data)

  return (
    <View style={style.container}>
      <StyledText style={style.text}>{data.placeholder}</StyledText>
    </View>
  )
}

function getStyle(theme: StylesType, data: FilterType) {
  return StyleSheet.create({
    container: {
      backgroundColor: data.color ? data.color : theme.tint,
      width: 120,
      height: 22,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.whiteText,
      fontFamily: theme.fontFamily,
      fontWeight: 500,
      fontSize: 14,
    },
  })
}
