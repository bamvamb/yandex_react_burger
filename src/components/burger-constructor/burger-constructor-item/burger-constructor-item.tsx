import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import { DataFrame } from "../../../share/api"
import './burger-constructor-item.css'

interface Props {
    ingridient: DataFrame,
    type?: "top"|"bottom"|undefined,
    drag: Boolean
}

const BurgerConstructorItem: React.FC<Props> = ({ingridient, type, drag}) => {
    return <li className="burger-constructor-ingridient">
        { drag ? <DragIcon type="primary"/> : <div/>}
        <ConstructorElement 
            text={ingridient.name} 
            type={type}
            isLocked={ingridient.type === "bun"}
            price={ingridient.price}
            thumbnail={ingridient.image}
        />
    </li>
}

export default BurgerConstructorItem