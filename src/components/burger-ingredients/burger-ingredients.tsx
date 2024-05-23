import {useState} from 'react'
import BurgerIngredientsTabs from "./burger-ingredients-tabs/burger-ingredients-tabs"
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list"
import { Ingredient } from "../../share/api"

import styles from "./burger-ingredients.module.css"

interface Props {
    ingredients: Array<Ingredient>
}

const getIngredientType = (ingredient: Ingredient) => {
    return ingredient.type_loc_many ? ingredient.type_loc_many : ingredient.type
}

const BurgerIngredients: React.FC<Props> = ({ingredients}) => {

    const [currentIngredientType, setCurrentIngredientType] = useState<string>()
    
    const ingredient_types = ingredients.reduce((accumulator, currentValue) => {
        const new_type = getIngredientType(currentValue)
        if(!accumulator.includes( new_type )){
            accumulator.push(new_type)
        }
        return accumulator
    }, [] as Array<string>)

    return <div className={styles.burger_ingredients}>
        <BurgerIngredientsTabs
            ingredient_types={ingredient_types}
            currentIngredientType={currentIngredientType}
            setCurrentIngredientType={setCurrentIngredientType}
        />
        <div className={styles.burger_ingredients_container}>
        {
            ingredient_types.map( ingredient_type => (
                <BurgerIngredientsList 
                    key={ingredient_type}
                    type={ingredient_type}
                    ingredients={  ingredients.filter( ingredient => getIngredientType(ingredient) === ingredient_type) } 
                />
            ))
        }
        </div>

    </div>
}

export default BurgerIngredients