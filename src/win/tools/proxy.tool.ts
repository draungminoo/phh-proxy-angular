import axios from 'axios';
import { Agent } from 'https';
import { appStorage } from '../main/electron-store';
import { AppEnvValues } from '../resources/env/app.env';
import { ProxyInfoType, ProxyTokenReturnType } from '../types/proxy-info.type';
import { getDeviceInfo } from './get-device-info.tool';

let serverToken: string | null = null;
const axiosHttpsAgent = new Agent({
  rejectUnauthorized: false,
});

export function getProxyInfoFromServer(token: string | null) {
  const deviceInfo = JSON.stringify(getDeviceInfo());

  return new Promise<ProxyInfoType>((res, rej) => {
    axios
      .get<ProxyInfoType>(
        `${AppEnvValues.API_SERVER_URL}/phh-proxy-info/for-proxy-user`,
        {
          params: { deviceInfo, token },
          httpsAgent: axiosHttpsAgent,
        },
      )
      .then((r) => {
        res(r.data);
      })
      .catch((error) => {
        rej(error);
      });
  });
}

export function requestNewProxyToken() {
  return new Promise<ProxyTokenReturnType>((res, rej) => {
    axios
      .post<ProxyTokenReturnType>(
        `${AppEnvValues.API_SERVER_URL}/phh-proxy-users/create-proxy-token`,
        getDeviceInfo(),
        {
          httpsAgent: axiosHttpsAgent,
        },
      )
      .then((r) => {
        appStorage.setItem('__local-proxy-token', r.data?.token);
        res(r.data);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      });
  });
}

export function checkLocalProxyToken() {
  return new Promise<string>((res, rej) => {
    appStorage
      .getItem('__local-proxy-token')
      .then((token) => {
        serverToken = token;
        res(token);
      })
      .catch((error) => {
        console.log(error);
        requestNewProxyToken()
          .then((data) => {
            res(data?.token);
          })
          .catch((error) => {
            console.log(error);
            rej(error);
          });
      });
  });
}

export function getServerToken() {
  return serverToken;
}
