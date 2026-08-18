import { View, Text, Image, StyleSheet } from 'react-native';
import { produtosMock } from '../data/produtos';

function ProdutoDetalhe({ produto }) {
  return (
    <View style={styles.container}>
      <Image source={produto.imagem} style={styles.imagem} />
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{produto.preco}</Text>
      <Text style={styles.descricao}>{produto.descricao}</Text>
    </View>
  );
}

function TelaDetalheProduto({ route }) {
  const { produtoId } = route.params;
  const produto = produtosMock.find((p) => p.id === produtoId);

  return <ProdutoDetalhe produto={produto} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  preco: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 8,
  },
  descricao: {
    fontSize: 15,
    lineHeight: 22,
    color: '#33475B',
    marginTop: 16,
  },
});

export default TelaDetalheProduto;
