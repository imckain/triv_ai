import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  answerContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 32,
  },
  answerList: {
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'auto',
    overflow: 'visible',
    fontSize: 26,
    width: '100%',
    height: 38,
    textTransform: 'capitalize',
  },
  answerListView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: '#232323',
    backgroundColor: '#23232341',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 16,
    overflow: 'visible',
    marginBottom: 10,
    width: '60%',
    shadowColor: '#ffffffac',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
  infoText: {
    color: '#fff',
    fontSize: 42,
    letterSpacing: 6,
    paddingVertical: 22,
  },
});
