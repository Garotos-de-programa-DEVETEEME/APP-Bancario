import { useContext } from "react";
import { Styles } from "@/constants/colors";
import ThemeContext from "@/src/contexts/themeContext";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  // fallback to light if provider missing
  const theme = ctx?.theme ?? "light";
  return theme === "dark" ? Styles.dark : Styles.light;
};

