export interface IUserState {
    authorized: boolean,
    loading: boolean,
    error: boolean,
    name?: string|undefined,
    email?: string|undefined
}
