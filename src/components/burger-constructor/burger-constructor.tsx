
import { useState, useEffect } from "react"
import ItemPrice from "../share/item-price/item-price"
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor.module.css'
import { useDispatch, useSelector } from "react-redux"
import { RootStoreState } from "../../services/store"
import { selectPrice } from "../../services/selectors/burger"
import { useCreateOrderMutation } from "../../services/apis/data"
import Modal from "../share/modal/modal"
import OrderDetails from "../order-details/order-details"
import { useDrop } from "react-dnd";
import { clear, createRandom } from "../../services/slices/burger"
import { useGetIngredientsQuery } from "../../services/apis/data"
import { selectIngredientTypes } from "../../services/selectors/ingredients"
import { useLocation, useNavigate } from "react-router-dom"


const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const {bun, core} = useSelector((store:RootStoreState) => store.burger)
    const { data:ingredients } = useGetIngredientsQuery()
    const types = useSelector(selectIngredientTypes)
    const authorized = useSelector((store:RootStoreState) => store.user.authorized)
    const navigate = useNavigate()
    const location = useLocation();

    const [{isHover}, dropTarget] = useDrop({
        accept: types.filter( type => type !== 'bun'),
        collect: monitor => ({
            isHover: monitor.isOver(),
            handlerId: monitor.getHandlerId()
        })
    });


    const price = useSelector(selectPrice)
    const [createOrder,{data:order, isSuccess, isError, isLoading}] = useCreateOrderMutation()
    const [showOrder, setShowOrder] = useState(false)
    
    const handleClear = () => {
        dispatch(clear())
    }

    const handleGenRandom = () => {
        if(ingredients){
            dispatch(createRandom(ingredients))
        }
    }

    if(isLoading && !showOrder){
        setShowOrder(true)
    }

    const onOrderModalClose = () => {
        handleClear()
        setShowOrder(false)
    }

    const onOrder = async () => {
        if(authorized){
            const ingreidentIds = core.reduce( 
                (accumulator, currentValue) => [...accumulator, currentValue._id], 
                (bun ? [bun._id, bun._id] : [])
            )
            createOrder(ingreidentIds)
        } else {
            navigate("/login", {state: {from: location}})
        }
    }

    return <div className={styles.burger_constructor}>
        <div className={styles.burger_constructor_order}>
            <Button onClick={handleClear} htmlType="submit" type="primary">Очистить</Button>
            <Button onClick={handleGenRandom} htmlType="submit" type="primary">Сделать случайный</Button>
        </div>
        <BurgerConstructorItem
            drag={false}
            ingredient={bun}
            type="top"
        />
        <div ref={dropTarget} className={isHover ? styles.burger_constructor_list_hover : styles.burger_constructor_list}>
            {
                core.length === 0 ? <BurgerConstructorItem ingredient={null}/> : (
                core.map( (ingredient, index) => (
                    <BurgerConstructorItem 
                        key={`${ingredient.uid}`}
                        ingredient={ingredient} 
                        index={ index }
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
            <Button disabled={!(Boolean(bun) && core.length > 0)} onClick={() => onOrder()} htmlType="submit" type="primary">Оформить заказ</Button>
        </div>
        <Modal 
              headerTitle='Статус заказа'
              isOpen={showOrder}
              onClose={onOrderModalClose}
            >
            <OrderDetails {...{order, isSuccess, isError, isLoading}}/>
        </Modal>
    </div>
}

export default BurgerConstructor