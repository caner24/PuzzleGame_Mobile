import React from 'react';
import {FlatList, View, Text, Button} from 'react-native';
import {API_URL} from '@env';
import axios from 'axios';

export default function ScoreBoard() {
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState();
  axios
    .get(`${API_URL}/user`)
    .then(item => setData(item.data))
    .catch(err => setError(err));
  function getItems({item}) {
    return (
      <View
        style={{
          padding: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            width: '25%',
            textAlign: 'center',
            padding: 3,
            fontWeight: 'bold',
          }}>
          {item.username}
        </Text>
        <Text
          style={{
            width: '25%',
            textAlign: 'center',
            padding: 3,
            fontWeight: 'bold',
          }}>
          {item.userscore}
        </Text>
        <Text
          style={{
            width: '25%',
            textAlign: 'center',
            padding: 3,
            fontWeight: 'bold',
          }}>
          {item.movesmade}
        </Text>
      </View>
    );
  }

  function seperateItem() {
    return <View style={{padding: 3, backgroundColor: 'white'}}></View>;
  }
  return (
    <View style={{backgroundColor: 'coral', padding: 15}}>
      <View
        style={{
          backgroundColor: 'blue',
          padding: 15,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            width: '25%',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}>
          AD
        </Text>
        <Text
          style={{
            textAlign: 'center',
            width: '25%',
            fontWeight: 'bold',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}>
          SCORE
        </Text>
        <Text
          style={{
            textAlign: 'center',
            width: '25%',
            fontWeight: 'bold',
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,
          }}>
          MOVES
        </Text>
      </View>
      <FlatList
        style={{
          padding: 10,
        }}
        keyExtractor={item => item.id}
        data={data}
        renderItem={getItems}
        ItemSeparatorComponent={seperateItem}
      />
    </View>
  );
}
