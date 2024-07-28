import { useGetOrdersQuery } from "../../../services/apis/orders/orders"
import Loader from "../../share/loader/loader";
import ErrorView from "../../share/error/error";
import styles from './orders.module.css';
import OrdersList from "../../orders/orders/orders";
import { useEffect } from "react";

const Orders = () => {
    const { data, error, isLoading, refetch } = useGetOrdersQuery();

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(isLoading || data?.loading){
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