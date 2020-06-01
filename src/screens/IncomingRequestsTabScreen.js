import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {universalApiCall} from '../utils/universalApiCall';
import {Button} from 'react-native-elements';
import {Colors} from '../constants/Colors';
import Toast from 'react-native-tiny-toast';
import {changeRequestStatusAction} from '../redux/actions';
import I18n from '../utils/I18n';
class IncomingRequestsTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  changeStatus = async (request_id, status) => {
    const toast = Toast.showLoading('Loading...');
    try {
      let data = await universalApiCall('/requestresult', 'POST', {
        requst_id: request_id,
        status: status,
      });
      console.log(data, 'req res');
      Toast.hide(toast);
      if (data.data.result) {
        this.props.changeRequestStatusAction({request_id, status});
      }
    } catch (error) {
      Toast.hide(toast);
      this.setState({
        loading: false,
      });
      console.log(error, error.response, 'in product details get data');
    }
  };

  render() {
    return (
      <View style={{paddingTop: 10}}>
        <FlatList
          data={this.props.requestListReducer.request_list}
          renderItem={({item}) => (
            <View
              style={{
                elevation: 5,
                marginBottom: 15,
                backgroundColor: 'white',
                marginHorizontal: 15,
                borderRadius: 4,
                paddingVertical: 15,
                paddingHorizontal: 20,
                paddingTop: 20,
                marginTop: 5,
              }}>
              <Text style={{textAlign: 'center', fontSize: 16, lineHeight: 25}}>
                Hi, {item.sender_user_name} wants to visit your tree on{' '}
                {moment(item.date_time).format('DD-MM-YY')} at{' '}
                {moment(item.date_time).format('HH:mm a')}
              </Text>
              {item.status.toLowerCase() == 'unditermind' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Button
                    title={I18n.t('Allow')}
                    type="clear"
                    onPress={() => this.changeStatus(item.request_id, 1)}
                  />
                  <Button
                    title={I18n.t('Deny')}
                    type="clear"
                    onPress={() => this.changeStatus(item.request_id, 2)}
                  />
                </View>
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    fontSize: 16,
                    fontFamily: 'sans-serif-medium',
                    marginTop: 10,
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
              )}
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

export default connect(mapStateToProps, {changeRequestStatusAction})(
  IncomingRequestsTabScreen,
);
