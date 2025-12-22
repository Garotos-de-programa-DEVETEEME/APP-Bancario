import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppTheme = "dark" | "light";

interface ThemeContextType {
  theme: AppTheme;
  changeTheme: (t: AppTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const system = useColorScheme();
  const [theme, setTheme] = useState<AppTheme>(system === "dark" ? "dark" : "light");

  // Carregar o tema salvo ao iniciar o aplicativo
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("userTheme");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme as AppTheme); // Define o tema salvo
      } else {
        setTheme(system === "dark" ? "dark" : "light"); // Usa o tema do sistema como fallback
      }
    };

    loadTheme();
  }, [system]);

  // Salvar o tema no AsyncStorage ao alterá-lo
  const changeTheme = async (t: AppTheme) => {
    setTheme(t);
    await AsyncStorage.setItem("userTheme", t); // Salva o tema no AsyncStorage
  };

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem("userTheme", newTheme); // Salva o tema no AsyncStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};

export default ThemeContext;