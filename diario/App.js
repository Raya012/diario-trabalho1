import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { TemaProvider, useTema } from './src/context/TemaContext';
import AppNavigator from './src/navigation/AppNavigator';

function Raiz() {
  const { t, escuro } = useTema();
  const base = escuro ? DarkTheme : DefaultTheme;
  const tema = { ...base, colors: { ...base.colors, background: t.bg, card: t.card, text: t.ink, border: t.line, primary: t.accent } };
  return (
    <NavigationContainer theme={tema}>
      <StatusBar style={escuro ? 'light' : 'dark'} />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return <TemaProvider><Raiz /></TemaProvider>;
}
