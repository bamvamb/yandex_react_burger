import {useParams} from 'react-router-dom'
import { useGetFeedQuery } from '../../../services/apis/orders/orders';
import Loader from '../../share/loader/loader';
import ErrorView from '../../share/error/error';
import OrderCard from '../../order-cards/full';
import { useGetIngredientsQuery } from '../../../services/apis/ingredients/ingredients';

const OrderPage = () => {
    const { number } = useParams();
    const { data:order, isLoading } = useGetFeedQuery({order_number:number})
    const {data: ingredients, isLoading: ingredientsLoading} = useGetIngredientsQuery()
    if( isLoading || ingredientsLoading ) return <Loader text="Загружаю данные..."/>
    if (!order) { 
        console.log("заказа не существует")
        return <ErrorView text="Заказа не существует"/>
    }
    return ingredients ? <OrderCard link="/order/" order={order} ingredients={ingredients}/> : null
}

export default OrderPage