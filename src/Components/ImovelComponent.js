import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'

export default class ImovelComponent extends Component {

    render() {
        return (
            <ScrollView>
                <View style={estilo.areaLista}>
                    <Image style={estilo.img} source={{uri: this.props.imagem}}/>
                    <View>
                        <Text style={estilo.textoImovel}>{this.props.imovel}</Text>
                        <Text style={estilo.textoFinalidade}>{this.props.finalidade}</Text>
                        <Text style={estilo.textoPreco}>{this.props.preco}</Text>
                    </View>
                    <View style={estilo.areaBotao}>
                        <TouchableOpacity onPress={ () => {this.props.deletar(this.props.id) } } style={estilo.botaoExcluir}><Text style={estilo.textoExcluir}>x</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    };
};

const estilo = StyleSheet.create({

    areaLista: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: '100%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#50856f',
        margin: 5
    },

    textoExcluir: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'black',
    },

    botaoExcluir: {
        width: 30,
        height: 30,
        backgroundColor: '#00647c',
        alignItems: 'center',
        alignContent: "center",
        textAlign: 'center',
        borderRadius: 15,
        margin: 5,
        elevation: 5
    },

    textoImovel: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
    },

    textoFinalidade: {
        fontSize: 13,
        fontWeight: "normal",
        color: 'black',
    },

    textoPreco: {
        fontSize: 13,
        fontWeight: "normal",
        color: 'black',
    },

    img: {
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 5
    },

    areaBotao: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})