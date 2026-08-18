import { useState } from 'react';
import { View, Text, Image, Pressable, Button, StyleSheet } from 'react-native';

function ProdutoItem({ produto, onPress }) {
  const [favorito, setFavorito] = useState(false);

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Image source={produto.imagem} style={styles.imagem} />

      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{produto.preco}</Text>
      </View>

      <Button title={favorito ? '♥' : '♡'} onPress={() => setFavorito(!favorito)} />
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
});

export default ProdutoItem;
