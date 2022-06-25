import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import ImovelDatabase from '../Database/ImovelDatabase';
import ImovelComponent from '../Components/ImovelComponent';
import Header from '../Components/header';
import Footer from '../Components/footer';

export default class List extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
    };
    this.Listar();
  }
  Listar = () => {
    const banco = new ImovelDatabase();
    banco.Listar().then(listaCompleta => {
      this.setState({lista: listaCompleta});
    });
  };

  DeletarImovel = id => {
    const banco = new ImovelDatabase();
    banco.Deletar(id);
    this.Listar();
  };

  render() {

    return (
      <ScrollView>
        <Header style={{flex: 1}}/>
        <View style={style.body}>
          <View style={style.titulo}>
            <Text style={style.textTitulo}>MEUS IMÓVEIS!</Text>
            {
              this.state.lista.map(
                imovel => (
                  <ImovelComponent
                    key={imovel.id}
                    id={imovel.id}
                    imovel={imovel.imovel}
                    finalidade={imovel.finalidade}
                    preco={imovel.preco}
                    imagem={imovel.imagem}
                    deletar={this.DeletarImovel}
                  />
                )
              )
            }
          </View>
        </View>
        <Footer style={{flex: 1}}/>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: '#b3b3b3',
    width: 150,
    height: 30,
    margin: 5,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
