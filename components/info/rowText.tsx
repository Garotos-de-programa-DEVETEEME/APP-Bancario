import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";

interface TextRowProps{
    left: string;
    right: string | number,
    fontSize?: number
    bold?:boolean
}

export function TextRow({left, right, fontSize=16, bold=false }: TextRowProps) {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme.border }
      ]}
    >
      <Text style={{ color: theme.text, fontSize:fontSize, fontWeight:bold?'bold':'300' }}>
        {left}
      </Text>
      <Text style={{ color: theme.text, fontSize:fontSize }}>
        {right}
      </Text>
    </View>
  );
}

const getStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
  }
});

