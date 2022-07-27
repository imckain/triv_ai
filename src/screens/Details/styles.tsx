import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    maxWidth: 600,
    height: 600,
    backgroundColor: '#353535',
    zIndex: 1,
    position: 'absolute',
    borderRadius: 10,
    shadowColor: '#ffffffac',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    color: '#fff',
    paddingTop: 4,
    paddingRight: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 22,
  },
  text: {
    color: '#fff',
  },
  lineBreak: {
    width: '80%',
    backgroundColor: '#fff',
    height: 1,
  },
});
