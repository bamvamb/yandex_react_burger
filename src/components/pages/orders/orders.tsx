import { useGetOrdersQuery } from "../../../services/apis/orders/orders"
import Loader from "../../share/loader/loader";
import ErrorView from "../../share/error/error";
import styles from './orders.module.css';
import OrdersList from "../../orders/orders/orders";

const Orders = () => {
    const { data, error, isLoading } = useGetOrdersQuery();

    if(isLoading){
        return <Loader text="Загружаем очередь..."/>
    }

    if(error){
        return <ErrorView text={`Ошибка получения данных очереди: ${error}`}/>
    }

    return data ? (
        <div className={styles.container}>
            <OrdersList link="/profile/orders/" showStatus={true} {...data}/>
        </div>
    ) : null
}

export default Orders