import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {universalApiCall} from './../utils/universalApiCall';
import Spinner from 'react-native-loading-spinner-overlay';
let PhoneRegex = /^[6-9]\d{9}$/;
const deviceWidth = Dimensions.get('window').width;
const logo = require('./../assets/images/Logo.jpg');
import Colors from '../constants/Colors';
import {connect} from 'react-redux';
import {setUserDetailsAction} from '../redux/actions';
import networkCheck from '../utils/networkCheck';
// import Toast from 'react-native-tiny-toast';
import I18n from '../utils/I18n';

import {toastAndroidiOS} from '../utils/toastAndroidiOS';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    // I18n.locale = 'fr';
  }

  validationSchema = () =>
    Yup.object().shape({
      email: Yup.string()
        .label('email')
        .email(I18n.t('email_error'))
        .required(I18n.t('email_blank')),
      password: Yup.string()
        .label('password')
        .required(I18n.t('pass_blank')),
    });

  loginUser = async values => {
    try {
      if (networkCheck(this.props.checkNetworkReducer)) return;
      this.setState({
        loading: true,
      });
      let {email, password} = values;
      let login = await universalApiCall('/userLogin', 'POST', {
        email,
        password,
      });

      if (login.data.status) {
        toastAndroidiOS(I18n.t('login_success'), 2000);
        this.saveDetails(login.data.result);
      } else {
        toastAndroidiOS(I18n.t('invalid_login'), 2000);
      }
      this.setState({
        loading: false,
      });

      console.log({login});
      console.log(values);
    } catch (error) {
      this.setState({
        loading: false,
      });
      toastAndroidiOS(I18n.t('something_wrong'), 2000);
      console.log(error.response);
    }
  };

  saveDetails = async data => {
    try {
      await AsyncStorage.setItem('user_id', JSON.stringify(data.id));
      this.props.setUserDetailsAction({
        user_id: data.id,
      });
      this.props.navigation.navigate('App');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.containerView}>
        <Spinner
          textContent={I18n.t('Loading')}
          visible={this.state.loading}
          overlayColor="rgba(0,0,0,0.5)"
          textStyle={{color: 'white'}}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="always"
          enableOnAndroid={true}
          //   extraHeight={100}
          //   scrollToInputAdditionalOffset={100}
          innerRef={ref => {
            this.scroll = ref;
          }}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={this.validationSchema}
            // validateOnBlur={false}
            // initialTouched={true}
            onSubmit={values => {
              this.loginUser(values);
            }}>
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              setFieldValue,
              touched,
            }) => {
              // console.log({values}, {errors}, {touched});
              return (
                <View style={styles.loginFormView}>
                  <View style={{marginBottom: 50}}>
                    <Image
                      source={logo}
                      style={{
                        width: '100%',
                        height: 150,
                        borderRadius: 4,
                        overflow: 'hidden',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Input
                    placeholder={I18n.t('Email')}
                    value={values.email}
                    leftIconContainerStyle={{}}
                    onChangeText={handleChange('email')}
                    containerStyle={{marginBottom: 10}}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorStyle}>{errors.email}</Text>
                  )}
                  <Input
                    placeholder={I18n.t('Password')}
                    value={values.password}
                    type="password"
                    onChangeText={handleChange('password')}
                    secureTextEntry={true}
                    containerStyle={{marginBottom: 10}}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorStyle}>{errors.password}</Text>
                  )}

                  <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{marginHorizontal: 20, marginTop: 25}}
                    onPress={handleSubmit}
                    titleStyle={{color: 'white'}}
                    title={I18n.t('Sign_in')}
                    raised
                  />

                  <TouchableOpacity
                    style={{
                      marginHorizontal: 15,
                      marginTop: 20,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate('RegisterScreen');
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingVertical: 15,
                        color: Colors.main_color,
                      }}>
                      {I18n.t('new_user_sign_up')}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerView: {
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // textAlign: 'center',
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    // width: '80%',
    backgroundColor: 'red',
  },
  logoText: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  errorStyle: {
    paddingHorizontal: 15,
    marginTop: -5,
    // paddingVertical: 5,
    color: '#f44336',
    // textAlign: 'center',
  },
  loginFormView: {
    textAlign: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 30,
    marginHorizontal: 15,
    // elevation: 3,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
  },
  loginFormTextInput: {
    height: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#eeeeee',
    paddingLeft: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  loginButton: {
    borderRadius: 50,
    backgroundColor: Colors.main_color,
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const mapStateToProps = state => ({
  checkNetworkReducer: state.checkNetworkReducer,
  currentLanguage: state.currentLanguageReducer.currentLanguage,
});

export default connect(mapStateToProps, {setUserDetailsAction})(LoginScreen);
