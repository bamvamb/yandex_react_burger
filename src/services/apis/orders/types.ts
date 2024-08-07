import { ISODateString } from '../../../share/typing'
import { IResponse } from '../../../share/typing'

export type TOrderStatus = "created"|"pending"|"done"

export interface IOrder {
    ingredients: string[],
    _id: string,
    status: TOrderStatus,
    number: number,
    createdAt: ISODateString,
    updatedAt: ISODateString,
    name: string
}
  
export interface IGetFeedsResponse extends IResponse {
    orders: IOrder[],
    total: number,
    totalToday: number,
    message?: string,
    loading?: boolean
}

export interface IGetOrderResponse extends IResponse {
    orders: IOrder[]
}