import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaListaProdutos from './screens/TelaListaProdutos';
import TelaDetalheProduto from './screens/TelaDetalheProduto';
import TelaCadastroProduto from './screens/TelaCadastroProduto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProdutos">
        <Stack.Screen
          name="ListaProdutos"
          component={TelaListaProdutos}
          options={({ navigation }) => ({
            title: 'Loja Compre Bem',
            headerRight: () => (
              <Button title="Novo" onPress={() => navigation.navigate('CadastroProduto')} />
            ),
          })}
        />
        <Stack.Screen
          name="DetalheProduto"
          component={TelaDetalheProduto}
          options={{ title: 'Detalhe do produto' }}
        />
        <Stack.Screen
          name="CadastroProduto"
          component={TelaCadastroProduto}
          options={{ title: 'Novo produto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
