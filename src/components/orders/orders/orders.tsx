import styles from "./orders.module.css"
import { IGetFeedsResponse } from "../../../services/apis/orders/types"
import { useGetIngredientsQuery } from "../../../services/apis/ingredients/ingredients"
import Loader from "../../share/loader/loader"
import Card from "../../order-cards/small"

const Orders:React.FC<IGetFeedsResponse> = ({orders}) => {
    const { data:ingredients, isLoading } = useGetIngredientsQuery()
    if(isLoading ) return <Loader text="загружаем данные об заказах"/>
    return <div className={styles.container}>
        {ingredients && orders.map( order => <Card key={order._id} order={order} ingredients={ingredients}/>)}
    </div>
}

export default Orders