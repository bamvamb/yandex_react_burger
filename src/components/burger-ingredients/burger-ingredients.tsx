import {useRef} from 'react'
import BurgerIngredientsTabs from "./burger-ingredients-tabs/burger-ingredients-tabs"
import BurgerIngredientsList from "./burger-ingredients-list/burger-ingredients-list"

import styles from "./burger-ingredients.module.css"
import { setContainerScrollTop } from '../../services/slices/tabs'
import { useAppDispatch, useAppSelector } from '../../services/hooks'
import { useGetIngredientsQuery } from '../../services/apis/data'
import { selectIngredientTypes } from '../../services/selectors/ingredients'
import Loader from '../share/loader/loader'
import ErrorView from '../share/error/error'

const BurgerIngredients = () => {
    const dispatch = useAppDispatch()
    const { error, isLoading } = useGetIngredientsQuery()
    const ingredientTypes = useAppSelector(selectIngredientTypes)

    const ref = useRef<HTMLDivElement>(null)
    
    if (isLoading) {
        return <Loader text="Загрузка..."/>;
    }

    if (error) {
        if ('message' in error) {
            return <ErrorView text={`Ошибка получения данных об ингредиентах: ${error.message}`}/>;
        } else if('error' in error) {
            return <ErrorView text={`Ошибка получения данных об ингредиентах: ${error.error}`}/>;
        } else {
            return <ErrorView text="Ошибка получения данных об ингредиентах"/>
        }
    }
    
    const onScroll = (ev:React.UIEvent<HTMLDivElement, UIEvent>) => {
        dispatch(setContainerScrollTop(ev.currentTarget.scrollTop))
    }

    return <div className={styles.burger_ingredients}>
        <BurgerIngredientsTabs
            ingredientTypes={ingredientTypes}
            listRef={ref}
        />
        <div ref={ref} onScroll={onScroll} className={styles.burger_ingredients_container}>
        {
            ingredientTypes.map( ingredientType => (
                <BurgerIngredientsList 
                    key={ingredientType}
                    type={ingredientType}
                />
            ))
        }
        </div>

    </div>
}

export default BurgerIngredients