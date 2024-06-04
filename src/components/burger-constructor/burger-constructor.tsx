
import ItemPrice from "../share/item-price/item-price"
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor.module.css'
import { useDispatch, useSelector } from "react-redux"
import { RootStoreState } from "../../services/store"
import { selectPrice } from "../../services/selectors/burger"
import { useCreateOrderMutation } from "../../services/api"
import Modal from "../share/modal/modal"
import OrderDetails from "../order-details/order-details"
import { useState } from "react"
import { clear } from "../../services/slices/burger"


const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const {bun, core} = useSelector((store:RootStoreState) => store.burger)
    const price = useSelector(selectPrice)
    const [createOrder,{data:order, isSuccess, isError, isLoading}] = useCreateOrderMutation()
    const [showOrder, setShowOrder] = useState(false)
    
    if(isLoading && !showOrder){
        setShowOrder(true)
    }

    const onOrderModalClose = () => {
        dispatch(clear())
        setShowOrder(false)
    }

    const onOrder = async () => {
        const ingreident_ids = core.reduce( 
            (accumulator, currentValue) => [...accumulator, currentValue._id], 
            (bun ? [bun._id, bun._id] : [])
          )
        createOrder(ingreident_ids)
    }

    return <div className={styles.burger_constructor}>
        <BurgerConstructorItem
            drag={false}
            ingredient={bun}
            type="top"
        />
        <div className={styles.burger_constructor_list}>
            {
                core.length === 0 ? <BurgerConstructorItem ingredient={null}/> : (
                core.map( (ingredient, index) => (
                    <BurgerConstructorItem 
                        key={`${index}`}
                        ingredient={ingredient} 
                        drag={ true }
                    />
                ))
                )
            }
        </div>
        <BurgerConstructorItem
            drag={false}
            ingredient={bun}
            type="bottom"
        />
        <div className={styles.burger_constructor_order}>
            <ItemPrice price={price}/>
            <Button disabled={price === 0} onClick={() => onOrder()} htmlType="submit" type="primary">Оформить заказ</Button>
        </div>
        <Modal 
              header_title='Статус заказа'
              isOpen={showOrder}
              onClose={onOrderModalClose}
            >
            <OrderDetails {...{order, isSuccess, isError, isLoading}}/>
        </Modal>
    </div>
}

export default BurgerConstructor