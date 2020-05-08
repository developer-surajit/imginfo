import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';

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
                Hi, User name wants to visit your tree on{' '}
                {moment(item.date_time).format('DD-MM-YY')} at{' '}
                {moment().format('hh:mm a')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Button
                  title="Allow"
                  type="clear"
                  onPress={console.log('ddd')}
                />
                <Button
                  title="Deny"
                  type="clear"
                  onPress={console.log('ddd')}
                />
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
                }}>
                No request found
              </Text>
            </View>
          }
          keyExtractor={(item, i) => item.date_time}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = state => ({
  requestListReducer: state.requestListReducer,
});

export default connect(mapStateToProps, {})(OutgoingRequestsTabScreen);
