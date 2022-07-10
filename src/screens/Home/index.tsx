/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Platform, PlatformAndroidStatic, PlatformIOSStatic, PlatformMacOSStatic, PlatformWebStatic, PlatformWindowsOSStatic, Text, View } from 'react-native';
import { Container } from '../../components';
import { Header } from '../../components/Header';
import { Details } from '../Details';
import { styles } from './styles';

export const Home: React.FC = () => {
  const [modalState, setModalState] = useState(false);

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

  return (
    <Container>
      <View style={styles.container}>
        {showHeader(Platform)}
        <View style={styles.homePage}>
          {showModal(modalState)}
          <Text>Home Screen</Text>
        </View>
      </View>
    </Container>
  );
};
