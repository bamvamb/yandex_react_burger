import React from 'react'
import {  Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '../../../share/typing';
import ItemPrice from '../../share/item-price/item-price';
import { useDrag } from "react-dnd";

import styles from "./burger-ingredients-list-item.module.css"
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
    ingredient: Ingredient;
    count: number
}

const BurgerIngredientsListItem: React.FC<Props>  = ({ingredient, count}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [, dragRef] = useDrag({
        type: ingredient.type,
        item: {ingredient},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const onClick = () => { 
        navigate(`/ingredients/${ingredient._id}`, {state: { backgroundLocation: location}})
    }

    return (
        <li ref={dragRef} onClick={onClick} className={styles.ingredients_list_item}>
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