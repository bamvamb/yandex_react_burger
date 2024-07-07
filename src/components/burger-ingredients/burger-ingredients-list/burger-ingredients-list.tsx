import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import BurgerIngredientsListItem from './burger-ingredients-list-item';
import style from "./burger-ingredients-list.module.css"
import { selectIngridientsCount } from '../../../services/selectors/burger';
import { setElementPosition } from '../../../services/slices/tabs';
import { selectIngredientsByType } from '../../../services/selectors/ingredients';
import { typeLocalisation } from '../../../share/typing';

interface IProps {
    type: string
}

const BurgerIngredientsList: React.FC<IProps> = ({type}) => {
    const dispatch = useAppDispatch()
    const ingredentsCount = useAppSelector( selectIngridientsCount )
    const ingredients = useAppSelector( (state) => selectIngredientsByType(state, type) )
    const ref = useRef<HTMLDivElement|null>(null)
    const localisedType = typeLocalisation[type]?.many

    useEffect(() => {
        if(ref.current){
            dispatch(setElementPosition({type, top: ref.current.offsetTop }))
        }
    }, [])

    return <div ref={ref} className={style.burger_ingredients_list_container}>
        <h1 className={style.burger_ingredients_list_header}>{localisedType ? localisedType : type}</h1>
        <ul className={style.burger_ingredients_list}>
            { 
                ingredients.map( (ingredient) => (
                    <BurgerIngredientsListItem 
                        key={`${ingredient._id}`} 
                        ingredient={ingredient} 
                        count={ingredentsCount[ingredient._id]}
                    />
                ))
            }
        </ul>
    </div>
}

export default BurgerIngredientsList