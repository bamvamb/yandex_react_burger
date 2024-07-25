import { IIngredient } from "../../../share/typing";
import { IIngredientWCount, IIngredientsData } from "./types";

export const getOrderData = (ingredient_ids:string[], allIngredients:IIngredient[], totalDisplayed?:number):IIngredientsData => {
    const res:IIngredientsData = {
        ingredients: [],
        price: 0,
        hidden: 0
    }

    ingredient_ids.forEach( iid => {
        const _ingredient = allIngredients.find( ingredient => ingredient._id === iid) as IIngredient
        const ingredient: IIngredientWCount = {..._ingredient, count: 1}
        res.price += ingredient.price
        const resIngredient = res.ingredients.find( ingr => ingr._id === iid)
        if( !resIngredient ) {
            if( !totalDisplayed || res.ingredients.length < totalDisplayed ){
                res.ingredients.push(ingredient)
            } else {
                res.hidden += 1
            }
        } else {
            resIngredient.count += 1
        }
    })
    return res
}