/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { TextInput, Platform, PlatformAndroidStatic, PlatformIOSStatic, PlatformMacOSStatic, PlatformWebStatic, PlatformWindowsOSStatic, Text, View, Image, StyleProp, ViewStyle, FlatList, SafeAreaView } from 'react-native';
import { Container } from '../../components';
import { Header } from '../../components/Header';
import { Details } from '../Details';
import { styles } from './styles';
import * as Result from '../../hooks/temp.json';
import { useEffect } from 'react';

// type Answer = {
//   id: string,
//   input: string,
// };

export const Home: React.FC = () => {
  const [modalState, setModalState] = useState(false);
  const [result, setResult] = useState<typeof Result.result>();
  const [userInput, setUserInput] = useState('');
  const [answer, setAnswer] = useState([
    {
      id: '1',
      userInput: 'TEST',
    },
  ]);

  useEffect(() => {
    setResult(Result.result);
  }, [result]);

  const showModal = (state: boolean) => {
    return state === true
      ? <Details
        modalState={modalState}
        setModalState={setModalState}
      />
      : <></>;
  };

  const showHeader = (platform: PlatformIOSStatic | PlatformAndroidStatic | PlatformWindowsOSStatic | PlatformMacOSStatic | PlatformWebStatic) => {
    return platform.OS === 'web'
      ? <Header
        modalState={modalState}
        setModalState={setModalState}
      />
      : <></>;
  };

  const checkWebStyles = (mobileStyle: StyleProp<ViewStyle>, webStyle: StyleProp<ViewStyle>, platform: PlatformIOSStatic | PlatformAndroidStatic | PlatformWindowsOSStatic | PlatformMacOSStatic | PlatformWebStatic) => {
    return platform.OS === 'web'
      ? webStyle
      : mobileStyle;
  };

  const renderAnswer = (el: string, state: { userInput: string; }[]) => {
    if (state[0].userInput.includes('TEST')) {
      return <></>;
    }
    return (
      <View style={styles.answerView}>
        <Text style={styles.answerText} >{el != null ? el : 'NULL'}</Text>
      </View>
    );
  };

  const hydrateAnswers = useCallback((param: string, state: { id: string; userInput: string; }[]) => {
    if (state[0].userInput.includes('TEST')) {
      setAnswer([{ id: (state.length + 1).toString(), userInput: param }]);
    }
    setAnswer([...state, { id: (state.length + 1).toString(), userInput: param }]);
  }, []);

  const tempShow = (el: { id: string; userInput: string; }[]) => {
    el.map((a, i) => {
      console.log(a.userInput);
      return (
        <Text key={i + 1} style={{ color: '#fff' }}>{a.userInput}</Text>
      );
    });
  };

  // useEffect(() => {
  //   hydrateAnswers(userInput, answer);
  // }, []);

  return (
    <Container>
      <View style={checkWebStyles(styles.containerMobile, styles.containerWeb, Platform)}>
        {showHeader(Platform)}
        <View style={checkWebStyles(styles.homePageMobile, styles.homePageWeb, Platform)}>
          <Text style={{ color: '#fff', fontSize: 42, letterSpacing: 16, fontWeight: '700' }}>{result != null ? result.type.toUpperCase() : null}</Text>
          {showModal(modalState)}
          <View style={styles.triviaContent}>
            <View style={styles.imageContainer}>
              <Image style={{ borderRadius: 10, paddingVertical: 20 }} source={{ width: 300, height: 300, uri: result?.urls[0] }} />
            </View>
            <SafeAreaView style={styles.answerContainer}>
              <FlatList
                ListFooterComponent={
                  <View style={styles.inputView}>
                    <TextInput returnKeyType="done" keyboardAppearance="dark" clearButtonMode="always" style={styles.input} value={userInput} onChangeText={input => setUserInput(input)} onEndEditing={() => { hydrateAnswers(userInput, answer); }} textAlign={'center'} placeholder="Answer" placeholderTextColor={'#909090'} />
                  </View>
                }
                contentContainerStyle={styles.gameplayContainer}
                data={answer}
                extraData={answer}
                renderItem={({ item }) => renderAnswer(item.userInput, answer)}
                keyExtractor={(item, _index) => item.id}
              />
              <Text style={{ color: '#fff' }}>{userInput}</Text>
              {tempShow(answer)}
            </SafeAreaView>
          </View>
        </View>
      </View>
    </Container>
  );
};
