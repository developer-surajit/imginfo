import React, {Component} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {AppHeader} from '../shared/components';
import {universalApiCall} from '../utils/universalApiCall';
import {Button, Divider} from 'react-native-elements';
import {TabView, TabBar} from 'react-native-tab-view';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-community/async-storage';
import OutgoingRequestsTabScreen from './OutgoingRequestsTabScreen';
import IncomingRequestsTabScreen from './IncomingRequestsTabScreen';
import {connect} from 'react-redux';
import {getRequestListAction, getSentRequestListAction} from '../redux/actions';
import I18n from '../utils/I18n';
class RequestListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      index: 0,
      routes: [
        {key: 'first', title: I18n.t('Own_Requests')},
        {key: 'second', title: I18n.t('Sent_Requests')},
      ],
    };
  }

  componentDidMount = () => {
    this.props.getRequestListAction();
    this.props.getSentRequestListAction();
  };

  // getRequestList = async () => {
  //   try {
  //     this.setState({
  //       loading: true,
  //     });
  //     let userId = await AsyncStorage.getItem('user_id');

  //     let resData = await universalApiCall('/listpointlocationbyuser', 'POST', {
  //       user_id: JSON.parse(userId),
  //     });

  //     if (resData.data.status) {
  //       this.setState({
  //         loading: false,
  //         data: resData.data.result,
  //       });
  //     }

  //     console.log(resData);
  //   } catch (error) {
  //     this.setState({
  //       loading: false,
  //     });
  //     console.log(error, 'in dashboard get data');
  //   }
  // };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <TabView
          style={{flex: 1, elevation: 0}}
          navigationState={{
            index: this.state.index,
            routes: this.state.routes,
          }}
          lazy
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: Colors.main_color,
                // height: 4,
              }}
              renderLabel={({route, focused, color}) => (
                <Text
                  style={{
                    color: Colors.main_color,
                    margin: 8,
                    textTransform: 'none',
                    fontFamily: 'sans-serif-medium',
                  }}>
                  {route.title}
                </Text>
              )}
              style={{
                backgroundColor: 'white',
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: Colors.dark_grey,
              }}
            />
          )}
          tabStyle={{
            marginTop: 50,
          }}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <IncomingRequestsTabScreen />;
              case 'second':
                return <OutgoingRequestsTabScreen />;
              default:
                return null;
            }
          }}
          swipeEnabled={true}
          onIndexChange={index => {
            console.log('index', index);
            // this.index = index;
            this.setState({index});
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  currentLanguage: state.currentLanguageReducer.currentLanguage,
});

export default connect(mapStateToProps, {
  getRequestListAction,
  getSentRequestListAction,
})(RequestListScreen);
