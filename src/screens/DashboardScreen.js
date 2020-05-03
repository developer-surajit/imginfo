import React, {Component} from 'react';
import {
  Text,
  ViewComponent,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  ToastAndroid,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../constants/Colors';
import {universalApiCall} from '../utils/universalApiCall';
import {Button, Divider} from 'react-native-elements';
import {AppHeader} from '../shared/components';
import RangeSlider from 'rn-range-slider';
const placeHolderImg = require('./../assets/images/placeholder-1.jpg');
const DATA = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];

export default class DashboardScreen extends Component {
  state = {
    loading: false,
    imgData: [],
    rangeLow: null,
    rangeHigh: null,
  };

  componentDidMount = () => {
    this.getPhotoList();
  };

  getPhotoList = async () => {
    try {
      this.setState({
        loading: true,
      });
      let userId = await AsyncStorage.getItem('user_id');

      let data = await universalApiCall('/listpointlocationbyuser', 'POST', {
        user_id: JSON.parse(userId),
      });

      if (data.data.status) {
        this.setState({
          loading: false,
          imgData: data.data.result,
        });
      }

      console.log(data);
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log(error, 'in dashboard get data');
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <AppHeader />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{marginTop: 15, fontSize: 16}}>
            Select your search range
          </Text>
          <RangeSlider
            rangeEnabled={!true}
            style={{width: '80%', height: 70}}
            gravity={'bottom'}
            min={5}
            max={20}
            step={1}
            selectionColor="#3df"
            blankColor="#f618"
            onValueChanged={(low, high, fromUser) => {
              this.setState({rangeLow: low, rangeHigh: high});
            }}
          />
        </View>
        {this.state.permissionError ? (
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 15,
              // marginVertical: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#ef5350',
                backgroundColor: '#ffcdd2',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 3,
              }}>
              {this.state.permissionError}
            </Text>
          </View>
        ) : null}
        {/* <Spinner
          textContent="Loading.."
          visible={this.state.loading}
          overlayColor="rgba(0,0,0,0.5)"
          textStyle={{color: 'white'}}
        /> */}
        <View
          style={{
            flex: 1,
            // justifyContent: 'space-between',
            marginHorizontal: 15,
            // padding: 10,
            borderRadius: 5,
            // elevation: 1,
            marginBottom: 15,
            marginTop: 15,
          }}>
          <FlatList
            // data={DATA}
            data={this.state.imgData}
            renderItem={({item}) => (
              <View style={{marginBottom: 25}}>
                <Image
                  source={{
                    uri: `https://iodroid.in/redfrugten/uploads/${item.image}`,
                  }}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: 200,
                    // marginHorizontal: 15,
                    resizeMode: 'cover',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 15,
                    fontFamily: 'sans-serif-medium',
                    paddingLeft: 5,
                  }}>
                  Description :{' '}
                  <Text
                    style={{fontSize: 16, fontFamily: 'sans-serif-regular'}}>
                    {item.desc}
                  </Text>
                </Text>
                <Divider
                  style={{backgroundColor: 'rgba(0,0,0,0.25)', marginTop: 15}}
                />
              </View>
            )}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Image
                  source={placeHolderImg}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: 200,
                    resizeMode: 'cover',
                    borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 15,
                    paddingLeft: 5,
                  }}>
                  No image found
                </Text>
              </View>
            }
            keyExtractor={(item, i) => item.datetime}
          />

          <View
            style={{
              paddingTop: 15,
              borderTopColor: ' rgba(0, 0, 0, 0.10)',
              borderTopWidth: StyleSheet.hairlineWidth,
            }}>
            <View style={styles.buttonContainer}>
              <Button
                buttonStyle={{
                  borderRadius: 50,
                  backgroundColor: Colors.main_color,
                }}
                containerStyle={{marginHorizontal: 20}}
                title="Upload"
                onPress={() => {
                  this.props.navigation.navigate('HomeScreen');
                }}
                titleStyle={{color: 'white'}}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
