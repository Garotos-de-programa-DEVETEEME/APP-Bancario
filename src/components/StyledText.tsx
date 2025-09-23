import { Text, TextProps } from 'react-native';

export function StyledText(props: TextProps) {
  return (
    <Text
      {...props}
      className={`font-whitneyRegular ${props.className ?? ''}`}
    />
  );
}
