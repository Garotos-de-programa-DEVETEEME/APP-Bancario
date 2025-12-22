import { useTheme } from '@/src/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Href, router, useNavigation } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyledText } from '../StyledText';
import { FavoriteButton } from '../Buttons/favoriteButton';
import { useEffect, useState } from 'react';
import { Background } from '@react-navigation/elements';

interface SimpleHeaderProps {
  title: string;
  favorite?: boolean;
  backrouter?: string;
}

export default function SimpleHeader({ title, favorite= false, backrouter}: SimpleHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [favoriteFund, setFavoriteFund] = useState(false);

  useEffect(() => {
    if(favorite){{/* TODO fazer com base nos favoritados pelo cliente */}
      setFavoriteFund(false);
    }
  },[])

  return (
    <View
      className="w-full flex-row items-center justify-between px-3"
      style={{
        paddingTop: insets.top,
        backgroundColor: theme.background, // fundo do header
      }}
    >
      {/* Botão voltar */}
      <TouchableOpacity
        onPress={() => backrouter? router.push(backrouter as Href):navigation.goBack()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        className="w-12 h-12 items-center justify-center"
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={theme.tint ?? "#005A9C"} />
      </TouchableOpacity>

      {/* Título centralizado */}
      <View className="flex-1 items-center">
        <StyledText
          className="text-[18px] font-bold"
          style={{ color: theme.text }}
          numberOfLines={1}
        >
          {title}
        </StyledText>
      </View>
      {favorite? (
          <FavoriteButton onPress={() => setFavoriteFund(prev => !prev)} selected={favoriteFund}/>
        ):(
          <View className="w-12 h-12" />
        )}
        
    </View>
  );
}
