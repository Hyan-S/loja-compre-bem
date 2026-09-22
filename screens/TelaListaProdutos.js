import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { produtosMock } from '../data/produtos';
import ProdutoItem from '../components/ProdutoItem';

const CHAVE_FAVORITOS = '@compre_bem:favoritos';
const CHAVE_BUSCA = '@compre_bem:ultimaBusca';

function TelaListaProdutos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const [favoritosSalvos, buscaSalva] = await Promise.all([
          AsyncStorage.getItem(CHAVE_FAVORITOS),
          AsyncStorage.getItem(CHAVE_BUSCA),
        ]);

        if (favoritosSalvos !== null) {
          setFavoritos(JSON.parse(favoritosSalvos));
        }
        if (buscaSalva !== null) {
          setBusca(buscaSalva);
        }
      } catch (erro) {
        console.warn('Nao foi possivel ler os dados salvos:', erro);
      } finally {
        setCarregado(true);
      }
    }

    carregar();
  }, []);

  useEffect(() => {
    if (!carregado) {
      return;
    }
    AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos)).catch((erro) =>
      console.warn('Nao foi possivel salvar os favoritos:', erro)
    );
  }, [favoritos, carregado]);

  useEffect(() => {
    if (!carregado) {
      return;
    }
    AsyncStorage.setItem(CHAVE_BUSCA, busca).catch((erro) =>
      console.warn('Nao foi possivel salvar a busca:', erro)
    );
  }, [busca, carregado]);

  function alternarFavorito(id) {
    setFavoritos((atuais) =>
      atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id]
    );
  }

  const termo = busca.trim().toLowerCase();
  const produtosFiltrados =
    termo === ''
      ? produtosMock
      : produtosMock.filter((produto) => produto.nome.toLowerCase().includes(termo));

  return (
    <View style={styles.container}>
      <View style={styles.barraBusca}>
        <TextInput
          style={styles.campoBusca}
          value={busca}
          onChangeText={setBusca}
          placeholder="Buscar produto..."
          placeholderTextColor="#9AA7B4"
          autoCorrect={false}
        />
        {busca !== '' && (
          <Pressable style={styles.limpar} onPress={() => setBusca('')} hitSlop={8}>
            <Text style={styles.limparTexto}>Limpar</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(produto) => produto.id}
        renderItem={({ item }) => (
          <ProdutoItem
            produto={item}
            favorito={favoritos.includes(item.id)}
            onAlternarFavorito={() => alternarFavorito(item.id)}
            onPress={() => navigation.navigate('DetalheProduto', { produtoId: item.id })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum produto encontrado para "{busca.trim()}".</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  barraBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  campoBusca: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#C6D0DA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#33475B',
  },
  limpar: {
    marginLeft: 10,
  },
  limparTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B3A5C',
  },
  lista: {
    padding: 16,
  },
  separador: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  vazio: {
    fontSize: 15,
    color: '#6B7B8C',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default TelaListaProdutos;
