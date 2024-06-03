import React from 'react'

import { useSelector } from 'react-redux';
import {RootState} from '../../../services/store';
import { useDispatch } from 'react-redux';
import { clear } from '../../../services/slices/ingredient';

import { Ingredient } from '../../../share/typing';
import BurgerIngredientsListItem from './burger-ingredients-list-item';

import style from "./burger-ingredients-list.module.css"
import Modal from '../../share/modal/modal';
import IngridientDetail from '../ingredient-details/ingredient-details';

interface Props {
    ingredients: Array<Ingredient>;
    type: string
}

const BurgerIngredientsList: React.FC<Props> = ({ingredients, type}) => {
    const dispatch = useDispatch()
    const clickedIngredient = useSelector((state:RootState) => state.ingredient.ingredient)

    const onModalClose = () => dispatch(clear())

    return <div className={style.burger_ingredients_list_container}>
        <h1 className={style.burger_ingredients_list_header}>{type}</h1>
        <ul className={style.burger_ingredients_list}>
            { 
                ingredients.map( (ingredient,idx) => (
                    <BurgerIngredientsListItem 
                        key={`${ingredient._id}`} 
                        ingredient={ingredient} 
                        count={idx%3 === 1 ? 1 : 0}
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