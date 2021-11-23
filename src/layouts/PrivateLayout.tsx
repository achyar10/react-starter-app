import { Redirect, Route } from "react-router-dom";
import { localStorageUtil } from "../utils";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useAuthStore } from "../stores";

export interface IPayload {
    user_id: number,
    fullname: string,
    role: string,
    exp: number
}


const PrivateLayout = (props: any) => {
    const auth = useAuthStore()

    const checkAuth = (): boolean => {
        if (auth.user) {
            const token: string = auth.user.access_token
            const decoded: IPayload = jwtDecode(token);
            const exp = moment.unix(decoded.exp)
            if (moment().isBefore(exp)) return true;
            localStorageUtil.remove('auth')
            return false
        }
        return false
    }
    
    if (auth.user === null) {
        localStorageUtil.remove('auth')
    }

    if (!localStorageUtil.get('auth')) {
        return (<Redirect to="/auth/login" />)
    } else {
        const isAuth = checkAuth();
        if (!isAuth) return (<Redirect to="/auth/login" />)
        return (<Route {...props} />);
    }

}

export default PrivateLayout