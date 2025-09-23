import { useTheme } from '@/src/hooks/useTheme';
import { Pressable, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyledText } from '../StyledText';
interface ButtonIconProps {
  route: () => void;
  text: string;
  iconName: string;
  IconHeight: number;
}

export const ButtonIcon = ({
  route,
  text,
  iconName,
  IconHeight,
}: ButtonIconProps) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={route}
      className='h-[60px] w-[117px] rounded-2xl flex-row items-center px-2.5 gap-2 shadow-md'
      style={{
        backgroundColor: theme.backgroundCards,
        elevation: 4,
        shadowColor: '#000',
      }}
    >
      <View className='items-center justify-center'>
        <MaterialIcons
          name={iconName}
          size={IconHeight}
          style={{ color: theme.tint }}
        />
      </View>

      <StyledText
        className='text-[12px] leading-4 flex-1'
        style={{ color: theme.tint, textAlign: 'left' }}
        numberOfLines={2}
      >
        {text}
      </StyledText>
    </Pressable>
  );
};
