import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  flex_row: {
    flexDirection: 'row',
  },
  borderBottom: {
    borderBottomColor: 'rgba(0,0,0,1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  smallText: {
    textAlign: 'center',
    fontSize: 11,
    color: 'grey',
  },
  pad_ver_10: {
    paddingVertical: 10,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  imgBgStyle: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
});
