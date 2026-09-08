# Loja Compre Bem

App de exemplo da disciplina (React Native + Expo).

- Lista de produtos com **FlatList** (Aula 06/07, no lugar do `.map()`).
- Navegação lista → detalhe com `Stack.Navigator`, passando `produtoId` por `route.params`.
- Formulário de cadastro de produto (Aula 11): nome, preço e categoria, com validação
  dos campos antes do envio. Abre pelo botão "Novo" no cabeçalho da lista.

O formulário de exemplo valida e mostra o resultado na tela, sem gravar o produto.

## Como rodar

```bash
npm install
npx expo start
```

Leia o QR Code com o Expo Go.
