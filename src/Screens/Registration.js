import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Header from '../Components/header';
import Footer from '../Components/footer';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import ImovelDatabase from '../Database/ImovelDatabase';
import Imovel from '../Models/imovel';
import {ScrollView} from 'react-native-gesture-handler';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imovel: ' ',
      finalidade: ' ',
      preco: ' ',
      imagem: ' ',
      lista: [],
    };
  }

  Cadastrar = (imovel, finalidade, preco, imagem) => {
    const imovelNovo = new Imovel(imovel, finalidade, preco, imagem);
    const banco = new ImovelDatabase();
    banco.Adicionar(imovelNovo);
  };

  // FinalidadeAluguel = (finalidade) => {
  //   const banco = new ImovelDatabase();
  //   banco.Aluguel(finalidade);
  // };

  // FinalidadeVenda = (finalidade) => {
  //   const banco = new ImovelDatabase();
  //   banco.Venda(finalidade);
  // };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(`Imagem salva no cache: "${data.uri}"`);
      this.setState({imagem: data.uri});
      
      CameraRoll.save(data.uri);
      console.log('Imagem salva com sucesso utilizando o cameraroll');
      this.setState({imagem: data.uri});
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={style.body}>
          <Header />
          <View style={style.titulo}>
            <Text style={style.textTitulo}>CADASTRE SEU IMÓVEL</Text>
          </View>
          <View>
            <Text style={style.textoInput}>IMÓVEL</Text>
            <TextInput
              onChangeText={valorDigitado => {
                this.setState({imovel: valorDigitado});
              }}
              style={style.inputs}
              placeholder="Informe o imóvel"
              keyboardType="default"></TextInput>
            <Text style={style.textoInput}>FINALIDADE</Text>
            <TextInput
              onChangeText={valorDigitado => {
                this.setState({finalidade: valorDigitado});
              }}
              style={style.inputs}
              placeholder="Informe a finalidade"
              keyboardType="default"></TextInput>
            <Text style={style.textoInput}>PREÇO</Text>
            <TextInput
              onChangeText={valorDigitado => {
                this.setState({preco: valorDigitado});
              }}
              style={style.inputs}
              placeholder="Informe o preço"
              keyboardType="default"></TextInput>
          </View>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={style.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log(barcodes);
            }}
          />
          <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style={style.capture}>
              <Text style={style.textoBotao}> CLIQUE AQUI </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.botaoCad}>
            <Text
              onPress={() =>
                this.Cadastrar(
                  this.state.imovel,
                  this.state.finalidade,
                  this.state.preco,
                  this.state.imagem,
                )
              }
              style={style.textoBotao}>
              CADASTRAR
            </Text>
          </TouchableOpacity>
          <Footer />
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    height: 700,
    justifyContent: 'center',
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
    backgroundColor: '#00647c',
    width: 300,
    height: 35,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  botaoCad: {
    elevation: 8,
    borderRadius: 5,
    backgroundColor: '#ff6b4a',
    width: 300,
    height: 35,
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
  textoInput: {
    fontSize: 12,
    color: '#50856f',
  },
  inputs: {
    width: 300,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#50856f',
    marginBottom: 2,
    fontSize: 12,
  },
  inputPicker: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerItem: {
    width: 140,
    height: 35,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#50856f',
    marginBottom: 2,
  },
  preview: {
    margin: 10,
    flex: 1,
    width: 100,
    height: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    elevation: 8,
    borderRadius: 5,
    backgroundColor: '#00647c',
    width: 300,
    height: 35,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
