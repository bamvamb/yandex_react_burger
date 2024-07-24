import styles from "./statistics.module.css"
import { IGetOrdersResponse, IOrder } from "../../../services/apis/orders/types"
import { useMemo } from "react"

const Statistics:React.FC<IGetOrdersResponse> = ({orders, total, totalToday}) => {
    
    const {ready, on_process} = useMemo(() => orders.reduce<{ready: IOrder[], on_process:IOrder[]}>((prev, cur) => {
        if(cur.status === "done"){
            prev.ready.push(cur)
        } else {
            prev.on_process.push(cur) 
        }
        return prev
    },{ready:[], on_process:[]}), [orders])

    return <div className={styles.container}>
        <div className={styles.orders_lists}>
            <div className={styles.orders_column}>
                <span className={styles.orders_column_title}>Готовы:</span>
                <ul className={styles.ready_list}>
                    {ready.slice(0, 5).map( order => (
                        <li className={styles.order} key={order._id}>{order.number}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.orders_column}>
                <span className={styles.orders_column_title}>В работе:</span>
                <ul className={styles.process_list}>
                    {on_process.slice(0, 5).map( order => (
                        <li className={styles.order} key={order._id}>{order.number}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className={styles.stat}>
            <h4 className={styles.stat_title}>
                Выполнено за все время:
            </h4>
            <span className={styles.stat_value}>
                {total}
            </span>
        </div>
        <div className={styles.stat}>
            <h4 className={styles.stat_title}>
                Выполнено за сегодня:
            </h4>
            <span className={styles.stat_value}>
                {totalToday}
            </span>
        </div>
    </div>
}

export default Statistics