import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

// `produto`, `destaque` e `onPress` são PROPS: vêm de fora, o item só lê (fluxo unidirecional).
// `favorito` e `quantidade` são ESTADO: nascem e mudam dentro deste item, um por linha da lista.
function ProdutoItem({ produto, destaque = false, onPress }) {
  const [favorito, setFavorito] = useState(false);
  const [quantidade, setQuantidade] = useState(0);

  return (
    <Pressable
      style={[styles.item, destaque && styles.itemDestaque]}
      onPress={onPress}
      android_ripple={{ color: '#E3EAF2' }}
    >
      <Image source={produto.imagem} style={styles.imagem} />

      <View style={styles.info}>
        {destaque && <Text style={styles.selo}>MAIS VENDIDO</Text>}
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.categoria}>{produto.categoria}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>

        <View style={styles.contador}>
          <Pressable
            style={styles.botaoContador}
            onPress={() => setQuantidade((q) => Math.max(0, q - 1))}
          >
            <Text style={styles.botaoContadorTexto}>−</Text>
          </Pressable>

          <Text style={styles.quantidade}>{quantidade}</Text>

          <Pressable
            style={styles.botaoContador}
            onPress={() => setQuantidade((q) => Math.min(produto.estoque, q + 1))}
          >
            <Text style={styles.botaoContadorTexto}>+</Text>
          </Pressable>

          <Text style={styles.estoque}>
            {quantidade >= produto.estoque ? 'estoque esgotado' : `${produto.estoque} em estoque`}
          </Text>
        </View>
      </View>

      <Pressable style={styles.favorito} onPress={() => setFavorito(!favorito)}>
        <Text style={[styles.coracao, favorito && styles.coracaoAtivo]}>
          {favorito ? '♥' : '♡'}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  itemDestaque: {
    borderColor: '#1B3A5C',
    borderWidth: 2,
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
  selo: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1B3A5C',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  categoria: {
    fontSize: 12,
    color: '#6B7B8C',
    marginTop: 2,
  },
  preco: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 4,
  },
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoContador: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEF3F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoContadorTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  quantidade: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#1B3A5C',
  },
  estoque: {
    fontSize: 11,
    color: '#6B7B8C',
    marginLeft: 8,
  },
  favorito: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  coracao: {
    fontSize: 22,
    color: '#B0BAC4',
  },
  coracaoAtivo: {
    color: '#C62828',
  },
});

export default ProdutoItem;
