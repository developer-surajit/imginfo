import React from 'react';
import {WebView} from 'react-native';

const ImageWebView = ({imageUrl, style}) => (
  <WebView
    source={{
      html: `<style>*{margin:0;padding:0;}</style><img src="${imageUrl}" style="width: 55; height: 55;"/>`,
    }}
    style={style}
  />
);

export default ImageWebView;
