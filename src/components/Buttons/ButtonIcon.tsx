import { useTheme } from '@/src/hooks/useTheme'
import { StylesType } from '@/src/themes/Colors'
import { Pressable, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyledText } from '../StyledText'

interface buttonIconProps {
  route: () => void
  text: string
  iconName: string
  IconHeigth?: number
}

export const ButtonIcon = ({
  route: route,
  text,
  iconName,
  IconHeigth,
}: buttonIconProps) => {
  const theme = useTheme()
  const styles = getStyles(theme, IconHeigth)

  return (
    <Pressable style={styles.buttonContainer} onPress={route}>
      <MaterialIcons name={iconName} style={styles.icon} size={IconHeigth!} />
      <StyledText style={styles.buttonText}>{text}</StyledText>
    </Pressable>
  )
}

const getStyles = (theme: StylesType, IconHeigth?: number) => {
  return StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme.backgroundCards,
      borderRadius: 10,
      height: 61,
      width: 110,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      borderColor: 'transparent',
      borderWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      padding: 8,
      boxSizing: 'border-box',
    },
    buttonText: {
      color: theme.tint,
      fontSize: 11,
    },
    icon: {
      color: theme.tint,
    },
  })
}
