import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './item-price.css'

interface Props {
    price: number
}

const ItemPrice: React.FC<Props>  = ({price}) => (
    <span className="item-price text text_type_digits-default">
        {price}
        <CurrencyIcon type="primary"/>
    </span>
)

export default ItemPrice