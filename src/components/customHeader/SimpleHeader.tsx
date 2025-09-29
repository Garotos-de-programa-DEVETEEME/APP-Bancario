import { StylesType } from '@/src/@Types/stylesType';
import { useTheme } from '@/src/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledText } from '../StyledText';
import { FavoriteButton } from '../Buttons/favoriteButton';
import { useEffect, useState } from 'react';

interface SimpleHeaderProps {
  title: string;
  favorite?: boolean;
}

export default function SimpleHeader({ title, favorite= false }: SimpleHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = getStyles(theme);

  const [favoriteFund, setFavoriteFund] = useState(false);

  useEffect(() => {
    if(favorite){{/* TODO fazer com base nos favoritados pelo cliente */}
      setFavoriteFund(false);
    }
  },[])

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.buttonContainer}
      >
        <Ionicons name='arrow-back' size={24} color='#005A9C' />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <StyledText style={styles.title}>{title}</StyledText>
      </View>
      {favorite && (
          <FavoriteButton onPress={() => setFavoriteFund(prev => !prev)} selected={favoriteFund}/>
      )}
      <View style={styles.buttonContainer} />
    </View>
  );
}

const getStyles = (theme: StylesType) => {
  return StyleSheet.create({
    container: {
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.backgroundCards,
      paddingHorizontal: 5,
    },
    buttonContainer: {
      width: 50,
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
    },
  });
};
