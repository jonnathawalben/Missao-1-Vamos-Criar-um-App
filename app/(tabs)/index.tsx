import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fornecedores, setFornecedores] = useState([]);
  const [imagem, setImagem] = useState(null);

  // Função para abrir o seletor de imagens
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  // Função para cadastrar fornecedor
  const adicionarFornecedor = () => {
    if (nome && endereco && contato && categoria) {
      setFornecedores([
        ...fornecedores,
        { nome, endereco, contato, categoria, imagem },
      ]);
      setNome('');
      setEndereco('');
      setContato('');
      setCategoria('');
      setImagem(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Cadastro de Fornecedores</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do fornecedor"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#aaa"
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          style={styles.input}
          placeholder="Contato"
          placeholderTextColor="#aaa"
          value={contato}
          onChangeText={setContato}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoria"
          placeholderTextColor="#aaa"
          value={categoria}
          onChangeText={setCategoria}
        />

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Escolher imagem</Text>
        </TouchableOpacity>

        {imagem && (
          <Image source={{ uri: imagem }} style={styles.imagePreview} />
        )}

        <TouchableOpacity style={styles.addButton} onPress={adicionarFornecedor}>
          <Text style={styles.addButtonText}>Cadastrar Fornecedor</Text>
        </TouchableOpacity>

        <Text style={styles.listTitle}>Lista de Fornecedores</Text>

        <FlatList
          data={fornecedores}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.fornecedorItem}>
              <Text style={styles.itemText}>Nome: {item.nome}</Text>
              <Text style={styles.itemText}>Endereço: {item.endereco}</Text>
              <Text style={styles.itemText}>Contato: {item.contato}</Text>
              <Text style={styles.itemText}>Categoria: {item.categoria}</Text>
              {item.imagem && (
                <Image source={{ uri: item.imagem }} style={styles.itemImage} />
              )}
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2c2c2c',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#3a3a3a',
    color: '#fff',
  },
  imageButton: {
    backgroundColor: '#1c5f90',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginVertical: 15,
    alignSelf: 'center',
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  fornecedorItem: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default App;

