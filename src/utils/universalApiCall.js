import {server} from '../config/keys';
import axios from 'axios';

export const universalApiCall = async (link, method, params, headers) => {
    console.log('api called', link, method, params, headers);
    console.log('api called', server + link);

  return new Promise((resolve, reject) => {
    let requestParams = {
      ...(method === 'get' ? {params} : {data: params}),
    };
    // console.log(requestParams, 'params');
    axios({
      method,
      baseURL: server + link,
      headers,
      ...requestParams,
      timeout: 5000,
    })
      .then(res => {
        // console.log(res, 'apiCall');
        resolve(res);
      })
      .catch(err => {
        console.log(err, err.response, 'api call catch');
        reject(err);
      });
  });
};
