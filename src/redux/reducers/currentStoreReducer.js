import {SET_CURRENT_STORE} from '../constants/types';

const initialState = {
  storeData: {
    // _id: '5e8c6a15a672aa0017adb1d3',
    // location: {
    //   coordinates: [88.39493449999999, 22.5009134],
    //   type: 'Point',
    // },
    // delivery_type: 'both',
    // status: 'active',
    // category: {
    //   _id: '5e882556344c7800170e8022',
    //   status: 'active',
    //   cat_name: 'Food supplies',
    //   cat_code: '1',
    //   __v: 0,
    // },
    // name: 'Ashutosh Kumar',
    // email: 'ashutosh.kumar@bitcanny.com',
    // phone_number: '+917003487907',
    // address: 'Kalikapur, Haltu, Kolkata, West Bengal 700099, India',
    // area: 'Haltu',
    // state: 'West Bengal',
    // city: 'Kolkata',
    // pincode: 700099,
    // __v: 0,
    // dist: {
    //   calculated: 510.70264645106147,
    // },
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_STORE:
      return {
        ...state,
        storeData: action.payload,
      };

    default:
      return state;
  }
}
