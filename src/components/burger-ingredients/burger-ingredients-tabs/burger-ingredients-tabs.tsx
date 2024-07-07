import { RefObject} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients-tabs.module.css"
import { selectCurrentType } from '../../../services/selectors/tabs';
import { useAppSelector } from '../../../services/hooks';
import { typeLocalisation } from '../../../share/typing';

interface IProps {
    ingredientTypes: Array<string>;
    listRef: RefObject<HTMLDivElement>;
}

const BurgerIngredientsTabs: React.FC<IProps>  = ({ingredientTypes, listRef}) => {
    const currentTops = useAppSelector(state => state.tabs.elementsTop)
    const currentType = useAppSelector(selectCurrentType)

    const handleClick = (itype:string):void => {
        if(listRef.current){
            listRef.current.scrollTo({
                top: currentTops[itype],
                behavior: "smooth",
            })
        }
    }

    return <div className={styles.ingredients_tabs}>
        <div className={styles.ingredients_tabs_container}>
        {
            ingredientTypes.map( itype => (
                <Tab 
                    key={itype} 
                    value={itype}
                    active={itype === currentType}
                    onClick={handleClick}
                >
                    {typeLocalisation[itype] ? typeLocalisation[itype].many : itype}
                </Tab>
            ))
        }
        </div>
    </div>
}

export default BurgerIngredientsTabs