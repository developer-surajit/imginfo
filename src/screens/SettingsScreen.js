import React, {Component} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import {toastAndroidiOS} from '../utils/toastAndroidiOS';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from '../utils/I18n';
import {setCurrentLanguage} from '../redux/actions';
import {connect} from 'react-redux';
import {Picker} from '@react-native-community/picker';
class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'java',
    };
    console.log('i18', I18n);
  }
  static navigationOptions = () => ({
    headerTitle: I18n.t('Setting'),
  });

  logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error, 'in logout');
    }
  };

  setLang = async val => {
    try {
      this.props.setCurrentLanguage(val);
      I18n.locale = val;
      I18n.defaultLocale = val;
      await AsyncStorage.setItem('currentLang', val);
      console.log('val', val);
      console.log('i18', I18n);
    } catch (error) {
      console.log(error, 'in currentLang');
    }
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginBottom: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome name="language" size={20} color={Colors.main_color} />
            <Text style={{marginLeft: 15}}>{I18n.t('Change_language')}</Text>
          </View>
          <View
            style={{
              borderColor: Colors.dark_grey,
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 5,
            }}>
            <Picker
              mode="dropdown"
              selectedValue={this.props.currentLanguage}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) => this.setLang(itemValue)}>
              <Picker.Item label="English" value="en-GB" />
              <Picker.Item label="Danish" value="da" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.logoutUser()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <AntDesign name="logout" size={20} color={Colors.main_color} />
          <Text style={{marginLeft: 15}}>{I18n.t('Logout')}</Text>
        </TouchableOpacity>

        {/* <Button
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: Colors.main_color,
          }}
          containerStyle={{
            marginHorizontal: 20,
            width: '80%',
            marginBottom: 20,
          }}
          title="Logout"
          onPress={() => this.logoutUser()}
          titleStyle={{color: 'white'}}
        />
        <Button
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: Colors.main_color,
          }}
          containerStyle={{marginHorizontal: 20, width: '80%'}}
          title="Change Language"
          onPress={() => toastAndroidiOS('Not implemented yet', 2000)}
          titleStyle={{color: 'white'}}
        /> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  spinner: state.spinnerToggleReducers.spinner,
  currentLanguage: state.currentLanguageReducer.currentLanguage,
});

export default connect(mapStateToProps, {
  setCurrentLanguage,
})(SettingsScreen);
