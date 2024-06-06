import React, { useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import {RootStoreState} from '../../../services/store';
import { clear } from '../../../services/slices/ingredient';
import BurgerIngredientsListItem from './burger-ingredients-list-item';
import style from "./burger-ingredients-list.module.css"
import Modal from '../../share/modal/modal';
import IngridientDetail from '../ingredient-details/ingredient-details';
import { selectIngridientsCount } from '../../../services/selectors/burger';
import { setElementPosition } from '../../../services/slices/tabs';
import { selectIngredientsByType } from '../../../services/selectors/ingredients';
import { type_localisation } from '../../../share/typing';

interface Props {
    type: string
}

const BurgerIngredientsList: React.FC<Props> = ({type}) => {
    const dispatch = useDispatch()
    const ingredentsCount = useSelector( selectIngridientsCount )
    const ingredients = useSelector( (state:RootStoreState) => selectIngredientsByType(state, type) )
    const clickedIngredient = useSelector((state:RootStoreState) => state.ingredient.ingredient)
    const onModalClose = () => dispatch(clear())
    const ref = useRef<HTMLDivElement|null>(null)
    const localised_type = type_localisation[type]?.many

    useEffect(() => {
        if(ref.current){
            dispatch(setElementPosition({type, top: ref.current.offsetTop }))
        }
    }, [])

    return <div ref={ref} className={style.burger_ingredients_list_container}>
        <h1 className={style.burger_ingredients_list_header}>{localised_type ? localised_type : type}</h1>
        <ul className={style.burger_ingredients_list}>
            { 
                ingredients.map( (ingredient,idx) => (
                    <BurgerIngredientsListItem 
                        key={`${ingredient._id}`} 
                        ingredient={ingredient} 
                        count={ingredentsCount[ingredient._id]}
                    />
                ))
            }
        </ul>
        <Modal 
            isOpen={Boolean(clickedIngredient)} 
            onClose={onModalClose}
            header_title='Детали ингридиента'
            >
            <IngridientDetail ingredient={clickedIngredient ?? undefined}/>
        </Modal>
    </div>
}

export default BurgerIngredientsList