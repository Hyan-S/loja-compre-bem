import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaListaProdutos from './screens/TelaListaProdutos';
import TelaDetalheProduto from './screens/TelaDetalheProduto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProdutos">
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
