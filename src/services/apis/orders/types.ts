import { ISODateString } from '../../../share/typing'
import { IResponse } from '../../../share/typing'

export interface IOrder {
    ingredients: string[],
    _id: string,
    "status": "created"|"pending"|"done",
    "number": number,
    "createdAt": ISODateString,
    "updatedAt": ISODateString
}
  
export interface IGetOrdersResponse extends IResponse {
    orders: IOrder[],
    total: number,
    totalToday: number
}