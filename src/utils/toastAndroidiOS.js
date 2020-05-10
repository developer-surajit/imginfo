import Toast from 'react-native-tiny-toast';

export default class toastClass {
  constructor(str, duration, options) {
    this.str = str;
    this.duration = duration;
    this.options = options;
  }
  show() {
    Toast.show(this.str, {
      duration: this.duration,
      position: -75,
      containerStyle: {
        backgroundColor: 'rgba(85,85,85,0.9)',
        paddingHorizontal: 25,
        borderRadius: 50,
        marginHorizontal: 25,
      },
      textStyle: {color: 'white', fontSize: 14},
      ...this.options,
    });
  }
}

export const toastAndroidiOS = (str, duration, options) => {
  new toastClass(str, duration, options).show();
};
