/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react';
import { Button, Platform, PlatformAndroidStatic, PlatformIOSStatic, PlatformMacOSStatic, PlatformWebStatic, PlatformWindowsOSStatic, Text, View } from 'react-native';
import { styles } from './styles';

interface Props {
  modalState: boolean,
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export const Details: React.FC<{ modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>> }> = (props: Props) => {

  const showModal = useCallback((param: boolean | undefined) => {
    return param === true
      ? 'visible'
      : 'hidden';
  }, []);

  const closeModalButton = (platform: PlatformIOSStatic | PlatformAndroidStatic | PlatformWindowsOSStatic | PlatformMacOSStatic | PlatformWebStatic) => {
    return platform.OS === 'web'
      ? <Button
        title="Go to Home"
        onPress={() => {
          return props.modalState === true ? props.setModalState(false) : props.setModalState(true);
        }}
      />
      : <></>;
  };

  return (
    // eslint-disable-next-line no-sequences
    <View style={[styles.container, { backfaceVisibility: showModal(props.modalState) }]}>
      <Text>Details Screen</Text>
      <Text>State: {JSON.stringify(props.modalState)}</Text>
      {closeModalButton(Platform)}
    </View>
  );
};
