import { RefObject} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingredients-tabs.module.css"
import { selectCurrentType } from '../../../services/selectors/tabs';
import { useSelector } from 'react-redux';
import { RootStoreState } from '../../../services/store';

interface Props {
    ingredient_types: Array<string>;
    list_ref: RefObject<HTMLDivElement>;
}

const BurgerIngredientsTabs: React.FC<Props>  = ({ingredient_types, list_ref}) => {
    const currentTops = useSelector((state: RootStoreState) => state.tabs.elements_top)
    const currentType = useSelector(selectCurrentType)

    const handleClick = (itype:string) => {
        console.log(currentTops[itype])
        if(list_ref.current){
            list_ref.current.scrollTo({
                top: currentTops[itype],
                behavior: "smooth",
            })
        }
    }

    return <div className={styles.ingredients_tabs}>
        <div className={styles.ingredients_tabs_container}>
        {
            ingredient_types.map( itype => (
                <Tab 
                    key={itype} 
                    value={itype}
                    active={itype === currentType}
                    onClick={handleClick}
                >
                    {itype}
                </Tab>
            ))
        }
        </div>
    </div>
}

export default BurgerIngredientsTabs