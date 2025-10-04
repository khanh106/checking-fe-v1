import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';

import { StorageKeys } from '@/constants/storage-key';
import { IBaseResponse } from '@/types';

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://checking-api-dev.gasy.one/api/v1/',
};

const http: AxiosInstance = axios.create(config);

http.interceptors.request.use(
  (config) => {
    const token = getCookie(StorageKeys.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response?.data);
  },
);

export const getAsync = <T = any, R = IBaseResponse<T>>(url: string, params?: any, headers?: any) => {
  return http.get<any, R>(url, { params, headers });
};

export default http;
