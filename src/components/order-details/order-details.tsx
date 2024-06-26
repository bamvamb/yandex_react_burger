import styles from "./order-details.module.css"
import { CheckMarkIcon, CloseIcon, EditIcon, InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import { createOrderResponse } from '../../services/apis/data'

interface Props {
    order?: createOrderResponse, 
    isSuccess?:boolean, 
    isError?:boolean, 
    isLoading?:boolean
}

interface StateDescription {
    icon: React.ComponentType<TIconProps>,
    state: string,
    recomendation: string
}

interface StateDescriptions {
    [propName: string]: StateDescription
}

const stateProps = {
    "loading": {
        icon: EditIcon,
        state: "Ваш заказ принимается",
        recomendation: "Ожидайте"
    },
    "error": {
        icon: InfoIcon,
        state: "Произошла ошибка",
        recomendation: "Попробуйте отправить заказ снова"
    },
    "in_process": {
        icon: CheckMarkIcon,
        state: "Ваш заказ начали готовить",
        recomendation: "Дождитесь готовности на орбитальной станции"
    },
    "unknown": {
        icon: CloseIcon,
        state: "Неизвестно что произошло",
        recomendation: "Попробуйте немного подождать, или отправить заказ снова"
    }
} as StateDescriptions

const OrderDetails:React.FC<Props> = ({isLoading, isSuccess, isError, order}) => {
    const state = isLoading ? "loading" : (
        isError || !order?.success ? "error" : (
            isSuccess && order?.success ? "in_process" : "unknown"
        )
    )
    
    const Icon = stateProps[state].icon

    return <div className={styles.order_details}>
        <h1 className={styles.order_id}>{order?.order?.number.toString() ?? ""}</h1>
        <p className={styles.title}>идентификатор заказа</p>
        <p className={styles.state_icon}>
            <Icon type="primary"/>
        </p>
        <h1 className={styles.name}>{order?.name}</h1>
        <span className={styles.state}>{stateProps[state].state}</span>
        <span className={styles.recomendation}>{stateProps[state].recomendation}</span>
    </div>
}

export default OrderDetails