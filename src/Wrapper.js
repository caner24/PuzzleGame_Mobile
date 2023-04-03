import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import PlayGame from './Pages/PlayGame/PlayGame';
import ScoreBoard from './Pages/ScoreBoard/ScoreBoard';

const Tab = createMaterialBottomTabNavigator();
export default function Wrapper() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{headerTitleAlign: 'center'}}
          name="Puzzle Game"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{backgroundColor: '#694fad'}}
          component={PlayGame}
        />
        <Tab.Screen
          options={{headerTitleAlign: 'center'}}
          name="Score Board "
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{backgroundColor: '#694fad'}}
          component={ScoreBoard}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
