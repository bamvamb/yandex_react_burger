import { useGetFeedsQuery } from "../../../services/apis/orders/feeds/feeds"
import Statistics from "../../orders/statistics/statistics";
import Loader from "../../share/loader/loader";
import ErrorView from "../../share/error/error";
import styles from './index.module.css';
import OrdersList from "../../orders/orders/orders";

const Orders = () => {
    const { data, error, isLoading } = useGetFeedsQuery();

    if(isLoading){
        return <Loader text="Загружаем очередь..."/>
    }

    if(error){
        return <ErrorView text={`Ошибка получения данных очереди: ${error}`}/>
    }

    return (
        <div className={styles.container}>
            <span className={styles.title}>Лента заказов</span>
            { 
                data && <div className={styles.grid}>
                    <OrdersList {...data}/>
                    <Statistics {...data}/>
                </div> 
            }
        </div>
    )
}

export default Orders