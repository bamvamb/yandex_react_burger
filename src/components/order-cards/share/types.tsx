import { IOrder } from "../../../services/apis/orders/types";
import { IIngredient } from "../../../share/typing";

export interface ICardProps {
    order: IOrder,
    ingredients: IIngredient[]
}

export interface IIngredientWCount extends IIngredient {
    count: number
}

export interface IIngredientsData {
    ingredients: IIngredientWCount[], 
    price: number,
    hidden: number
}