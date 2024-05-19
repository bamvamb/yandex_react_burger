
import { DataFrame } from "../../share/api"
import ItemPrice from "../../share/item-price/item-price"
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor.module.css'

interface Props {
    burger: Array<DataFrame>
}

const BurgerConstructor: React.FC<Props> = ({burger}) => {
    const price = burger.reduce( (accumulator, currentValue) => {
        return accumulator + currentValue.price
    }, 0 as number)

    return <div className={styles.burger_constructor}>
        {
            burger.length > 0 ? (
                <>
            <BurgerConstructorItem
                drag={false}
                ingridient={burger[0]}
                type="top"
            />
            <div className={styles.burger_constructor_list}>
                {
                    burger.slice(1, burger.length-2).map( (ingridient, index) => (
                        <BurgerConstructorItem 
                            key={`bci_${index}`}
                            ingridient={ingridient} 
                            drag={ true }
                        />
                    ))
                }
            </div>
            <BurgerConstructorItem
                drag={false}
                ingridient={burger[burger.length -1]}
                type="bottom"
            />
            </>
            ) : null
        }
        <div className={styles.burger_constructor_order}>
            <ItemPrice price={price}/>
            <Button htmlType="submit" type="primary">Оформить заказ</Button>
        </div>
    </div>
}

export default BurgerConstructor