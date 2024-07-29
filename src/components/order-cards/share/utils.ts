import { TOrderStatus } from "../../../services/apis/orders/types";
import { IIngredient } from "../../../share/typing";
import { IIngredientWCount, IIngredientsData } from "./types";
import statusStyles from './status.module.css'

export const statusLocAndStyle: {
    [key in TOrderStatus]: {
        title: string,
        className: string
    }
} = {
    created: {
        title: "Создан",
        className: statusStyles.status_created
    },
    pending: {
        title: "В работе",
        className: statusStyles.status_pending
    },
    done: {
        title: "Готов",
        className: statusStyles.status_done
    }
}


export const getOrderData = (ingredient_ids:string[], allIngredients:IIngredient[], totalDisplayed?:number):IIngredientsData => {
    const res:IIngredientsData = {
        ingredients: [],
        price: 0,
        hidden: 0
    }

    //обходим список ингредиентов
    ingredient_ids.forEach( iid => {

        //находим ингредиент по id (он должен быть если данные с апи не побились)
        const _ingredient = allIngredients.find( ingredient => ingredient._id === iid)
        if(_ingredient){

            //обновлям общую цену
            res.price += _ingredient.price

            //ищем не существует ли уже ингредиент в списке результатов
            const resIngredient = res.ingredients.find( ingr => ingr._id === iid)

            //если ингредиент уже существует - используем его, либо расширяем найденный в списке всех ингредиентов обьект счетчиком
            const ingredient: IIngredientWCount = resIngredient ? resIngredient : {..._ingredient, count: 1}

            //если ингредиента в финальном списке нет
            if( !resIngredient ) {
                if( !totalDisplayed || res.ingredients.length < totalDisplayed ){

                    //если нет ограничения по выводу, или длинна текущего списка не превышает его - добавляем для отрисовки
                    res.ingredients.push(ingredient)
                } else {
                    
                    //в противном случае - считаем количество скрытых
                    res.hidden += 1
                }
            }
        }
    })
    return res
}