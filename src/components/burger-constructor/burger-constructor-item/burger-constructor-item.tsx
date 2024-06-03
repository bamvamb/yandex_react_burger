import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Ingredient } from '../../../share/typing'
import styles from './burger-constructor-item.module.css'

interface Props {
    ingredient: Ingredient | null
    type?: 'top' | 'bottom'
    drag?: Boolean
}

const BurgerConstructorItem: React.FC<Props> = ({ ingredient, type, drag }) => {
    return (
        <div
            className={
                drag ? 
                styles.burger_constructor_ingredient_allowed_drag : 
                styles.burger_constructor_ingredient
            }
        >
            {drag ? <DragIcon type="primary" /> : <div />}
            {
                ingredient ? (
                    <ConstructorElement
                        text={ingredient.name}
                        type={type}
                        isLocked={ingredient.type === 'bun'}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                ) : (
                    <ConstructorElement
                        text={""}
                        price={0}
                        thumbnail={""}
                    />
                )
            }
        </div>
    )
}

export default BurgerConstructorItem
