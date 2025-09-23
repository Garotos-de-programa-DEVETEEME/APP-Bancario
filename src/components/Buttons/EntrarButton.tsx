import { useTheme } from '@/src/hooks/useTheme';
import { TouchableOpacity, View } from 'react-native';
import { StyledText } from '../StyledText';

type EntrarButtonProps = {
  title: string;
  onPress: () => void;
};

export default function EntrarButton({ title, onPress }: EntrarButtonProps) {
  const theme = useTheme();

  return (
    <View
      className='w-[251px] h-[53px] rounded-[10px] flex-row items-center justify-between py-[10px] px-4 shadow'
      style={{
        backgroundColor: theme.background,
        shadowColor: theme.text,
      }}
    >
      <StyledText className='text-base' style={{ color: theme.text }}>
        Olá, {/* TODO trocar por variavel nome cliente */}
        <StyledText style={{ fontWeight: 'bold', color: theme.text }}>
          {title}
        </StyledText>
      </StyledText>

      <View className='flex-row items-center'>
        <View
          className='w-[2px] h-[26px] mx-3'
          style={{ backgroundColor: theme.alternativeIcon }}
        />

        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <StyledText
            className='text-base font-medium'
            style={{ color: theme.tint }}
          >
            Entrar
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
