import { useMemo } from "react"
import styles from "./small.module.css"
import { ICardProps } from "./types"
import { IIngredient } from "../../share/typing"
import ItemPrice from "../share/item-price/item-price"
import IngredientCircle from "./ingredient-circle"
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
interface IIngredientsData {
    ingredients: IIngredient[], 
    price: number,
    hidden: number
}

const Small:React.FC<ICardProps> = ({
    order,
    ingredients:all_ingredients
}) => {
    const {ingredients: ingredient_ids, number, createdAt, name} = order
    const {ingredients, price, hidden} = useMemo<IIngredientsData>(() => {
        const total_displayed_ingredients = 6;
        const res:IIngredientsData = {
            ingredients: [],
            price: 0,
            hidden: 0
        }

        ingredient_ids.forEach( iid => {
            const ingredient = all_ingredients.find( ingredient => ingredient._id === iid) as IIngredient
            res.price += ingredient.price
            if( !res.ingredients.find( ingr => ingr._id === iid)) {
                if( res.ingredients.length < total_displayed_ingredients){
                        res.ingredients.push(ingredient)
                } else {
                    res.hidden += 1
                }
            }
        })
        return res
    }, [order])

    return <div className={styles.container}>
        <div className={styles.title_div}>
            <div className={styles.order_id}>#{number}</div>
            <div className={styles.created}>
                <FormattedDate date={new Date(createdAt)}/>
            </div>
        </div>
        <div>
            <h4 className={styles.name}>{name}</h4>
        </div>
        <div className={styles.ingredients_div}>
            <div className={styles.ingredients_list}>
                {ingredients.map( (ingredient,idx) => (
                    <div className={styles.ingredient_container} key={`${idx}_${ingredient._id}`}>
                        <IngredientCircle imgText={idx === ingredients.length -1 && hidden > 0 ? `+${hidden}` : undefined} {...ingredient}/>
                    </div>
                ))}
            </div>
            <ItemPrice price={price}/>
        </div>
    </div>
}

export default Small