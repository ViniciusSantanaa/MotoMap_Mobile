export const lightTheme = {
  background: "#f4f6f9",
  text: "#333",
  primary: "#0A3D62",
  secondary: "#1B9CFC",
  error: "#CC0000", // NOVO
  card: "#FFFFFF", // NOVO
};

export const darkTheme = {
  background: "#121212",
  text: "#f4f6f9",
  primary: "#1B9CFC",
  secondary: "#0A3D62",
  error: "#FF3333", // NOVO
  card: "#1E1E1E", // NOVO
};

// Exportamos o tipo para uso em outros lugares, como no ThemeContext.
export type Theme = typeof lightTheme;