import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./small.module.css"
import { ICardProps } from "./share/types"
import ItemPrice from "../share/item-price/item-price"
import IngredientCircle from "./share/ingredient-circle"
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { getOrderData } from "./share/utils"
import { IIngredientsData } from "./share/types"
import { statusLocAndStyle } from "./share/utils"

const Small:React.FC<ICardProps> = ({
    order,
    ingredients:all_ingredients,
    showStatus,
    link
}) => {
    const {ingredients: ingredient_ids, number, createdAt, name, status} = order
    const navigate = useNavigate()
    const location = useLocation()
    const {ingredients, price, hidden} = useMemo<IIngredientsData>(() => getOrderData(ingredient_ids, all_ingredients, 6), [order])
    const {title: statusTitle, className:statusClassName} = statusLocAndStyle[status]

    const onClick = () => {
        navigate(`${link}${order.number}`, {state: { backgroundLocation: location}})
    }

    return (
        <div onClick={onClick} className={styles.container}>
        <div className={styles.title_div}>
            <div className={styles.order_id}>#{number}</div>
            <div className={styles.created}>
                <FormattedDate date={new Date(createdAt)}/>
            </div>
        </div>
        <div>
            <h4 className={styles.name}>{name}</h4>
            {showStatus && <div className={`${styles.status} ${statusClassName}`}>{statusTitle}</div>}
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
    )
}

export default Small