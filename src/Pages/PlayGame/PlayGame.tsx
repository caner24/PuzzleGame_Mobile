import React from 'react';
import {Text, Alert, SafeAreaView, View, Image} from 'react-native';
import {PicturePuzzle, PuzzlePieces} from 'react-native-picture-puzzle';
import {ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {API_URL} from '@env';
import axios from 'axios';
import Input from '../../components/TextInput/Input';
import RoundedButton from '../../components/RoundedButton/RoundedButton';

export default function App() {
  var sayac = 0;
  var hamle = 0;
  const [movesMade, setMoves] = React.useState(0);
  const [usernames, setUser] = React.useState('');
  const [isOk, setIsOk] = React.useState(false);
  const [hidden, setHidden] = React.useState<number | null>(0); // piece to obscure
  const [pieces, setPieces] = React.useState<PuzzlePieces>([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [startPieces, setStartPieces] = React.useState<PuzzlePieces>([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [source, setSource] = React.useState(
    React.useMemo(
      () => ({
        uri: '',
      }),
      [],
    ),
  );
  const fetchData = async () => {
    try {
      await axios
        .get(`${API_URL}/puzzle`)
        .then(item => item.data)
        .then(gelenData => {
          setSource({
            uri: `data:image/png;base64,${gelenData[sayac].puzzlepicture}`,
          });
          return;
        });
    } catch (error) {}
  };

  const renderLoading = React.useCallback(
    (): JSX.Element => <ActivityIndicator />,
    [],
  );

  const onChange = React.useCallback(
    (nextPieces: PuzzlePieces, nextHidden: number | null): void => {
      setPieces([...nextPieces]);
      hamle++;
      if (arrayEquals(startPieces, nextPieces)) {
        Alert.alert('Tebrikler kazandiniz');

        const scoress = {
          username: `${usernames}`,
          userscore: movesMade,
          movesmade: movesMade,
        };
        axios.post(`${API_URL}/User`, scoress);
        sayac++;
        fetchData();
      }
      setHidden(nextHidden);
      setMoves(hamle);
    },
    [setPieces, setHidden],
  );
  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
  const setData = gelenData => {
    setUser(gelenData.userName);
    fetchData();
    setIsOk(true);
  };
  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required('Username is required'),
  });
  return (
    <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{marginTop: '10%'}}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{userName: ''}}
          onSubmit={gelenData => setData(gelenData)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {errors.userName && touched.userName && (
                <Text>{errors.userName}</Text>
              )}
              <Input
                placeholder="Username :"
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                value={values.userName}
              />
              <RoundedButton onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>

      {isOk && (
        <>
          <View style={{marginTop: '10%'}}>
            <PicturePuzzle
              size={300}
              pieces={pieces}
              hidden={hidden}
              onChange={onChange}
              source={source}
              renderLoading={renderLoading}
            />
          </View>
          <View style={{marginTop: '10%'}}>
            <Text>Moves Made</Text>
            <Text>{movesMade}</Text>
            <Text>Score</Text>
            <Text>{movesMade}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
