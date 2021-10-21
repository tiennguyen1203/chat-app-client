import { Auth } from 'aws-amplify';
import { USER_POOL_WEB_CLIENT_ID } from './constants';

const checkIfErrorOccurs = (res) => ({
  code: res.status,
  res,
});

const TIME_OUT = 10000;

async function customFetch(path, headerOptions) {
  const normalFetch = fetch(path, headerOptions);
  const res = await timeoutPromise(
    TIME_OUT,
    normalFetch.then(checkIfErrorOccurs).catch(checkIfErrorOccurs)
  );

  if (res.code < 300) {
    // console.log('res: ', res.res.json());
    const response = await res.res.json();
    console.log('hasdasd', response);
    return response;
  }
  try {
    const response = await res.res.json();
    const error = {
      code: res.code,
      ...response,
    };
    throw error;
  } catch (e) {
    if (res.code === 426) {
      const error = {
        code: res.code,
        message:
          'We have had some significant upgrades for the app. Please click below to upgrade your app!',
        ...e,
      };
      throw error;
    } else {
      const error = {
        code: res.code,
        message: 'Something wrong. Please try again.',
        ...e,
      };

      throw error;
    }
  }
}

export const timeoutPromise = (ms, promise) =>
  new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request time out! Please try again.'));
    }, ms);
    promise.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });

export default customFetch;

function requestWrapper(method) {
  const request = async (url, data = null, params = {}) => {
    let convertUrl = url;
    let convertParams = {};
    let convertData = data;
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      convertParams = convertData;
      if (convertParams !== null) {
        convertUrl = `${convertUrl}?${getQueryString(convertParams)}`;
      }
      convertData = null;
    } else if (convertData === Object(convertData)) {
      convertData = JSON.stringify(convertData);
    }

    const defaults = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    // check that req url is relative and request was sent to our domain

    const username = localStorage.getItem(
      `CognitoIdentityServiceProvider.${USER_POOL_WEB_CLIENT_ID}.LastAuthUser`
    );
    const token =
      localStorage.getItem('abc') ||
      localStorage.getItem(
        `CognitoIdentityServiceProvider.${USER_POOL_WEB_CLIENT_ID}.${username}.idToken`
      );
    console.log('token: ', token);
    if (token) {
      defaults.headers.Authorization = `Bearer ${token}`;
    }

    if (method === 'POST' || method === 'PUT') {
      defaults.headers.Accept = 'application/json';
      defaults.headers['Content-Type'] = 'application/json';
    }

    if (convertData) {
      defaults.body = convertData;
    }

    const paramsObj = {
      ...defaults,
      headers: { ...defaults.headers, ...params },
    };
    console.log('convertUrl: ', convertUrl);
    const response = await new Promise((resolve) => {
      console.log(convertUrl, paramsObj);
      fetch(convertUrl, paramsObj).then((data) => resolve(data));
    });

    return response.json();
  };
  return request;
}

export function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .filter((k) => params[k] || params[k] === 0)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}

export const get = requestWrapper('GET');
export const post = requestWrapper('POST');
export const put = requestWrapper('PUT');
export const patch = requestWrapper('PATCH');
export const del = requestWrapper('DELETE');
