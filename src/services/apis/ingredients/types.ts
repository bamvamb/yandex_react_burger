import { IResponse, IIngredient } from "../../../share/typing"

export interface IGetIngredientsResponse extends IResponse {
    data: IIngredient[]
}
  
export interface ICreateOrderResponse extends IResponse {
    name: string,
    order: {
      number: number
    }
}