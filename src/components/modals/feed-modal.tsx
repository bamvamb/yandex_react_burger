import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useGetFeedQuery } from "../../services/apis/orders/orders";
import Modal from "../share/modal/modal";
import OrderCard from "../order-cards/full";
import { useGetIngredientsQuery } from "../../services/apis/ingredients/ingredients";
import Loader from "../share/loader/loader";
import ErrorView from "../share/error/error";

const OrderModal = () => {
    const location = useLocation()
    const { number } = useParams();
    const backgroundLocation = location.state?.backgroundLocation as Location
    const navigate = useNavigate()
    const { data:order, isLoading } = useGetFeedQuery({order_number:number})
    const {data: ingredients, isLoading: ingredientsLoading} = useGetIngredientsQuery()
    
    const onModalClose = () => {
        navigate(backgroundLocation, {replace: true})
    }

    return ingredients ? (
        <Modal 
            isOpen={true} 
            onClose={onModalClose}
            headerTitle='Детали заказа'
        >
            {isLoading || ingredientsLoading ? <Loader text="Загружаю данные..."/> : (
                order && ingredients ? <OrderCard link="/feed/" order={order} ingredients={ingredients}/> : (
                    !order ? <ErrorView text="Заказа не существует"/> : <ErrorView text="Ошибка загрузки списка ингридиентов"/>
                )
            )}
        </Modal>
    ) : null
}

  export default OrderModal