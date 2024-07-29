import {lsStorage} from '../share/browser-storage';
import { IResponseAuthMessage } from './apis/auth/types';

export const lsUserKeys = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
    username: "username",
    email: "email"
}

export const getLSUserInfo: () => {
    name: string;
    email: string;
    } | undefined = () => {
        const name = lsStorage.get(lsUserKeys.username)
        const email = lsStorage.get(lsUserKeys.email)
    if(name && email){
      return {name, email}
    }
}

export const getLSTokens = ():{accessToken: string|null, refreshToken: string|null} => (
    {
        accessToken: lsStorage.get(lsUserKeys.accessToken),
        refreshToken: lsStorage.get(lsUserKeys.refreshToken)
    }
)

export const refreshTokensInStorage = (accessToken: string, refreshToken: string):void => {
    lsStorage.set(lsUserKeys.accessToken, accessToken.split("Bearer ")[1])
    lsStorage.set(lsUserKeys.refreshToken, refreshToken)
}
  
export const setUserInStorage = ({user, accessToken, refreshToken}:IResponseAuthMessage):void => {
    lsStorage.set(lsUserKeys.email, user.email)
    lsStorage.set(lsUserKeys.username, user.name)
    refreshTokensInStorage(accessToken, refreshToken)
}
  
export const deleteUserFromStorage = ():void => Object.keys(lsUserKeys).forEach( key => lsStorage.delete(key))