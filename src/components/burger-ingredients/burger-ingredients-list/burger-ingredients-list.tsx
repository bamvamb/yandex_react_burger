import React, { useEffect, useRef } from 'react'

import { useSelector } from 'react-redux';
import {RootStoreState} from '../../../services/store';
import { useDispatch } from 'react-redux';
import { clear } from '../../../services/slices/ingredient';

import { Ingredient } from '../../../share/typing';
import BurgerIngredientsListItem from './burger-ingredients-list-item';

import style from "./burger-ingredients-list.module.css"
import Modal from '../../share/modal/modal';
import IngridientDetail from '../ingredient-details/ingredient-details';
import { selectIngridientsCount } from '../../../services/selectors/burger';
import { setElementPosition } from '../../../services/slices/tabs';

interface Props {
    ingredients: Array<Ingredient>;
    type: string;
}

const BurgerIngredientsList: React.FC<Props> = ({ingredients, type}) => {
    const dispatch = useDispatch()
    const ingredentsCount = useSelector( selectIngridientsCount )
    const clickedIngredient = useSelector((state:RootStoreState) => state.ingredient.ingredient)
    const onModalClose = () => dispatch(clear())
    const ref = useRef<HTMLDivElement|null>(null)

    useEffect(() => {
        if(ref.current){
            console.log({type, top: ref.current.offsetTop })
            console.log(ref.current.offsetParent?.scrollTop)
            dispatch(setElementPosition({type, top: ref.current.offsetTop }))
        }
    }, [])

    return <div ref={ref} className={style.burger_ingredients_list_container}>
        <h1 className={style.burger_ingredients_list_header}>{type}</h1>
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