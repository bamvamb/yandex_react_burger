import React from 'react'
import { DataFrame } from '../../../share/api';
import BurgerIngridientsListItem from './burger-ingridients-list-item';

import "./burger-ingridients-list.css"

interface Props {
    ingridients: Array<DataFrame>;
    type: string
}

const BurgerIngridientsList: React.FC<Props> = ({ingridients, type}) => (
    <div className="burger-ingridients-list-container p-12">
        <h1 className="burger-ingridients-list-header text text_type_main-medium p-6">{type}</h1>
        <ul className="burger-ingridients-list p-4">
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