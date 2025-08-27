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
  const styles = getStyles(theme)

  return (
    <Pressable style={styles.buttonContainer} onPress={route}>
      <MaterialIcons name={iconName} style={styles.icon} size={IconHeigth!} />
      <StyledText style={styles.buttonText}>{text}</StyledText>
    </Pressable>
  )
}

const getStyles = (theme: StylesType,) => {
  return StyleSheet.create({
    buttonContainer: {
      backgroundColor: theme.backgroundCards,
      borderRadius: 10,
      height: 60,
      maxWidth:117,
      alignItems: 'center',
      marginTop: 16,
      marginBottom: 8,
      borderColor: 'transparent',
      borderWidth: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      paddingRight:12,
      paddingLeft: 6
    },
    buttonText: {
      color: theme.tint,
      fontSize: 11,
      textAlign:'left',
    },
    icon: {
      color: theme.tint,
    },
  })
}
