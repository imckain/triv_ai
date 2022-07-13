import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    width: '100%',
    backgroundColor: '#1f1f1f',
  },
  containerWeb: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    width: '100%',
    backgroundColor: '#1f1f1f',
  },
  homePageMobile: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#000000',
    paddingTop: 16,
  },
  homePageWeb: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#000000',
    paddingTop: 88,
  },
  triviaContent: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  imageContainer: {
    paddingVertical: 18,
  },
  gameplayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  answerContainer: {
    justifyContent: 'space-evenly',
  },
  answerView: {
    paddingVertical: 12,
    borderWidth: 1,
    borderBottomColor: '#fff',
    width: '100%',
  },
  answerText: {
    color: '#fff',
  },
  inputView: {
    paddingVertical: 22,
  },
  input: {
    backgroundColor: '#000000',
    width: 300,
    height: 60,
    borderRadius: 5,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#303030',
    textAlign: 'center',
    fontSize: 18,
  },
});
