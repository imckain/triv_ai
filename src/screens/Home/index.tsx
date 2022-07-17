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
  Image,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container } from '../../components';
import { Header } from '../../components/Header';
import { Details } from '../Details';
import { styles } from './styles';
import * as Result from '../../hooks/temp.json';
import { useEffect } from 'react';
import { GameBoard } from '../../components/GameBoard';

type Answer = {
  id: number,
  userInput: string,
}[];

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
  const [result, setResult] = useState<typeof Result.result>();
  const [userInput, setUserInput] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [answer, setAnswer] = useState<Answer>(intialState);

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
    return result?.correctResponse.find(el => el?.toLowerCase() === value.toLowerCase()) ? 'green' : 'red';
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
          <View style={checkWebStyles(styles.homePageMobile, styles.homePageWeb, Platform)}>
            <Text style={{ color: '#fff', fontSize: 42, letterSpacing: 16, fontWeight: '700' }}>{result != null ? result.type.toUpperCase() : null}</Text>
            {showModal(modalState)}
            <View style={styles.triviaContent}>
              <View style={styles.imageContainer}>
                <Image style={{ borderRadius: 10 }} source={{ width: 300, height: 300, uri: result?.urls[0] }} />
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
                style={[styles.input, { height: 0, width: 0 }]}
                value={userInput}
                onChangeText={input => setUserInput(input)}
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
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};
