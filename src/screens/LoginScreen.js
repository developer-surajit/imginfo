import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ToastAndroid,
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
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  validationSchema = () =>
    Yup.object().shape({
      email: Yup.string()
        .label('email')
        .email('Please enter correct email')
        .required('Please enter the Email'),
      password: Yup.string()
        .label('password')
        .required('Please enter password'),
    });

  loginUser = async values => {
    try {
      this.setState({
        loading: true,
      });
      let {name, email, password} = values;
      let register = await universalApiCall('/userLogin', 'POST', {
        email,
        password,
      });

      if (register.data.status) {
        this.setState({
          loading: false,
        });
        ToastAndroid.show('Login successfully', 1000);
        this.saveDetails(register.data.result);
      }
      console.log(register);
      console.log(values);
    } catch (error) {
      this.setState({
        loading: false,
      });
      alert('Something went wrong, please try again');
      console.log(error.response);
    }
  };

  saveDetails = async data => {
    try {
      await AsyncStorage.setItem('user_id', JSON.stringify(data.id));
      this.props.navigation.navigate('App');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.containerView}>
        <Spinner
          textContent="Loading.."
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
                  <Input
                    placeholder="Email"
                    value={values.email}
                    leftIconContainerStyle={{}}
                    onChangeText={handleChange('email')}
                    containerStyle={{marginBottom: 20}}
                  />
                  {errors.email && (
                    <Text style={styles.errorStyle}>{errors.email}</Text>
                  )}
                  <Input
                    placeholder="Password"
                    value={values.password}
                    type="password"
                    onChangeText={handleChange('password')}
                    secureTextEntry={true}
                    containerStyle={{marginBottom: 20}}
                  />
                  {errors.password && (
                    <Text style={styles.errorStyle}>{errors.password}</Text>
                  )}

                  <Button
                    buttonStyle={styles.loginButton}
                    containerStyle={{marginHorizontal: 20, marginTop: 25}}
                    onPress={handleSubmit}
                    titleStyle={{color: 'white'}}
                    title="Sign in"
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
                        color: '#3b99fc',
                      }}>
                      New user ? go to Sign up
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: '#f44336',
    textAlign: 'center',
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
    // marginHorizontal: 25,
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
