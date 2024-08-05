import { useMemo } from "react"
import styles from "./full.module.css"
import { ICardProps, IIngredientsData } from "./share/types"
import { getOrderData } from "./share/utils"
import IngredientCircle from "./share/ingredient-circle"
import ItemPrice from "../share/item-price/item-price"
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { statusLocAndStyle } from "./share/utils"

const Full:React.FC<ICardProps> = ({
    order,
    ingredients:allIngredients
}) => {
    const {ingredients: ingredient_ids, number, createdAt, name, status} = order
    const {ingredients, price} = useMemo<IIngredientsData>(() => getOrderData(ingredient_ids, allIngredients), [order])
    const {title: statusTitle, className:statusClassName} = statusLocAndStyle[status]
    
    return <div className={styles.container}>
        <div className={styles.number}>#{number}</div>
        <div className={styles.name}>{name}</div>
        <div className={statusClassName}>{statusTitle}</div>
        <div className={styles.title}>Состав:</div>
        <div className={styles.ingredients_container}>
        {
            ingredients.map( ingredient => (
                <div className={styles.ingredient_container} key={ingredient._id}>
                    <IngredientCircle {...ingredient}/>
                    <span className={styles.ingredient_name}>{ingredient.name}</span>
                    <ItemPrice count={ingredient.count} price={ingredient.price}/>
                </div>
            ))
        }
        </div>
        <div className={styles.footer}>
            <FormattedDate className={styles.created} date={new Date(createdAt)}/>
            <ItemPrice price={price}/>
        </div>
    </div>
}

export default Full