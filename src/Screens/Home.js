import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../Components/header';
import Footer from '../Components/footer';

export default function Home({navigation}) {
  return (
    <ScrollView>
      <Header/>
      <View style={style.body}>
        <View style={style.titulo}>
          <Text style={style.textTitulo}>BEM VINDO!</Text>
        </View>
        <TouchableOpacity
          style={style.botao}
          onPress={() => navigation.navigate('Cadastro')}>
          <Text style={style.textoBotao}>CADASTRO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.botao}
          title="Lista"
          onPress={() => navigation.navigate('Lista')}>
          <Text style={style.textoBotao}>LISTA</Text>
        </TouchableOpacity>
      </View>
      <Footer/>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 340
  },
  titulo: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  textTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00647c',
  },
  botao: {
    elevation: 8,
    borderRadius: 5,
    backgroundColor: '#00647c',
    width: 300,
    height: 40,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
