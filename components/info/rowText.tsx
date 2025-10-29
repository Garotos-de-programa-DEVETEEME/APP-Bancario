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
  const styles = getStyles(theme, fontSize, bold); 

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme.border }
      ]}
    >
      <Text style={styles.leftText}>
        {left}
      </Text>
      <Text style={styles.rightText}>
        {right}
      </Text>
    </View>
  );
}

const getStyles = (theme: any, fontSize: number, bold: boolean) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 8,
  },
  leftText: {
    color: theme.text,
    fontSize: fontSize,
    fontWeight: bold ? 'bold' : '300',
    marginRight: 8,
  },
  rightText: {
    flex: 1,
    color: theme.text,
    fontSize: fontSize,
    textAlign: 'right', 
  }
});