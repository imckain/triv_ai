/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { TextInput, Platform, PlatformAndroidStatic, PlatformIOSStatic, PlatformMacOSStatic, PlatformWebStatic, PlatformWindowsOSStatic, Text, View, Image, StyleProp, ViewStyle } from 'react-native';
import { Container } from '../../components';
import { Header } from '../../components/Header';
import { Details } from '../Details';
import { styles } from './styles';
import * as Result from '../../hooks/temp.json';
import { useEffect } from 'react';

type Answer = {
  id: number,
  userInput: string,
}[];

export const Home: React.FC = () => {
  const [modalState, setModalState] = useState(false);
  const [result, setResult] = useState<typeof Result.result>();
  const [userInput, setUserInput] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [answer, setAnswer] = useState<Answer>([
    {
      'id': 1,
      'userInput': '',
    },
    {
      'id': 2,
      'userInput': '',
    },
    {
      'id': 3,
      'userInput': '',
    },
    {
      'id': 4,
      'userInput': '',
    },
    {
      'id': 5,
      'userInput': '',
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

  const capitalize = (el: string) => {
    return el.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  };

  const disableTextInput = useCallback((param: Answer, value: number) => {
    if (value === 5) {
      return false;
    }
    if (value <= 5) {
      console.log(`value: ${value}`);
      const mapCorrect = param.map(obj => {
        console.log(obj.userInput);
        return result?.correctResponse.find(el => el?.toLowerCase() === obj.userInput.toLowerCase()) ? true : false;
      });
      console.log(mapCorrect);
      return mapCorrect.includes(true) ? false : true;
    } else {
      return false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  const hydrateAnswers = useCallback((param: string, state: Answer) => {
    const replaceArray = state.map(obj => {
      if (obj.id === guesses) {
        return { id: guesses, userInput: param };
      }
      return obj;
    });
    return replaceArray;
  }, [guesses]);

  const showGameBoard = useCallback((state: Answer): JSX.Element[] => {
    console.log(userInput);
    console.log(state);
    // let injectLineChangeStyle;
    const toDisplay = state.map((obj, index) => {
      const emptyHeight = obj.userInput.length !== 0 ? 'auto' : 36;
      const addPadding = obj.id === 1 && obj.userInput.length === 0 ? 32 : 0;
      if (obj.userInput.length === 0 && index === guesses) {
        if (index === 0) {
          console.log(index);
          return (
            <View style={[styles.answerListView, { marginTop: 30, paddingTop: 0 }]}>
              <Text key={obj.id} style={[styles.answerList, { height: emptyHeight }]} numberOfLines={1}>{capitalize(userInput)}</Text>
            </View>
          );
        } else {
          return (
            <View style={styles.answerListView}>
              <Text key={obj.id} style={[styles.answerList, { paddingTop: addPadding, height: emptyHeight }]} numberOfLines={1}>{capitalize(userInput)}</Text>
            </View>
          );
        }
      } else {
        return (
          <View style={styles.answerListView}>
            <Text key={obj.id} style={[styles.answerList, { paddingTop: addPadding, height: emptyHeight, color: checkAnswer(obj.userInput) }]} numberOfLines={1}>{capitalize(obj.userInput)}</Text>
          </View>
        );
      }
    });

    return toDisplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  let count = guesses;

  const checkAnswer = (value: string) => {
    return result?.correctResponse.find(el => el?.toLowerCase() === value.toLowerCase()) ? 'green' : 'red';
  };

  useEffect(() => {
    setGuesses(count);
    console.log(count);
  }, [count]);

  useEffect(() => {
    setAnswer(hydrateAnswers(userInput, answer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  useEffect(() => {
    setUserInput('');
  }, [answer]);

  return (
    <Container>
      <View style={checkWebStyles(styles.containerMobile, styles.containerWeb, Platform)}>
        {showHeader(Platform)}
        <View style={checkWebStyles(styles.homePageMobile, styles.homePageWeb, Platform)}>
          <Text style={{ color: '#fff', fontSize: 42, letterSpacing: 16, fontWeight: '700' }}>{result != null ? result.type.toUpperCase() : null}</Text>
          {showModal(modalState)}
          <View style={styles.triviaContent}>
            <View style={styles.imageContainer}>
              <Image style={{ borderRadius: 10 }} source={{ width: 300, height: 300, uri: result?.urls[0] }} />
            </View>
            <View style={styles.answerContainer}>
              {showGameBoard(answer)}
            </View>
          </View>
          <View style={checkWebStyles(styles.inputViewMobile, styles.inputViewWeb, Platform)}>
            <TextInput
              keyboardAppearance="dark"
              clearButtonMode="always"
              editable={disableTextInput(answer, guesses)}
              selectTextOnFocus={disableTextInput(answer, guesses)}
              style={styles.input}
              value={userInput}
              onChangeText={input => setUserInput(input)}
              onSubmitEditing={() => {
                count++;
                setGuesses(count);
              }}
              clearTextOnFocus
              textAlign={'center'}
              placeholder="Answer"
              placeholderTextColor={'#909090'}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};
