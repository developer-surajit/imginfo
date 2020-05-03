import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const CustomButton = ({
  disabled,
  title,
  buttonStyle,
  buttonTextStyle,
  onPress,
}) => {
  // console.log('button', buttonStyle);
  if (disabled) {
    return (
      <TouchableWithoutFeedback
        style={[
          styles.buttonStyle,
          {backgroundColor: Colors.light_grey},
          buttonStyle,
        ]}>
        <View>
          <Text style={[styles.buttonTextStyle, buttonTextStyle]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, buttonStyle]}
      onPress={() => onPress()}>
      <Text style={[styles.buttonTextStyle, buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.main_color,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonTextStyle: {
    // textTransform: 'capitalize',
    fontSize: 20,
    color: 'white',
  },
});

export default CustomButton;
