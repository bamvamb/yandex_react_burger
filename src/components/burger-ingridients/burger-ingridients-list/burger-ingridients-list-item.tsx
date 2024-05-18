import React from 'react'
import {  Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { DataFrame } from '../../../share/api';
import ItemPrice from '../../../share/item-price/item-price';

import "./burger-ingridients-list-item.css"

interface Props {
    ingridient: DataFrame;
    count: number
}

const BurgerIngridientsListItem: React.FC<Props>  = ({ingridient, count}) => {
    return (
        <div className="ingridients-list-item p-3">
            { count && count > 0 ? <Counter count={count}/> : null}
            <img 
                className="ingridients-list-item-img" 
                src={ingridient.image} 
                alt={ingridient.name}
            />
            <ItemPrice price={ingridient.price}/>
            <span 
                className="ingridients-list-item-name text text_type_main-default"
            >{ingridient.name}</span>
        </div>
    )
}

export default BurgerIngridientsListItem