import { useTheme } from '@/src/hooks/useTheme';
import { Pressable } from 'react-native';
import { StyledText } from '../StyledText';

interface NavigationButtonProps {
  onPress: () => void;
  text: string;
  transparentStyle?: boolean; // parâmetro que controla o estilo do componente
  disabled?: boolean;
  width?: number;
}

export const NavigationButton = ({
  // componente de botão de navegação
  onPress,
  text,
  transparentStyle,
  disabled,
  width = 180,
}: NavigationButtonProps) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="rounded-[10px] justify-center items-center mt-4 mb-2 border"
      style={{
        backgroundColor: transparentStyle ? 'transparent' : theme.tint,
        borderColor: theme.tint,
        borderWidth: 1,
        width,
      }}
    >
      <StyledText
        className="text-xl font-medium"
        style={{
          color: transparentStyle ? theme.tint : theme.whiteText,
        }}
      >
        {text}
      </StyledText>
    </Pressable>
  );
};