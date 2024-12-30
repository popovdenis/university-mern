import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

//color desing tokens

export const tokens = (mode) => ({
  ...(mode === "dark"
      ? {
        grey: {
          100: "#d3d3d3",
          200: "#b0b0b0",
          300: "#8d8d8d",
          400: "#6a6a6a",
          500: "#474747",
          600: "#353535",
          700: "#282828",
          800: "#1b1b1b",
          900: "#0f0f0f",
        },
        primary: {
          100: "#c4c4c4",
          200: "#9a9a9a",
          300: "#707070",
          400: "#383838", // основной цвет фона
          500: "#1e1e1e",
          600: "#171717",
          700: "#111111",
          800: "#0b0b0b",
          900: "#050505",
        },
        greenAccent: {
          100: "#e0f7ec",
          200: "#c3eed8",
          300: "#a6e5c4",
          400: "#89dbb0",
          500: "#6cd29c",
          600: "#56a67d",
          700: "#40795e",
          800: "#2a4d3f",
          900: "#14201f",
        },
        blueAccent: {
          100: "#cce4ff",
          200: "#99caff",
          300: "#66b0ff",
          400: "#338fff",
          500: "#006eff", // акцентный цвет
          600: "#0055cc",
          700: "#003d99",
          800: "#002666",
          900: "#001033",
        },
        redAccent: {
          100: "#fde6e6",
          200: "#fbc4c4",
          300: "#f8a3a3",
          400: "#f58181",
          500: "#f35f5f",
          600: "#c34c4c",
          700: "#933939",
          800: "#622626",
          900: "#311313",
        },
      }
      : {
        grey: {
          100: "#212121", // Более темный текст
          200: "#424242",
          300: "#616161",
          400: "#757575",
          500: "#9e9e9e",
          600: "#bdbdbd",
          700: "#e0e0e0",
          800: "#eeeeee",
          900: "#ffffff",
        },
        primary: {
          100: "#ffffff",
          200: "#fafafa",
          300: "#f4f4f4",
          400: "#eeeeee",
          500: "#e8e8e8", // основной цвет фона
          600: "#c6c6c6",
          700: "#a3a3a3",
          800: "#818181",
          900: "#5e5e5e",
        },
        greenAccent: {
          100: "#f0fdf7",
          200: "#e1fbee",
          300: "#d2f8e6",
          400: "#c3f6dd",
          500: "#b4f3d4",
          600: "#90c7aa",
          700: "#6d9b7f",
          800: "#496f55",
          900: "#24372a",
        },
        blueAccent: {
          100: "#e0f4ff",
          200: "#c2e8ff",
          300: "#a3dbff",
          400: "#85cfff",
          500: "#66c3ff", // акцентный цвет
          600: "#529ccc",
          700: "#3d7699",
          800: "#295066",
          900: "#142833",
        },
        redAccent: {
          100: "#ffe5e5",
          200: "#ffcccc",
          300: "#ffb2b2",
          400: "#ff9999",
          500: "#ff7f7f",
          600: "#cc6666",
          700: "#994c4c",
          800: "#663333",
          900: "#331919",
        },
      }),
});

export const themeSettins = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
          ? {
            primary: {
              main: colors.primary[400],
            },
            secondary: {
              main: colors.greenAccent[400],
            },
            neutral: {
              main: colors.grey[500],
              dark: colors.grey[800],
              light: colors.grey[300],
            },
            background: {
              default: colors.primary[500],
              paper: colors.primary[600],
            },
            sidebar: {
              bg: colors.primary[600],
              text: colors.grey[100]
            }
          }
          : {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              main: colors.grey[500],
              dark: colors.grey[700],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[100],
              paper: colors.primary[300],
            },
            sidebar: {
              bg: colors.primary[200],
              text: colors.grey[900]
            }
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "2rem",
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.75rem",
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.5rem",
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.25rem",
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1rem",
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: "0.875rem",
      },
    },
  };
};

//context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettins(mode)), [mode]);
  return [theme, colorMode];
};
