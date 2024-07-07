import { IIngredient } from '../../share/typing';
import styles from "./ingredient-details.module.css"

interface IProps {
    ingredient?: IIngredient;
}

const IngredientDetail: React.FC<IProps>  = ({ingredient}) => {
    const pfc = ingredient ? [
        {
            name: "Каллории",
            digit: "ккал",
            value: ingredient.calories
        },
        {
            name: "Белки",
            digit: "г",
            value: ingredient.proteins
        },
        {
            name: "Жиры",
            digit: "г",
            value: ingredient.fat
        },
        {
            name: "Углеводы",
            digit: "г",
            value: ingredient.carbohydrates
        }
    ] : []    
    
    return ingredient ? (
        <div className={styles.ingredients_detail}>
            <img 
                src={ingredient.image_large} 
                alt={ingredient.name}
            />
            <h1 className={styles.ingredient_name}>{ingredient.name}</h1>
            { ingredient.description && <p className={styles.ingredient_description}>{ingredient.description}</p> }
            <ul className={styles.ingredient_pfc_container}>
                {
                    pfc.map( object => (
                        <li className={styles.ingredient_pfc_object} key={object.name}>
                            <span>{`${object.name}, ${object.digit}`}</span>
                            <span className={styles.ingredient_pfc_value}>{object.value}</span>
                        </li>
                    ))
                }
                
            </ul>
        </div>
    ) : null
}

export default IngredientDetail