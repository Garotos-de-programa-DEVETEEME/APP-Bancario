import { useContext } from "react";
import { Styles } from "../themes/Colors";
import ThemeContext from "../Context/themeContext";

export const useTheme = () => {
  const userTheme = useContext(ThemeContext);
  // fallback to light if provider missing
  const theme = userTheme?.theme ?? "light";
  return theme === "dark" ? Styles.dark : Styles.light;
};

