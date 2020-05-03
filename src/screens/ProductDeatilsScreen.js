import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Image, StyleSheet} from 'react-native';
import ImageSlider from 'react-native-image-slider';
class ProductDeatilsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const images = [
      'https://placeimg.com/640/640/nature',
      'https://placeimg.com/640/640/people',
      'https://placeimg.com/640/640/animals',
      'https://placeimg.com/640/640/beer',
    ];

    return (
      <View>
        <ImageSlider
          loopBothSides
          autoPlayWithInterval={3000}
          images={images}
          customSlide={({index, item, style, width}) => (
            // It's important to put style here because it's got offset inside
            <View key={index} style={[style, styles.customSlide]}>
              <Image source={{uri: item}} style={styles.customImage} />
            </View>
          )}
          customButtons={(position, move) => (
            <View style={styles.buttons}>
              {images.map((image, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    underlayColor="#ccc"
                    onPress={() => move(index)}
                    style={styles.button}>
                    <Text style={position === index && styles.buttonSelected}>
                      {index + 1}
                    </Text>
                  </TouchableHighlight>
                );
              })}
            </View>
          )}
        />
        <Text> ProductDeatilsScreen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default ProductDeatilsScreen;
