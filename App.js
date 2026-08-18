import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import TelaListaProdutos from './screens/TelaListaProdutos';
import TelaDetalheProduto from './screens/TelaDetalheProduto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="ListaProdutos"
        screenOptions={{
          headerStyle: { backgroundColor: '#1B3A5C' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="ListaProdutos"
          component={TelaListaProdutos}
          options={{ title: 'Loja Compre Bem' }}
        />
        <Stack.Screen
          name="DetalheProduto"
          component={TelaDetalheProduto}
          options={{ title: 'Detalhe do produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
