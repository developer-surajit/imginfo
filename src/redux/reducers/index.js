import {combineReducers} from 'redux';
import errorReducer from './errorReducers';
import userLocationReducer from './userLocationReducer';
import storeCategoryListReducer from './storeCategoryListReducer';
import storeSearchParamReducer from './storeSearchParamReducer';
import storeListReducer from './storeListReducer';
import currentStoreReducer from './currentStoreReducer';
import spinnerToggleReducers from './spinnerToggleReducers';
import userProfileDetailsReducer from './userProfileDetailsReducer';
import checkNetworkReducer from './checkNetworkReducer';
import otpVerificationErrorReducer from './otpVerificationErrorReducer';
import navigationReducer from './navigationReducer';
import productMainCategoryReducer from './productMainCategoryReducer';
import productSearchParamReducer from './productSearchParamReducer';
import productListReducer from './productListReducer';
import addEachProductReducer from './addEachProductReducer';
import storeOrderListReducer from './storeOrderListReducer';
import activeProductTabReducer from './activeProductTabReducer';

import allOrdersReducer from './allOrdersReducer';
import SpecificOrderDetailsReducer from './SpecificOrderDetailsReducer';
import requestListReducer from './requestListReducer';
import productListForMapReducer from './productListForMapReducer';
// Root Reducer
const rootReducer = combineReducers({
  checkNetworkReducer,
  spinnerToggleReducers,
  userProfileDetailsReducer,
  // errorReducer,
  // otpVerificationErrorReducer,
  // storeCategoryListReducer,
  userLocationReducer,
  currentStoreReducer,
  // productMainCategoryReducer,
  // productSearchParamReducer,
  // storeSearchParamReducer,
  // storeListReducer,
  productListReducer,
  addEachProductReducer,
  // storeOrderListReducer,
  // allOrdersReducer,
  // SpecificOrderDetailsReducer,
  // activeProductTabReducer,
  requestListReducer,
  productListForMapReducer,
});

// console.log({rootReducer});

export default rootReducer;
