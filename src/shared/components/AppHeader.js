import React, {Component} from 'react';

import {View, Text, StyleSheet, StatusBar, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constants/Colors';
import NavigationService from '../../navigation/NavigationService';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
export default class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.pickerRef = React.createRef();
  }

  goBack = () => {
    if (this.props.onBackPress) {
      this.props.onBackPress();
    } else {
      NavigationService.goBack();
    }
  };
  render() {
    const {
      title,
      backTitle,
      headerStyle,
      onRightIconPress,
      status,
      backIcon,
    } = this.props;
    return (
      <View style={styles.root}>
        <View style={[styles.header, headerStyle]}>
          <View style={styles.back}>
            {backIcon ? (
              <Icon
                style={[styles.Icon]}
                onPress={this.goBack}
                name="keyboard-backspace"
                size={24}
                color="black"
              />
            ) : null}
            {backTitle ? (
              <View
                style={[
                  styles.headerTextContainer,
                  this.props.headerTextContainer,
                ]}>
                <Text style={[styles.headerText]}>{backTitle}</Text>
              </View>
            ) : null}
          </View>

          <Menu>
            <MenuTrigger>
              <Entypo
                style={[styles.Icon]}
                name="dots-three-vertical"
                size={20}
                color="black"
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={styles.optionsTitle}>Change Language</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={styles.optionsTitle}>Settings</Text>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  NavigationService.navigate('RequestListScreen')
                }>
                <Text style={styles.optionsTitle}>All Requests</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={styles.optionsTitle}>Logout</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>

        {status && (
          <View style={{}}>
            <Text
              style={{
                color: Colors.dark_grey_1,
                textTransform: 'capitalize',
                paddingHorizontal: 55,
              }}>
              {status}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    elevation: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 10,
  },
  optionsTitle: {
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 5,
    paddingHorizontal: 15,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    marginRight: 10,
  },
  Icon: {
    padding: 5,
    borderRadius: 50,
    overflow: 'hidden',
    zIndex: 9,
  },
  headerTextContainer: {},
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    textTransform: 'capitalize',
  },
  titleStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    textTransform: 'capitalize',
    marginTop: 5,
    paddingHorizontal: 30,
  },
});
