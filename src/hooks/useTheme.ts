import { useColorScheme } from 'react-native'
import { Styles, StylesType } from '../themes/Colors'

export const useTheme = () => {
  const colorScheme = useColorScheme()
  const theme: StylesType = colorScheme === 'dark' ? Styles.dark : Styles.light
  return theme
}
