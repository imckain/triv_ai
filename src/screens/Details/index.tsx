/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Animated, Platform, PlatformAndroidStatic, PlatformIOSStatic, PlatformMacOSStatic, PlatformWebStatic, PlatformWindowsOSStatic, Pressable, Text, View } from 'react-native';
import { StatsContainer } from '../../components/StatsContainer';
import { styles } from './styles';

interface Props {
  modalState: boolean,
  setModalState: React.Dispatch<React.SetStateAction<boolean>>,
  result: resultObj,
}

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

export const Details: React.FC<{ result: resultObj, modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>> }> = (props: Props) => {

  const modalFadeIn = new Animated.Value(0);
  const modalFadeOut = new Animated.Value(1);

  const modalIn = () => {
    Animated.timing(
      modalFadeIn,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }
    ).start();
  };

  const modalOut = () => {
    Animated.timing(
      modalFadeOut,
      {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }
    ).start();
  };

  const modalStart = () => {
    Animated.timing(
      modalFadeOut,
      {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }
    ).start();
  };

  const closeModalButton = (platform: PlatformIOSStatic | PlatformAndroidStatic | PlatformWindowsOSStatic | PlatformMacOSStatic | PlatformWebStatic) => {
    return platform.OS === 'web'
      ? <Pressable
        style={styles.closeButton}
        onPress={() => {
          return props.modalState === true ? props.setModalState(false) : props.setModalState(true);
        }}
      >
        <Text style={styles.closeButtonText}>✖︎</Text>
      </Pressable>
      : <></>;
  };

  useEffect(() => {
    modalIn();
    modalOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.modalState]);

  useEffect(() => {
    modalStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.result]);

  console.log(props.modalState);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Animated.View style={[styles.container, { opacity: props.modalState === true ? modalFadeIn : modalFadeOut, zIndex: props.modalState ? 1 : 0 }]}>
      {closeModalButton(Platform)}
      <Text style={styles.text}>Details Screen</Text>
      <StatsContainer />
      <View style={styles.lineBreak} />
    </Animated.View>
  );
};
