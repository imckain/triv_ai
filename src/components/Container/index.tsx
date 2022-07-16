import React, { ReactElement } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './styles';

type Props = {
  children: React.ReactElement | ReactElement[];
  testID?: string;
};

export function Container({ children, testID }: Props): React.ReactElement {
  return (
    <SafeAreaView style={styles.center} testID={testID}>
      {children}
    </SafeAreaView>
  );
}
