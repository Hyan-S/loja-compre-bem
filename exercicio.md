# Exercício da Aula 16: Persistência de um Segundo Dado na Loja

## Observação sobre o ponto de partida

O enunciado parte dos favoritos "já construídos na Aula 15". Neste repositório eles ainda não estavam
persistidos: `ProdutoItem.js` guardava o estado num `useState(false)` local, sem AsyncStorage, e a chave
`@compre_bem:favoritos` não existia em lugar nenhum do projeto. Por isso a implementação abaixo faz as
duas coisas: reconstrói a persistência dos favoritos (a base da Aula 15) e acrescenta o segundo dado.

## Qual dado escolhi persistir, e por quê

Escolhi **o texto da última busca digitada**.

Faz sentido sobreviver ao fechamento porque a busca representa uma intenção em andamento, não uma ação
concluída. Quem digitou "mesa" estava comparando mesas; se o app fecha por uma ligação, pela bateria ou
porque o sistema descartou o processo em segundo plano, reabrir numa lista completa obriga a pessoa a
lembrar e redigitar o que já tinha decidido procurar. Restaurar o termo devolve a pessoa exatamente ao
ponto onde parou.

O favorito é o oposto: uma decisão explícita e duradoura. Os dois juntos mostram os dois motivos
diferentes para persistir — preservar uma **escolha** e preservar um **contexto de trabalho**.

Para que a busca restaurada não vire uma armadilha (abrir o app e ver a lista filtrada sem entender por
quê), o campo aparece sempre preenchido e visível, com um botão **Limpar** ao lado.

## Chaves usadas no AsyncStorage

| Dado | Chave | Formato |
|---|---|---|
| Favoritos (base da Aula 15) | `@compre_bem:favoritos` | JSON — array de ids, ex.: `["2"]` |
| Última busca (segundo dado) | `@compre_bem:ultimaBusca` | string pura, ex.: `mesa` |

A busca é gravada como string pura porque `AsyncStorage` já trabalha com strings; `JSON.stringify` num
texto só acrescentaria aspas. Os favoritos precisam de `JSON.stringify` por serem um array.

## Como confirmei que a persistência funcionou

Teste de fechar e reabrir de verdade, rodando o app em `http://localhost:8081`:

1. Com o app aberto, digitei `mesa` na busca e marquei o coração de "Mesa para Escritório Compacta".
   Estado gravado, lido direto do armazenamento:

   ```
   favoritos: ["2"]   ultimaBusca: "mesa"
   ```

2. **Encerrei o processo do navegador por completo** — não apenas a aba nem a tela. Confirmei que o
   processo tinha morrido e que a porta de depuração havia fechado antes de prosseguir.

3. Reabri o app do zero. Estado lido após a reabertura:

   ```
   favoritos: ["2"]   ultimaBusca: "mesa"
   campo de busca na tela: "mesa"
   coração da Mesa: ♥ (cheio)   coração da Luminária: ♡ (contorno)
   ```

Os dois dados voltaram exatamente como estavam. A lista reabriu já filtrada pelo termo restaurado,
mostrando "Mesa para Escritório Compacta" e "Luminária de Mesa LED".

Ressalva honesta: esse teste foi feito no alvo web, onde o AsyncStorage se apoia no `localStorage` do
navegador, e o "fechar de verdade" foi o encerramento do processo do navegador. No celular, o teste
equivalente é: abrir no Expo Go, mudar os dados, **remover o app da lista de apps recentes** (não só
voltar para a tela inicial) e abrir de novo.

### Detalhe de implementação que o teste obrigou a resolver

O primeiro efeito que salva não pode rodar antes do efeito que carrega. Sem cuidado, a sequência na
montagem é: estado inicial vazio → efeito de salvar dispara → grava `[]` e `""` por cima do que estava
salvo → só então a leitura termina, e já não há o que ler. O dado some no primeiro reabrir.

A trava é o estado `carregado`: os efeitos de gravação retornam cedo enquanto ele for `false`, e só
passam a gravar depois que a leitura inicial terminou (inclusive se ela falhar, pelo `finally`).

## O código

### `screens/TelaListaProdutos.js`

```jsx
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
```

### `components/ProdutoItem.js`

O componente deixou de guardar o favorito em estado próprio. Quem persiste é a tela da lista, então o
item passou a ser controlado: recebe `favorito` e avisa a mudança por `onAlternarFavorito`. Se cada item
guardasse o próprio estado, não haveria uma lista única para gravar.

O coração também mudou de aparência: era um `<Button>`, que no Android e na web desenha um retângulo
azul preenchido em volta. Virou um `Pressable` com texto, sem fundo (`backgroundColor: 'transparent'`),
usando dois glifos diferentes na mesma cor vermelha — `♡` (contorno) quando não marcado e `♥` (cheio)
quando marcado. O `hitSlop` amplia a área de toque, que ficaria pequena demais sem a moldura do botão.

```jsx
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
```

### Dependência acrescentada

```
npx expo install @react-native-async-storage/async-storage
```

Instalada na versão `2.2.0`, casada com o SDK 57 do Expo.
