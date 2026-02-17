import React, { createContext, ReactNode, useContext } from "react";
import { useColorScheme } from "react-native";

export interface ColorScheme{
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  backGround: string;
  textMuted: string;
  success: string;
  sidebar: string;
}

const lightColors: ColorScheme ={
  primary: '#8a6cff',
  background: '#F8FAFC',
  card: '#ffffff',
  text: '#000000',
  border: '#000000',
  notification: '#000000',
  backGround: '#ffffff',
  textMuted: '#94A3B8',
  success: '#10b981',
  sidebar: '#94A3B8'
}

const darkColors: ColorScheme ={
  primary: '#6366F1',
  background: '#0E2A47',
  card: '#0E2A47',
  text: '#ffffff',
  border: '#8E8E93',
  notification: '#ffffff',
  backGround: '#0E2A47',
  textMuted: '#64748B',
  success: '#34d399',
  sidebar: '#12375e'
}

interface ThemeContextType{
  isDarkMode: boolean;
  colors: ColorScheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode}) =>{
  const scheme =useColorScheme();
  const isDarkMode = scheme ==='dark';

  const colors = isDarkMode ? darkColors : lightColors;

  return(
    <ThemeContext.Provider value={{isDarkMode, colors}}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if(!context){
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;

};

export default useTheme;

