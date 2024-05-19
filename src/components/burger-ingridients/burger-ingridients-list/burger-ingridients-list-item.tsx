import React from 'react'
import {  Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { DataFrame } from '../../../share/api';
import ItemPrice from '../../../share/item-price/item-price';

import styles from "./burger-ingridients-list-item.module.css"

interface Props {
    ingridient: DataFrame;
    count: number
}

const BurgerIngridientsListItem: React.FC<Props>  = ({ingridient, count}) => {
    return (
        <div className={styles.ingridients_list_item}>
            { count && count > 0 ? <Counter count={count}/> : null}
            <img 
                src={ingridient.image} 
                alt={ingridient.name}
            />
            <ItemPrice price={ingridient.price}/>
            <span 
                className={styles.ingridients_list_item_name}
            >{ingridient.name}</span>
        </div>
    )
}

export default BurgerIngridientsListItem