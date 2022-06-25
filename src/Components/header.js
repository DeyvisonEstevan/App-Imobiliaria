import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default class Header extends Component {
  render() {
    return (
      <View style={style.containerHeader}>
      <Image
        style={style.imgHeader}
        source={require('../Img/imovel-header-mob.png')}
      />
    </View>
    )
  }
}

const style = StyleSheet.create({
  containerHeader: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imgHeader: {
    resizeMode: 'stretch',
    width: 360,
    height: 90,
  },
});
