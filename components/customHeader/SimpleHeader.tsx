import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Href, router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledText } from '../StyledText';
import { FavoriteButton } from '../buttons/favoriteButton';

interface SimpleHeaderProps {
  title: string;
  backRoute: Href;//componente em que se deve passar a rota para pagina anterior
  favorite?: boolean;
}

export default function SimpleHeader({ title, favorite = false, backRoute }: SimpleHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [favoriteFund, setFavoriteFund] = useState(false);

  useEffect(() => {
    if (favorite) {
      /* TODO fazer com base nos favoritados pelo cliente */
      setFavoriteFund(false);
    }
  }, [favorite]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: theme.background },
      ]}
    >
      {/* Botão voltar */}
      <Pressable
        onPress={() => router.replace(backRoute)}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color={theme.tint} />
      </Pressable>

      {/* Título centralizado */}
      <View style={styles.titleContainer}>
        <StyledText
          style={[styles.titleText, { color: theme.text }]} 
          numberOfLines={1}
        >
          {title}
        </StyledText>
      </View>

      {favorite ? (
        <FavoriteButton onPress={() => setFavoriteFund(prev => !prev)} selected={favoriteFund} />
      ) : (
        <View style={styles.rightPlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: 48,
    height: 48,
  },
});