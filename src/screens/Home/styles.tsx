import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerMobile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  containerWeb: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  homePageMobile: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    paddingTop: 16,
  },
  homePageWeb: {
    flexGrow: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 800,
    paddingVertical: 88,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    color: '#fff',
    fontSize: 42,
    letterSpacing: 16,
    fontWeight: '700',
  },
  triviaContent: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  aiHintContainer: {
    paddingTop: 20,
    marginBottom: 20,
  },
  hintInfo: {
    paddingTop: 20,
    textAlign: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 24,
    letterSpacing: 2.8,
  },
  inputViewMobile: {
    paddingVertical: 22,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  inputViewWeb: {
    paddingVertical: 22,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#000000',
    height: 0,
    width: 0,
  },
});
