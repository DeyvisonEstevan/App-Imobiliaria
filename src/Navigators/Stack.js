import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screens/Home';
import List from '../Screens/List';
import Registration from '../Screens/Registration';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Registration} />
        <Stack.Screen name="Lista" component={List} />
      </Stack.Navigator>
    );
  }
}
