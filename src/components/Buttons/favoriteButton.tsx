import { Pressable, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StyledText } from '../StyledText'
interface favoriteButtonsProps {
  onPress: () => void
  selected: boolean
  text?: string
}

export const FavoriteButton = ({//componente de botão de estrela
  onPress,
  selected,
  text,
}: favoriteButtonsProps) => {
  return (
    <Pressable onPress={onPress} style={styles.buttonContainer}>
      {selected ? (
        <MaterialIcons name={'star'} size={32} style={styles.buttonIcon} />
      ) : (
        <MaterialIcons
          name={'star-outline'}
          size={32}
          style={styles.buttonIcon}
        />
      )}
      <StyledText style={styles.buttonText}>{text}</StyledText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
  },
  buttonIcon: {
    color: '#DF9F1C',
  },
  buttonText: {
    color: '#DF9F1C',
    fontSize: 16,
  },
})
