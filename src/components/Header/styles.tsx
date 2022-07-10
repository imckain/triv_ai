import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#000000',
    zIndex: 2,
    shadowColor: '#959595af',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.3,
  },
  logo: {
    fontSize: 28,
    color: '#fff',
  },
});
