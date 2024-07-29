import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './item-price.module.css'

interface IProps {
    price: number,
    count?: number
}

const ItemPrice: React.FC<IProps>  = ({price, count}) => (
    <span className={styles.item_price}>
        {count && `${count} x `}{price}
        <CurrencyIcon type="primary"/>
    </span>
)

export default ItemPrice