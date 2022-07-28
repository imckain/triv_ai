/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
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
  Animated,
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
  type: string[];
  artist: string;
  album: string;
  genre: string;
  song: string;
  keywords: string[];
  correctResponse: string[];
  urls: string[];
}

const initialResultObj = {
  'id': 0,
  'type': [''],
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

  const textInputRef = React.createRef<TextInput>();
  let count = guesses;

  const modalFadeIn = new Animated.Value(1);
  const modalFadeOut = new Animated.Value(0.7);

  const modalIn = () => {
    Animated.timing(
      modalFadeIn,
      {
        toValue: 0.7,
        duration: 400,
        useNativeDriver: false,
      }
    ).start();
  };

  const modalOut = () => {
    Animated.timing(
      modalFadeOut,
      {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }
    ).start();
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

  const getTypeText = (obj: resultObj) => {
    if (result !== null) {
      return obj.type.map((el, idx) => {
        return <Text key={idx} style={styles.typeText}>{el.toUpperCase()}{idx + 1 !== result.type.length && result.type.length > 1 ? ' | ' : null}</Text>;
      });
    } else {
      return <></>;
    }
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
    setModalState(false);
    setUserInput('');
  }, [result]);

  useEffect(() => {
    if (guesses > 0 && checkAnswer(answer[guesses - 1].userInput) === true) {
      setTimeout(() => {
        setModalState(true);
      }, 2800);
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  useEffect(() => {
    textInputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses]);

  useEffect(() => {
    modalIn();
    modalOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState, result]);

  return (
    <Container>
      {/* {showModal(modalState)} */}
      <Details result={result} modalState={modalState} setModalState={setModalState} />
      <TouchableWithoutFeedback onPress={() => {
        setModalState(false);
        textInputRef.current?.focus();
      }}>
        <Animated.View style={[checkWebStyles(styles.containerMobile, styles.containerWeb, Platform), { opacity: modalState === true ? modalFadeIn : modalFadeOut }]}>
          {showHeader(Platform)}
          <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} contentContainerStyle={checkWebStyles(styles.homePageMobile, styles.homePageWeb, Platform)}>
            <View style={styles.typeContainer}>
              {getTypeText(result)}
            </View>
            <TextInput
              editable={disableTextInput(answer, guesses)}
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
              clearTextOnFocus={false}
              autoFocus={false}
              ref={textInputRef}
              maxLength={21}
            />
            <View style={styles.triviaContent}>
              <View style={styles.aiHintContainer}>
                <ImageCarousel textInputRef={textInputRef} result={result} guesses={guesses} checkAnswer={checkAnswer} />
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
          </ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Container>
  );
};
