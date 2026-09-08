import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';

const categorias = ['Móveis', 'Iluminação', 'Acessórios'];

function validarNome(valor) {
  if (valor.trim() === '') {
    return 'Informe o nome do produto.';
  }
  if (valor.trim().length < 3) {
    return 'O nome precisa ter ao menos 3 caracteres.';
  }
  return '';
}

function validarPreco(valor) {
  if (valor.trim() === '') {
    return 'Informe o preço.';
  }
  if (/[^0-9.,]/.test(valor.trim())) {
    return 'O preço aceita apenas números, ex: 349,90.';
  }
  if (Number(valor.trim().replace(',', '.')) === 0) {
    return 'O preço precisa ser maior que zero.';
  }
  return '';
}

function validarCategoria(valor) {
  if (valor === '') {
    return 'Escolha a categoria do produto.';
  }
  return '';
}

function TelaCadastroProduto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [erros, setErros] = useState({ nome: '', preco: '', categoria: '' });
  const [confirmacao, setConfirmacao] = useState('');

  function aoDigitarNome(valor) {
    setNome(valor);
    setConfirmacao('');
    setErros({ ...erros, nome: '' });
  }

  function aoDigitarPreco(valor) {
    setPreco(valor);
    setConfirmacao('');
    setErros({ ...erros, preco: validarPreco(valor) });
  }

  function aoEscolherCategoria(valor) {
    setCategoria(valor);
    setConfirmacao('');
    setErros({ ...erros, categoria: '' });
  }

  function aoCadastrar() {
    const novosErros = {
      nome: validarNome(nome),
      preco: validarPreco(preco),
      categoria: validarCategoria(categoria),
    };

    setErros(novosErros);

    const temErro =
      novosErros.nome !== '' || novosErros.preco !== '' || novosErros.categoria !== '';

    if (temErro) {
      setConfirmacao('');
      return;
    }

    setConfirmacao(`Produto validado: ${nome.trim()} - R$ ${preco.trim()} (${categoria}).`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastrar produto</Text>
      <Text style={styles.subtitulo}>
        Formulário de exemplo da aula: layout dos campos e validação antes do envio.
      </Text>

      <Text style={styles.rotulo}>Nome do produto</Text>
      <TextInput
        style={[styles.campo, erros.nome !== '' && styles.campoComErro]}
        value={nome}
        onChangeText={aoDigitarNome}
        placeholder="Cadeira, mesa, luminária..."
        placeholderTextColor="#9AA7B4"
      />
      {erros.nome !== '' && <Text style={styles.erro}>{erros.nome}</Text>}

      <Text style={styles.rotulo}>Preço</Text>
      <TextInput
        style={[styles.campo, erros.preco !== '' && styles.campoComErro]}
        value={preco}
        onChangeText={aoDigitarPreco}
        placeholder="Somente números, ex: 349,90"
        placeholderTextColor="#9AA7B4"
        keyboardType="numeric"
      />
      {erros.preco !== '' && <Text style={styles.erro}>{erros.preco}</Text>}

      <Text style={styles.rotulo}>Categoria</Text>
      <View style={styles.opcoes}>
        {categorias.map((item) => (
          <Pressable
            key={item}
            style={[styles.opcao, categoria === item && styles.opcaoEscolhida]}
            onPress={() => aoEscolherCategoria(item)}
          >
            <Text style={[styles.opcaoTexto, categoria === item && styles.opcaoTextoEscolhido]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {erros.categoria !== '' && <Text style={styles.erro}>{erros.categoria}</Text>}

      <Pressable style={styles.botao} onPress={aoCadastrar}>
        <Text style={styles.botaoTexto}>Cadastrar produto</Text>
      </Pressable>

      {confirmacao !== '' && <Text style={styles.confirmacao}>{confirmacao}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B3A5C',
  },
  subtitulo: {
    fontSize: 14,
    color: '#6B7B8C',
    marginTop: 6,
    lineHeight: 20,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1B3A5C',
    marginTop: 20,
    marginBottom: 6,
  },
  campo: {
    borderWidth: 1,
    borderColor: '#C6D0DA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#33475B',
    backgroundColor: '#FFFFFF',
  },
  campoComErro: {
    borderColor: '#C62828',
  },
  erro: {
    fontSize: 13,
    color: '#C62828',
    marginTop: 6,
  },
  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  opcao: {
    borderWidth: 1,
    borderColor: '#C6D0DA',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  opcaoEscolhida: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  opcaoTexto: {
    fontSize: 13,
    color: '#33475B',
  },
  opcaoTextoEscolhido: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#1B3A5C',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  confirmacao: {
    fontSize: 14,
    color: '#2E7D32',
    marginTop: 16,
    lineHeight: 20,
  },
});

export default TelaCadastroProduto;
