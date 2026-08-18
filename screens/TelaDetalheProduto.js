import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { produtosMock } from '../data/produtos';

// ProdutoDetalhe não sabe nada sobre navegação: recebe `produto` como PROP e desenha.
// Quem lê route.params é a tela montada pelo Stack.Navigator (TelaDetalheProduto).
function ProdutoDetalhe({ produto }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={produto.imagem} style={styles.imagem} />

      <Text style={styles.categoria}>{produto.categoria.toUpperCase()}</Text>
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>{produto.preco}</Text>

      <View style={styles.bloco}>
        <Text style={styles.rotulo}>Descrição</Text>
        <Text style={styles.texto}>{produto.descricao}</Text>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.rotulo}>Disponibilidade</Text>
        <Text style={styles.texto}>{produto.estoque} unidades em estoque</Text>
      </View>
    </ScrollView>
  );
}

function TelaDetalheProduto({ route }) {
  const { produtoId } = route.params;
  const produto = produtosMock.find((p) => p.id === produtoId);

  if (!produto) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.texto}>Produto não encontrado.</Text>
      </View>
    );
  }

  return <ProdutoDetalhe produto={produto} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoria: {
    fontSize: 11,
    letterSpacing: 1,
    color: '#6B7B8C',
    fontWeight: '600',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginTop: 4,
  },
  preco: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 8,
  },
  bloco: {
    marginTop: 20,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginBottom: 4,
  },
  texto: {
    fontSize: 15,
    lineHeight: 22,
    color: '#33475B',
  },
});

export default TelaDetalheProduto;
