import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/Navigators/Stack';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    );
  }
}


