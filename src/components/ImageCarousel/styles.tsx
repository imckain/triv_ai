import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imageList: {
    flexGrow: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    paddingBottom: 6,
  },
  image: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  imageIndex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 1.6,
  },
});
