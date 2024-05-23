import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './item-price.module.css'

interface Props {
    price: number
}

const ItemPrice: React.FC<Props>  = ({price}) => (
    <span className={styles.item_price}>
        {price}
        <CurrencyIcon type="primary"/>
    </span>
)

export default ItemPrice