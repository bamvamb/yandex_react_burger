import {Dispatch, SetStateAction} from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./burger-ingridients-tabs.module.css"

interface Props {
    ingridient_types: Array<string>;
    currentIngridientType?: string;
    setCurrentIngridientType?: Dispatch<SetStateAction<string|undefined>>;
}

const BurgerIngridientsTabs: React.FC<Props>  = ({ingridient_types, currentIngridientType, setCurrentIngridientType}) => (
    <div className={styles.ingridients_tabs}>
        <div className={styles.ingridients_tabs_container}>
        {
            ingridient_types.map( itype => (
                <Tab 
                    key={`ctb_${itype}`} 
                    value={itype}
                    active={itype === currentIngridientType}
                    onClick={() => setCurrentIngridientType ? setCurrentIngridientType(itype) : {}}
                >
                    {itype}
                </Tab>
            ))
        }
        </div>
    </div>
)

export default BurgerIngridientsTabs