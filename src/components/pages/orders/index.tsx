import styles from './index.module.css';
import Links from "../../profile/links";
import Orders from "./orders";

const OrdersPage = () => {
    return (
        <div className={styles.container}>
            <Links/>
            <Orders/>
        </div>
    )
}

export default OrdersPage