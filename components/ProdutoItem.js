import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

function ProdutoItem({ produto, favorito, onAlternarFavorito, onPress }) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Image source={produto.imagem} style={styles.imagem} />

      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>
      </View>

      <Pressable
        style={styles.coracao}
        onPress={onAlternarFavorito}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Text style={styles.coracaoTexto}>{favorito ? '♥' : '♡'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  imagem: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  preco: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 4,
  },
  coracao: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'transparent',
  },
  coracaoTexto: {
    fontSize: 26,
    lineHeight: 30,
    color: '#E53935',
  },
});

export default ProdutoItem;
