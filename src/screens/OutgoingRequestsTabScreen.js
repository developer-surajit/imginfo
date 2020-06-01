import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import I18n from '../utils/I18n';
import {Button} from 'react-native-elements';
class OutgoingRequestsTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{paddingTop: 10}}>
        <FlatList
          data={this.props.requestListReducer.sent_request_list}
          renderItem={({item}) => (
            <View
              style={{
                elevation: 5,
                marginBottom: 15,
                backgroundColor: 'white',
                marginHorizontal: 15,
                borderRadius: 6,
                overflow: 'hidden',
                marginTop: 5,
              }}>
              <Image
                source={{
                  uri: `https://iodroid.in/redfrugten/uploads/${item.product_image}`,
                }}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: 200,
                  resizeMode: 'cover',
                }}
              />
              <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'sans-serif-medium',
                  }}>
                  {I18n.t('Visit_Time')} :{' '}
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'sans-serif-regular',
                      color: '#29d',
                    }}>
                    {moment(item.date_time).format('DD-MM-YY')} at{' '}
                    {moment(item.date_time).format('HH:mm a')}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'sans-serif-medium',
                    marginTop: 5,
                  }}>
                  {I18n.t('Status')} :{' '}
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'sans-serif-regular',
                      color:
                        item.status.toLowerCase() == 'unditermind'
                          ? '#29d'
                          : item.status.toLowerCase() == 'allow'
                          ? '#008b00'
                          : '#fa383e',
                    }}>
                    {item.status.toLowerCase() == 'unditermind'
                      ? I18n.t('Not_responded')
                      : item.status.toLowerCase() == 'allow'
                      ? I18n.t('Request_Accepted')
                      : I18n.t('Request_Rejected')}
                  </Text>
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginHorizontal: 15,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  paddingLeft: 5,
                  textAlign: 'center',
                }}>
                {this.props.spinner ? '' : I18n.t('no_request')}
              </Text>
            </View>
          }
          keyExtractor={(item, i) => item.request_id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = state => ({
  requestListReducer: state.requestListReducer,
  spinner: state.spinnerToggleReducers.spinner,
  currentLanguage: state.currentLanguageReducer.currentLanguage,
});

export default connect(mapStateToProps, {})(OutgoingRequestsTabScreen);
