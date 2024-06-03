
import { Ingredient } from "../../share/typing"
import ItemPrice from "../share/item-price/item-price"
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './burger-constructor.module.css'
import { useMemo } from "react"

interface Props {
    burger: Array<Ingredient>
    onOrder: ()=>void
}

const BurgerConstructor: React.FC<Props> = ({burger, onOrder}) => {
    const price = useMemo( () =>
        burger.reduce( (accumulator, currentValue) => {
            return accumulator + currentValue.price
        }, 0 as number), 
    [burger] )

    return <div className={styles.burger_constructor}>
        {
            burger.length > 0 ? (
                <>
            <BurgerConstructorItem
                drag={false}
                ingredient={burger[0]}
                type="top"
            />
            <div className={styles.burger_constructor_list}>
                {
                    burger.slice(1, burger.length-2).map( (ingredient, index) => (
                        <BurgerConstructorItem 
                            key={`${index}`}
                            ingredient={ingredient} 
                            drag={ true }
                        />
                    ))
                }
            </div>
            <BurgerConstructorItem
                drag={false}
                ingredient={burger[burger.length -1]}
                type="bottom"
            />
            </>
            ) : null
        }
        <div className={styles.burger_constructor_order}>
            <ItemPrice price={price}/>
            <Button onClick={() => onOrder()} htmlType="submit" type="primary">Оформить заказ</Button>
        </div>
    </div>
}

export default BurgerConstructor