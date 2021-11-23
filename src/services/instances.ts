import { History } from 'history';
import axios, { AxiosRequestConfig } from 'axios';
import { commonUtil, localStorageUtil } from '../utils';
import { LoginResponse } from './auth';

const { baseUrl } = commonUtil.getEnv();

export const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorageUtil.get<LoginResponse['data']>('auth')?.access_token;
    config.headers = {
        Authorization: token ? `Bearer ${token}` : ''
    }
    return config;
});

export const setupInterceptors = (history: History<any>) => {
    instance.interceptors.response.use((resp) => {
        if (['Not Authenticated', 'jwt expired'].includes(resp?.data?.message)) {
            localStorageUtil.clear();
            history.push('/auth/login');
        }
        return resp;
    }, (error) => {
        const err = error?.response;
        if (err?.status === 401 || ['Not Authenticated', 'jwt expired'].includes(err?.data?.message)) {
            localStorageUtil.clear();
            history.push('/auth/login');
        }

        if (error.message === 'Network Error') {
            history.push('/no-connections');
        }

        return Promise.reject(error);
    });
};


export interface BaseResponse {
    status: number;
    message: string;
}

export interface BasePagination {
    page: number;
    limit: number;
    query_by?: string;
    query_value?: string;
    sort_by?: string;
    order?: 'ASC' | 'DESC';
}

