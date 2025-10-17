import { useColorScheme } from 'react-native'
import { Styles } from '@/constants/colors'

export const useTheme = () => {
    const colorScheme = useColorScheme()
    return colorScheme === 'dark' ? Styles.dark : Styles.light
}
