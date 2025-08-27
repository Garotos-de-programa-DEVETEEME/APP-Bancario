import { useTheme } from '@/src/hooks/useTheme'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { StyledText } from '../StyledText'

type EntrarButtonProps = {
  title: string
  onPress: () => void
}

export default function EntrarButton({ title, onPress }: EntrarButtonProps) {
  const theme = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          shadowColor: theme.text,
        },
      ]}
    >
      <StyledText
        style={[
          styles.text,
          {
            color: theme.text,
            fontFamily: theme.fontFamily,
          },
        ]}
      >
        Olá,{' '}
        <StyledText style={{ fontWeight: 'bold', color: 'theme.text' }}>
          {title}
        </StyledText>
      </StyledText>

      <View style={[styles.dividerbox]}>
        <View
          style={[styles.divider, { backgroundColor: theme.alternativeIcon }]}
        />

        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <StyledText
            style={[
              styles.entrarText,
              {
                color: theme.tint,
                fontFamily: theme.fontFamily,
              },
            ]}
          >
            Entrar
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 251,
    height: 53,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  entrarText: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    width: 2,
    height: 26,
    marginHorizontal: 12,
  },
  dividerbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
