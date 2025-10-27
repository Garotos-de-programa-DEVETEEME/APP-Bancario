import { StylesAlana, StylesAsset } from "@/constants/colors";
import AlanaProvider from "@/src/contexts/alanaContext";
import ThemeContext from "@/src/contexts/themeContext";
import { useContext } from "react";

export const useTheme = () => {
  const userTheme = useContext(ThemeContext);
  const userPofile = useContext(AlanaProvider);
  // fallback to light if provider missing
  const theme = userTheme?.theme ?? "light";
  //define como common se userProfile não estiver definido
  const profile = userPofile?.userProfile ?? "Default";
  if(profile == "Alana"){
    return StylesAlana;
  }
  //caso o tema não seja alana (só podendo ser common) retorn paleta de cores asset
  return theme === "dark" ? StylesAsset.dark : StylesAsset.light;
};

