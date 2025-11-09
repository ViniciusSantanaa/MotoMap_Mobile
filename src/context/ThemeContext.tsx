import React, { createContext, useContext, useState, ReactNode } from "react";
// Importamos o tipo Theme para garantir que ThemeContextType esteja correta.
import { lightTheme, darkTheme, Theme } from "../theme/theme"; 

type ThemeContextType = {
  // Usamos o tipo Theme que agora inclui background, text, primary, secondary, error e card
  theme: Theme; 
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? darkTheme : lightTheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}