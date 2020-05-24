import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  WebView,
} from 'react-native';
import {Callout} from 'react-native-maps';

import ImageWebView from './ImageWebView';

const CustomCallout = ({localImage, imageUrl}) => {
  const fixImage = content =>
    Platform.OS === 'ios' ? (
      content
    ) : (
      <Text style={styles.imageWrapper}>content</Text>
    );

  return (
    <Callout style={styles.callout}>
      {localImage !== null ? (
        fixImage(<Image source={localImage} />)
      ) : (
        <ImageWebView imageUrl={imageUrl} style={styles.image} />
      )}
      <Text style={styles.message}>Hello from pin! :)</Text>
    </Callout>
  );
};

const styles = StyleSheet.create({
  message: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  callout: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 55,
    height: 55,
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
  },
  imageWrapper: {
    marginTop: -23,
    paddingBottom: 23,
  },
});

CustomCallout.defaultProps = {
  localImage: null,
};

export default CustomCallout;
