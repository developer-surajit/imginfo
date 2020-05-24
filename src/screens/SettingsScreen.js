import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
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

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('i18', I18n);
  }
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
        <TouchableOpacity
          onPress={() => this.setLang('en-GB')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 5,
          }}>
          <FontAwesome name="language" size={20} color={Colors.main_color} />
          <Text style={{marginLeft: 15}}>Change Language en</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.setLang('fr-FR')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 5,
          }}>
          <FontAwesome name="language" size={20} color={Colors.main_color} />
          <Text style={{marginLeft: 15}}>Change Language fr</Text>
        </TouchableOpacity>
        <Text>{I18n.t('hello')}</Text>
        <TouchableOpacity
          onPress={() => this.logoutUser()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <AntDesign name="logout" size={20} color={Colors.main_color} />
          <Text style={{marginLeft: 15}}>Logout</Text>
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
