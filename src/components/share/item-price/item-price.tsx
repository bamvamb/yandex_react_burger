import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './item-price.module.css'

interface IProps {
    price: number
}

const ItemPrice: React.FC<IProps>  = ({price}) => (
    <span className={styles.item_price}>
        {price}
        <CurrencyIcon type="primary"/>
    </span>
)

export default ItemPrice