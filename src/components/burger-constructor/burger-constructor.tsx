
import ItemPrice from "../share/item-price/item-price"
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor.module.css'
import { useSelector } from "react-redux"
import { RootState } from "../../services/store"
import { selectPrice } from "../../services/selectors/burger"

interface Props {
    onOrder: ()=>void
}

const BurgerConstructor: React.FC<Props> = ({onOrder}) => {
    const {bun, core} = useSelector((store:RootState) => store.burger)
    const price = useSelector(selectPrice)

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
            <Button onClick={() => onOrder()} htmlType="submit" type="primary">Оформить заказ</Button>
        </div>
    </div>
}

export default BurgerConstructor