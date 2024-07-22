import { useEffect } from "react";
import { useGetOrdersQuery } from "../../../services/apis/orders/orders"
import Statistics from "../../orders/statistics/statistics";
import Loader from "../../share/loader/loader";
import ErrorView from "../../share/error/error";

const Orders = () => {
    const { data, error, isLoading } = useGetOrdersQuery();

    useEffect(() => {
        console.log(data)
    }, [data])

    if(isLoading){
        return <Loader text="Загружаем очередь..."/>
    }

    if(error){
        return <ErrorView text={`Ошибка получения данных очереди: ${error}`}/>
    }

    return <div>
        { data && <Statistics {...data}/>}
    </div>
}

export default Orders