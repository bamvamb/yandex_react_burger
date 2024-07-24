import { IOrder } from "../../services/apis/orders/types";
import { IIngredient } from "../../share/typing";

export interface ICardProps {
    order: IOrder,
    ingredients: IIngredient[]
}