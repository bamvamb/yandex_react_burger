import styles from "./statistics.module.css"
import { IGetOrdersResponse, IOrder } from "../../../services/apis/orders/types"
import { useMemo } from "react"

const Statistics:React.FC<IGetOrdersResponse> = ({orders, success, total, totalToday}) => {
    
    const {ready, on_process} = useMemo(() => orders.reduce<{ready: IOrder[], on_process:IOrder[]}>((prev, cur) => {
        if(cur.status === "done"){
            prev.ready.push(cur)
        } else {
            prev.on_process.push(cur) 
        }
        return prev
    },{ready:[], on_process:[]}), [orders])

    return <div className={styles.container}>
        <div className={styles.orders_list}>
            <div className={styles.orders_column}>
                <span className={styles.orders_column_title}>Готовы:</span>
                {ready.slice(0, 5).map( order => <span key={order._id}>{order.number}</span>)}
            </div>
            <div className={styles.orders_column}>
                <span className={styles.orders_column_title}>В работе:</span>
                {on_process.slice(0, 5).map( order => <span key={order._id}>{order.number}</span>)}
            </div>
        </div>
        <div className={styles.stat}>
            <span className={styles.stat_title}>
                Выполнено за все время:
            </span>
            <span className={styles.stat_value}>
                {total}
            </span>
        </div>
        <div className={styles.stat}>
            <span className={styles.stat_title}>
                Выполнено за сегодня:
            </span>
            <span className={styles.stat_value}>
                {totalToday}
            </span>
        </div>
    </div>
}

export default Statistics