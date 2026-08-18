import { View, Text, FlatList, StyleSheet } from 'react-native';
import { produtosMock } from '../data/produtos';
import ProdutoItem from '../components/ProdutoItem';

// Aula 06/07: a lista deixou de ser percorrida com .map() dentro do JSX.
// Agora quem percorre é a FlatList, que só renderiza o que está visível na tela.
function TelaListaProdutos({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={produtosMock}
        keyExtractor={(produto) => produto.id}
        renderItem={({ item, index }) => (
          <ProdutoItem
            produto={item}
            destaque={index === 0}
            onPress={() =>
              navigation.navigate('DetalheProduto', { produtoId: item.id })
            }
          />
        )}
        ListHeaderComponent={
          <Text style={styles.cabecalho}>{produtosMock.length} produtos disponíveis</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  lista: {
    padding: 16,
  },
  cabecalho: {
    fontSize: 13,
    color: '#6B7B8C',
    marginBottom: 12,
  },
  separador: {
    height: 12,
  },
});

export default TelaListaProdutos;
