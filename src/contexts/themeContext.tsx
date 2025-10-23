import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

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
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    // Atualiza o tema automaticamente quando o sistema muda, a menos que o usuário tenha alterado manualmente
    if (!manualOverride) {
      setTheme(system === "dark" ? "dark" : "light");
    }
  }, [system, manualOverride]);

  const changeTheme = (t: AppTheme) => {
    setManualOverride(true);
    setTheme(t);
  };

  const toggleTheme = () => {
    setManualOverride(true);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
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