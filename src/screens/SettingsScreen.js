import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import {toastAndroidiOS} from '../utils/toastAndroidiOS';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error, 'in logout');
    }
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 15}}>
        <TouchableOpacity
          onPress={() => toastAndroidiOS('Not implemented yet', 2000)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            marginBottom: 5,
          }}>
          <FontAwesome name="language" size={20} color={Colors.main_color} />
          <Text style={{marginLeft: 15}}>Change Language</Text>
        </TouchableOpacity>

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
