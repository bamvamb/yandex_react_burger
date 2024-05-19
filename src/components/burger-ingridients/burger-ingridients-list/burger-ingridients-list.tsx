import React from 'react'
import { DataFrame } from '../../../share/api';
import BurgerIngridientsListItem from './burger-ingridients-list-item';

import style from "./burger-ingridients-list.module.css"

interface Props {
    ingridients: Array<DataFrame>;
    type: string
}

const BurgerIngridientsList: React.FC<Props> = ({ingridients, type}) => (
    <div className={style.burger_ingridients_list_container}>
        <h1 className={style.burger_ingridients_list_header}>{type}</h1>
        <ul className={style.burger_ingridients_list}>
            { 
                ingridients.map( (ingridient,idx) => (
                    <BurgerIngridientsListItem 
                        key={`bili_${ingridient._id}`} 
                        ingridient={ingridient} 
                        count={idx%3 === 1 ? 1 : 0}
                    />
                ))
            }
        </ul>
    </div>
)

export default BurgerIngridientsList