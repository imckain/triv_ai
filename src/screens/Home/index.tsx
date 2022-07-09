import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ReactElement } from 'react';
import { Button, Text } from 'react-native';
import { Container } from '../../components';
import { StackParams } from '../../navigation';

type NavigationProps = StackNavigationProp<StackParams, 'Home'>;

export function Home(): ReactElement {
  const { navigate } = useNavigation<NavigationProps>();
  return (
    <Container>
      <Text>Home Screen</Text>
      <Button
        testID="details"
        title="Home Screen"
        onPress={() => navigate('Details', { data: 'Data can go here' })}
      />
    </Container>
  );
}
