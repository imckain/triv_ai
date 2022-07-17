/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from './styles';

interface Props {
  checkAnswer: (value: string) => 'green' | 'red';
  state: Answer,
  userInput: string,
  guesses: number,
}

type Answer = {
  id: number,
  userInput: string,
}[];

export const GameBoard: React.FC<{ state: Answer, userInput: string, guesses: number, checkAnswer: (value: string) => 'green' | 'red' }> = (props: Props) => {
  const fadeIn = new Animated.Value(0);
  const fadeOut = new Animated.Value(1);

  const colorChangeIn = () => {
    Animated.timing(
      fadeIn,
      {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }
    ).start();
  };

  const colorChangeOut = () => {
    setTimeout(() => {
      Animated.timing(
        fadeOut,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }
      ).start();
    }, 300);
  };

  const capitalize = (el: string) => {
    return el.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  };

  const showGameBoard = useCallback((state: Answer, userInput: string, guesses: number, checkAnswer): JSX.Element[] => {
    console.log(userInput);
    console.log(state);

    const toDisplay = state.map((obj, index) => {
      const emptyHeight = obj.userInput.length !== 0 ? 'auto' : 36;
      const addPadding = obj.id === 1 && obj.userInput.length === 0 ? 32 : 0;
      if (obj.userInput.length === 0 && index === guesses) {
        if (index === 0) {
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
        if (checkAnswer(obj.userInput) !== 'green' && obj.id <= guesses) {
          if (userInput.length === 0 && obj.id === guesses) {
            return (
              <View key={obj.id} style={styles.answerListView}>
                <Animated.Text style={[styles.answerList, { paddingTop: addPadding, height: emptyHeight, position: 'absolute', alignSelf: 'center', opacity: fadeOut }]} numberOfLines={1}>{capitalize(obj.userInput)}</Animated.Text>
                <Animated.Text style={[styles.answerList, { paddingTop: addPadding, height: emptyHeight, color: checkAnswer(obj.userInput), opacity: fadeIn }]} numberOfLines={1}>{capitalize(obj.userInput)}</Animated.Text>
              </View>
            );
          }
          return (
            <View key={obj.id} style={styles.answerListView}>
              <Animated.Text style={[styles.answerList, { paddingTop: addPadding, height: emptyHeight, color: checkAnswer(obj.userInput) }]} numberOfLines={1}>{capitalize(obj.userInput)}</Animated.Text>
            </View>
          );
        } else {
          return (
            <View key={obj.id} style={styles.answerListView}>
              <Animated.Text style={[styles.answerList, { paddingTop: addPadding, height: emptyHeight, position: 'absolute', alignSelf: 'center', opacity: fadeOut }]} numberOfLines={1}>{capitalize(obj.userInput)}</Animated.Text>
              <Animated.Text style={[styles.answerList, { paddingTop: addPadding, height: emptyHeight, color: checkAnswer(obj.userInput), opacity: fadeIn }]} numberOfLines={1}>{capitalize(obj.userInput)}</Animated.Text>
            </View>
          );
        }
      }
    });

    return toDisplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userInput]);

  useEffect(() => {
    colorChangeOut();
    setTimeout(() => colorChangeIn(), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userInput]);

  return (
    <View style={{ width: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
      {showGameBoard(props.state, props.userInput, props.guesses, props.checkAnswer)}
    </View>
  );
};
