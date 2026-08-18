# Loja Compre Bem

App de exemplo da disciplina (React Native + Expo), usado como treino antes de aplicar
cada técnica no projeto do Instituto Mão Amiga.

## O que tem aqui

- Lista de produtos renderizada com **FlatList** (Aula 06/07 — substitui o `.map()` da Aula 03).
- Navegação **lista → detalhe** com `Stack.Navigator`, passando `produtoId` por `route.params`.
- `ProdutoItem` com prop somente-leitura (`produto`, `destaque`) e estado próprio
  (`favorito`, `quantidade`).

## Como rodar

```bash
npm install
npx expo start
```

Leia o QR Code com o **Expo Go** no celular.

## Estrutura

```
App.js                         Stack.Navigator com as duas telas
data/produtos.js               array mockado de produtos
components/ProdutoItem.js      item da lista (props + estado)
screens/TelaListaProdutos.js   lista com FlatList
screens/TelaDetalheProduto.js  lê route.params e repassa como prop
```
