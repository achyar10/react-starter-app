import { BaseResponse, instance } from '../instances';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse extends BaseResponse {
    data: {
        user_id: number;
        fullname: string;
        role: string;
        access_token: string;
    };
}

export const login = (payload: LoginPayload): Promise<LoginResponse> => instance.post('/auth/login', payload, { auth: payload }).then((response) => response.data);