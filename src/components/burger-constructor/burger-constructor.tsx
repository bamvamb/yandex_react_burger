
import { DataFrame } from "../../share/api"
import ItemPrice from "../../share/item-price/item-price"
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item"
import { Button } from "@ya.praktikum/react-developer-burger-ui-components"
import './burger-constructor.css'

interface Props {
    burger: Array<DataFrame>
}

const BurgerConstructor: React.FC<Props> = ({burger}) => {
    const price = burger.reduce( (accumulator, currentValue) => {
        return accumulator + currentValue.price
    }, 0 as number)

    return <div className="burger-constructor p-3">
        <ul className="burger-constructor-list">
            {
                burger.map( (ingridient, index) => (
                    <BurgerConstructorItem 
                        key={`bci_${index}`}
                        ingridient={ingridient} 
                        drag={ index !== 0 && index !== burger.length - 1 }
                        type={
                            index === 0 ? "top" : (
                                index === burger.length -1 ? "bottom" : undefined
                            )
                        }
                    />
                ))
            }
        </ul>
        <div className="burger-constructor-order p-3">
            <ItemPrice price={price}/><Button htmlType="submit" type="primary">Оформить заказ</Button>
        </div>
    </div>
}

export default BurgerConstructor