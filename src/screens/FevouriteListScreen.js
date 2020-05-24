import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {getFevlistAction, toggleFavouriteProductAction} from '../redux/actions';
const placeHolderImg = require('../assets/images/placeholder-1.jpg');
// import {universalApiCall} from '../utils/universalApiCall';
import {connect} from 'react-redux';
import Colors from '../constants/Colors';
import HeartIcon from 'react-native-vector-icons/FontAwesome';
import I18n from '../utils/I18n';

class FevouriteListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fevListData: [],
    };
  }

  // componentDidMount = () => {
  //   this.props.getFevlistAction();
  // };

  toggleFavourite = (product_id, whist_status) => {
    let data = {
      user_id: this.props.userProfileDetailsReducer.user_id,
      product_id,
      whist_status,
    };
    this.props.toggleFavouriteProductAction(data);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          // justifyContent: 'space-between',
          // marginHorizontal: 15,
          // padding: 10,
          borderRadius: 5,
          // elevation: 1,
          marginBottom: 15,
          marginTop: 10,
        }}>
        <Text>{I18n.t('hello')}</Text>
        <FlatList
          // data={DATA}
          // data={this.state.imgData}
          data={this.props.productListReducer.fevProductList}
          renderItem={({item}) => (
            <View
              style={{
                elevation: 7,
                marginBottom: 15,
                backgroundColor: 'white',
                marginHorizontal: 15,
                borderRadius: 4,
                marginTop: 10,
                overflow: 'hidden',
                position: 'relative',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                // style={{marginBottom: 25}}
                onPress={() =>
                  this.props.navigation.navigate('ProductDeatilsScreen', {
                    product_id: item.product_id,
                    product_owner_id: item.user_id,
                  })
                }>
                <HeartIcon
                  onPress={() =>
                    this.toggleFavourite(item.product_id, item.is_whistlist)
                  }
                  name="heart"
                  color={
                    item.is_whistlist == 'true' ? 'red' : Colors.light_grey
                  }
                  size={24}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    padding: 10,
                    zIndex: 10,
                  }}
                />
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
                    // borderRadius: 4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    // marginTop: 15,
                    fontFamily: 'sans-serif-medium',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                  }}>
                  Description :{' '}
                  <Text
                    style={{fontSize: 16, fontFamily: 'sans-serif-regular'}}>
                    {item.desc}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginHorizontal: 15,
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
                Favorite list is empty
              </Text>
            </View>
          }
          keyExtractor={(item, i) => item.product_id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  productListReducer: state.productListReducer,
  spinner: state.spinnerToggleReducers.spinner,
  userProfileDetailsReducer: state.userProfileDetailsReducer,
  currentLanguage: state.currentLanguageReducer.currentLanguage,
});

export default connect(mapStateToProps, {
  getFevlistAction,
  toggleFavouriteProductAction,
})(FevouriteListScreen);
