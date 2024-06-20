import React from 'react'
import {useParams} from 'react-router-dom'
import { useIngredientDetailsQuery } from "../../../services/apis/data"
import IngredientDetail from '../../ingredient-details/ingredient-details';

const IngredientPage = () => {
    const { id } = useParams();
    const { data:ingredient, isLoading } = useIngredientDetailsQuery({ingredient_id:id})
    if( isLoading ) return <div>Загружаю данные...</div>
    if (!ingredient) return <div>Ингридиента не существует</div>
    return <IngredientDetail ingredient={ingredient}/>
}

export default IngredientPage