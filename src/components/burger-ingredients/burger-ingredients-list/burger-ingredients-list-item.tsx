import React from 'react'
import {  Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '../../../share/api';
import ItemPrice from '../../../share/item-price/item-price';

import styles from "./burger-ingredients-list-item.module.css"

interface Props {
    ingredient: Ingredient;
    count: number
}

const BurgerIngredientsListItem: React.FC<Props>  = ({ingredient, count}) => {
    return (
        <li className={styles.ingredients_list_item}>
            { count && count > 0 ? <Counter count={count}/> : null}
            <img 
                src={ingredient.image} 
                alt={ingredient.name}
            />
            <ItemPrice price={ingredient.price}/>
            <span 
                className={styles.ingredients_list_item_name}
            >{ingredient.name}</span>
        </li>
    )
}

export default BurgerIngredientsListItem