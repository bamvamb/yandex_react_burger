import { useGetFeedsQuery } from "../../../services/apis/orders/orders"
import Statistics from "../../orders/statistics/statistics";
import Loader from "../../share/loader/loader";
import ErrorView from "../../share/error/error";
import styles from './index.module.css';
import OrdersList from "../../orders/orders/orders";
import { useEffect } from "react";

const Feeds = () => {
    const { data, error, isLoading, refetch } = useGetFeedsQuery();

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

    return (
        <div className={styles.container}>
            <span className={styles.title}>Лента заказов</span>
            { 
                data && <div className={styles.grid}>
                    <OrdersList link="/feed/" {...data}/>
                    <Statistics {...data}/>
                </div> 
            }
        </div>
    )
}

export default Feeds