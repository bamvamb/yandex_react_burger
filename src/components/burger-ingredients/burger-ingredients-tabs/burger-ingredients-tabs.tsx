import {Dispatch, SetStateAction} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients-tabs.module.css"

interface Props {
    ingredient_types: Array<string>;
    currentIngredientType?: string;
    setCurrentIngredientType?: Dispatch<SetStateAction<string|undefined>>;
}

const BurgerIngredientsTabs: React.FC<Props>  = ({ingredient_types, currentIngredientType, setCurrentIngredientType}) => (
    <div className={styles.ingredients_tabs}>
        <div className={styles.ingredients_tabs_container}>
        {
            ingredient_types.map( itype => (
                <Tab 
                    key={itype} 
                    value={itype}
                    active={itype === currentIngredientType}
                    onClick={() => setCurrentIngredientType ? setCurrentIngredientType(itype) : {}}
                >
                    {itype}
                </Tab>
            ))
        }
        </div>
    </div>
)

export default BurgerIngredientsTabs