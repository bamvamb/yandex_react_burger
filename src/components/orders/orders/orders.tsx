import styles from "./orders.module.css"
import { IGetFeedsResponse } from "../../../services/apis/orders/types"
import { useGetIngredientsQuery } from "../../../services/apis/ingredients/ingredients"
import Loader from "../../share/loader/loader"
import Card from "../../order-cards/small"
import ErrorView from "../../share/error/error"

interface IProps extends IGetFeedsResponse {
    link: string,
    showStatus?: boolean
}

const Orders:React.FC<IProps> = ({orders, showStatus, link, message, success}) => {
    const { data:ingredients, isLoading } = useGetIngredientsQuery()
    if(isLoading ) return <Loader text="загружаем данные об заказах"/>
    if(!success) return <ErrorView text={`Произошла ошибка при загрузке заказов ${message ? message : ""}`}/>
    return <div className={styles.container}>
        {ingredients && orders.map( order => <Card key={order._id} {...{order, ingredients, showStatus, link}}/>)}
    </div>
}

export default Orders