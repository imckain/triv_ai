/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef, useState } from 'react';
import {
  TextInput,
  Platform,
  PlatformAndroidStatic,
  PlatformIOSStatic,
  PlatformMacOSStatic,
  PlatformWebStatic,
  PlatformWindowsOSStatic,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Container } from '../../components';
import { Header } from '../../components/Header';
import { Details } from '../Details';
import { styles } from './styles';
import * as Result from '../../hooks/temp.json';
import { useEffect } from 'react';
import { GameBoard } from '../../components/GameBoard';
import { ImageCarousel } from '../../components/ImageCarousel';

type Answer = {
  id: number,
  userInput: string,
}[];

type resultObj = {
  id: number;
  type: string;
  artist: string;
  album: string;
  genre: string;
  song: string;
  keywords: string[];
  correctResponse: (string | null)[];
  urls: string[];
}

const initialResultObj = {
  'id': 0,
  'type': '',
  'artist': '',
  'album': '',
  'genre': '',
  'song': '',
  'keywords': [''],
  'correctResponse': [''],
  'urls': [''],
};

const intialState = [
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
];

export const Home: React.FC = () => {
  const [modalState, setModalState] = useState(false);
  const [result, setResult] = useState<resultObj>(initialResultObj);
  const [userInput, setUserInput] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [answer, setAnswer] = useState<Answer>(intialState);

  console.log(result);

  const textInputRef = useRef<TextInput>(null);
  let count = guesses;

  const showModal = (state: boolean) => {
    return state === true ? <Details modalState={modalState} setModalState={setModalState} /> : <></>;
  };

  const showHeader = (platform: PlatformIOSStatic | PlatformAndroidStatic | PlatformWindowsOSStatic | PlatformMacOSStatic | PlatformWebStatic) => {
    return platform.OS === 'web' ? <Header modalState={modalState} setModalState={setModalState} /> : <></>;
  };

  const checkWebStyles = (mobileStyle: StyleProp<ViewStyle>, webStyle: StyleProp<ViewStyle>, platform: PlatformIOSStatic | PlatformAndroidStatic | PlatformWindowsOSStatic | PlatformMacOSStatic | PlatformWebStatic) => {
    return platform.OS === 'web' ? webStyle : mobileStyle;
  };

  const checkAnswer = (value: string) => {
    return result?.correctResponse.find(el => el?.toLowerCase() === value.toLowerCase()) ? true : false;
  };

  const disableTextInput = useCallback((param: Answer, value: number) => {
    if (value === 5) {
      return false;
    }
    if (value <= 5) {
      const mapCorrect = param.map(obj => {
        console.log(obj.userInput);
        return result?.correctResponse.find(el => el?.toLowerCase() === obj.userInput.toLowerCase()) ? true : false;
      });
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

  useEffect(() => {
    setResult(Result.result);
  }, [result]);

  useEffect(() => {
    setGuesses(count);
  }, [count]);

  useEffect(() => {
    setAnswer(hydrateAnswers(userInput, answer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  useEffect(() => {
    setUserInput('');
  }, [answer]);

  useEffect(() => {
    setAnswer(intialState);
  }, [result]);

  useEffect(() => {
    textInputRef.current?.focus();
  }, [guesses]);

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => textInputRef.current?.focus()}>
        <View style={checkWebStyles(styles.containerMobile, styles.containerWeb, Platform)}>
          {showHeader(Platform)}
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} contentContainerStyle={checkWebStyles(styles.homePageMobile, styles.homePageWeb, Platform)}>
            <Text style={{ color: '#fff', fontSize: 42, letterSpacing: 16, fontWeight: '700' }}>{result != null ? result.type.toUpperCase() : null}</Text>
            {showModal(modalState)}
            <View style={styles.triviaContent}>
              <View style={styles.aiHintContainer}>
                <ImageCarousel ref={textInputRef} result={result} guesses={guesses} checkAnswer={checkAnswer} />
                <View style={styles.hintInfo}>
                  <Text style={styles.infoText}><Text style={[styles.infoText, { fontWeight: '700', fontSize: 28 }]}>{(5 - guesses).toString()}</Text> Guesses Left!</Text>
                  <Text style={[styles.infoText, { fontSize: 12, paddingTop: 8 }]}>Type anywhere to get started</Text>
                </View>
              </View>
              <GameBoard
                state={answer}
                userInput={userInput}
                guesses={guesses}
                checkAnswer={checkAnswer}
              />
            </View>
            <View style={checkWebStyles(styles.inputViewMobile, styles.inputViewWeb, Platform)}>
              <TextInput
                keyboardAppearance="dark"
                clearButtonMode="always"
                editable={disableTextInput(answer, guesses)}
                selectTextOnFocus={disableTextInput(answer, guesses)}
                style={styles.input}
                value={userInput.replace(/[`~0-9@#%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}
                onChangeText={input => setUserInput(input.replace(/[`~0-9@#%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))}
                onSubmitEditing={() => {
                  if (userInput.length !== 0) {
                    count++;
                    setGuesses(count);
                  } else {
                    return;
                  }
                }}
                clearTextOnFocus
                textAlign={'center'}
                placeholder="Answer"
                placeholderTextColor={'#909090'}
                autoFocus={false}
                ref={textInputRef}
                maxLength={21}
              />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};
