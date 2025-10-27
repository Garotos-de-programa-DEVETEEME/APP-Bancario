import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserProfileType = "common" | "Alana";

interface AlanaContextType {
  userProfile: UserProfileType;
  changeUserProfile: (t: UserProfileType) => void;
  toggleUserProfile: () => void;
}

const AlanaContext = createContext<AlanaContextType | undefined>(undefined);

export const AlanaProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, serUserProfile] = useState<UserProfileType>("common");

  // Carregar o tema salvo ao iniciar o aplicativo
  useEffect(() => {
    const loadTheme = async () => {
      const savedProfile = await AsyncStorage.getItem("userProfile");
      if (savedProfile === "Alana" || savedProfile === "common") {
        serUserProfile(savedProfile as UserProfileType); // Define o tema salvo
      }
    };

    loadTheme();
  }, []);

  // Salvar o tema no AsyncStorage ao alterá-lo
  const changeTheme = async (t: UserProfileType) => {
    serUserProfile(t);
    await AsyncStorage.setItem("userProfile", t); // Salva o tema no AsyncStorage
  };

  const toggleTheme = async () => {
    const profile = userProfile;
    serUserProfile(profile);
    await AsyncStorage.setItem("userProfile", profile); // Salva o tema no AsyncStorage
  };

  return (
    <AlanaContext.Provider value={{ userProfile: userProfile, changeUserProfile: changeTheme, toggleUserProfile: toggleTheme }}>
      {children}
    </AlanaContext.Provider>
  );
};

export const useAlanaContext = (): AlanaContextType => {
  const ctx = useContext(AlanaContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
};

export default AlanaContext;