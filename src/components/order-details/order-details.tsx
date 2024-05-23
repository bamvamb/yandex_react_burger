import React from 'react'
import styles from "./order-details.module.css"
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'

interface Props {
    _id: string,
    state: "in_process"|"somethin_else"
}

interface StateDescription {
    icon: React.ComponentType<TIconProps>,
    state: string,
    recomendation: string
}

interface StateDescriptions {
    [propName: string]: StateDescription
}

const state_props = {
    "in_process": {
        icon: CheckMarkIcon,
        state: "Ваш заказ начали готовить",
        recomendation: "Дождитесь готовности на орбитальной станции"
    }
} as StateDescriptions

const OrderDetails: React.FC<Props>  = ({_id, state}) => {
    
    const Icon = state_props[state].icon

    return <div className={styles.order_details}>
        <h1 className={styles.order_id}>{_id}</h1>
        <p className={styles.title}>идентификатор заказа</p>
        <p className={styles.state_icon}>
            <Icon type="primary"/>
        </p>
        <span className={styles.state}>{state_props[state].state}</span>
        <span className={styles.recomendation}>{state_props[state].recomendation}</span>
    </div>
}

export default OrderDetails