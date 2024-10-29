import { IMessageResponse } from ".";

export interface ILoginResponse extends IMessageResponse {
    token: string
}


export interface ICreateAdminResponse extends IMessageResponse {
    userdata: {
        username: string,
        password: string,
        isAdmin: boolean
    }
}