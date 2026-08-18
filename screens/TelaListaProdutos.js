import { View, FlatList, StyleSheet } from 'react-native';
import { produtosMock } from '../data/produtos';
import ProdutoItem from '../components/ProdutoItem';

function TelaListaProdutos({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={produtosMock}
        keyExtractor={(produto) => produto.id}
        renderItem={({ item }) => (
          <ProdutoItem
            produto={item}
            onPress={() => navigation.navigate('DetalheProduto', { produtoId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lista: {
    padding: 16,
  },
  separador: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});

export default TelaListaProdutos;
