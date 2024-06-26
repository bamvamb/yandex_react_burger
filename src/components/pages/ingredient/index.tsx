import {useParams} from 'react-router-dom'
import { useIngredientDetailsQuery } from "../../../services/apis/data"
import IngredientDetail from '../../ingredient-details/ingredient-details';
import Loader from '../../share/loader/loader';
import ErrorView from '../../share/error/error';

const IngredientPage = () => {
    const { id } = useParams();
    const { data:ingredient, isLoading } = useIngredientDetailsQuery({ingredient_id:id})
    if( isLoading ) return <Loader text="Загружаю данные..."/>
    if (!ingredient) return <ErrorView text="Ингридиента не существует"/>
    return <IngredientDetail ingredient={ingredient}/>
}

export default IngredientPage