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
    
    let body = null;
    if( isLoading || ingredientsLoading ) body = <Loader text="Загружаю данные..."/>
    else if (!order) {
        body = <ErrorView text="Заказа не существует"/>
    } else if(ingredients) {
        body = <OrderCard link="/feeds/" order={order} ingredients={ingredients}/>
    }

    return ingredients ? (
        <Modal 
            isOpen={true} 
            onClose={onModalClose}
            headerTitle='Детали заказа'
        >
            {body}
        </Modal>
    ) : null
}

  export default OrderModal