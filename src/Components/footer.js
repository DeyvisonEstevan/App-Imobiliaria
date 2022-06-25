import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default class Footer extends Component {
  render() {
    return(
      <View style={style.containerFooter}>
      <Image
        style={style.imgFooter}
        source={require('../Img/imovel-footer-mob.png')}
      />
    </View>
    )
  }
}

const style = StyleSheet.create({
  containerFooter: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imgFooter: {
    resizeMode: 'stretch',
    width: 360,
    height: 90,
  },
});
