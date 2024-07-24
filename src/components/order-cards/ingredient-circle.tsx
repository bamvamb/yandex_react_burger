import { IIngredient } from '../../share/typing'
import styles from './ingredient-circle.module.css'

interface IProps extends IIngredient {
    imgText?: string
}

const IngredientCircle:React.FC<IProps>  = ({name, image, imgText}) => (
    <div className={styles.container}>
        <img className={styles.img}
            src={image} 
            alt={name}
        />
        {imgText && <div className={styles.img_text}><span>
            {imgText}
        </span></div>}
    </div>
)

export default IngredientCircle