import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { DataFrame } from '../../../share/api'
import styles from './burger-constructor-item.module.css'

interface Props {
    ingridient: DataFrame
    type?: 'top' | 'bottom' | undefined
    drag: Boolean
}

const BurgerConstructorItem: React.FC<Props> = ({ ingridient, type, drag }) => {
    return (
        <div
            className={styles.burger_constructor_ingridient}
            style={drag ? undefined : { cursor: 'pointer' }}
        >
            {drag ? <DragIcon type="primary" /> : <div />}
            <ConstructorElement
                text={ingridient.name}
                type={type}
                isLocked={ingridient.type === 'bun'}
                price={ingridient.price}
                thumbnail={ingridient.image}
            />
        </div>
    )
}

export default BurgerConstructorItem
