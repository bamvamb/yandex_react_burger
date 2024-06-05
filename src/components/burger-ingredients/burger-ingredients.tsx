import {useRef} from 'react'
import BurgerIngredientsTabs from "./burger-ingredients-tabs/burger-ingredients-tabs"
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list"
import { Ingredient } from "../../share/typing"

import styles from "./burger-ingredients.module.css"
import { setContainerScrollTop } from '../../services/slices/tabs'
import { useDispatch } from 'react-redux'

interface Props {
    ingredients: Array<Ingredient>
}

const getIngredientType = (ingredient: Ingredient) => {
    return ingredient.type_loc_many ? ingredient.type_loc_many : ingredient.type
}

const BurgerIngredients: React.FC<Props> = ({ingredients}) => {
    const dispatch = useDispatch()
    //const [currentIngredientType, setCurrentIngredientType] = useState<string>()
    const ref = useRef<HTMLDivElement>(null)

    const onScroll = (ev:React.UIEvent<HTMLDivElement, UIEvent>) => {
        dispatch(setContainerScrollTop(ev.currentTarget.scrollTop))
    }

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
            list_ref={ref}
        />
        <div ref={ref} onScroll={onScroll} className={styles.burger_ingredients_container}>
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