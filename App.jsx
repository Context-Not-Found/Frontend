import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { NavigationContainer } from '@react-navigation/native';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/navigation';
// import { Provider as StoreProvider } from 'react-redux';
// import store from './src/store/store';

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    // <StoreProvider store={store}>
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
    // </StoreProvider>
  );
}
