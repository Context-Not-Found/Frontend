import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { NavigationContainer } from '@react-navigation/native';
import { requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-gesture-handler';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/navigation';

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  useEffect(() => {
    (async () => await requestForegroundPermissionsAsync())();
  }, []);

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
