import { IResponse } from "../../../share/typing"

export interface IUserResponse extends IResponse {
    user: {
      email: string,
      name: string
    }
}
  
export interface IResponseMessage extends IResponse {
    message: string
}
  
export interface IResponseAuthMessage extends IUserResponse {
    accessToken: string,
    refreshToken: string
}