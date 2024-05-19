import {useState} from 'react'
import BurgerIngridientsTabs from "./burger-ingridients-tabs/burger-ingridients-tabs"
import BurgerIngridientsList from "./burger-ingridients-list/burger-ingridients-list"
import { DataFrame } from "../../share/api"

import styles from "./burger-ingridients.module.css"

interface Props {
    data: Array<DataFrame>
}

const getIngridientType = (ingridient: DataFrame) => {
    return ingridient.type_loc_many ? ingridient.type_loc_many : ingridient.type
}

const BurgerIngridients: React.FC<Props> = ({data}) => {

    const [currentIngridientType, setCurrentIngridientType] = useState<string>()
    
    const ingridient_types = data.reduce((accumulator, currentValue) => {
        const new_type = getIngridientType(currentValue)
        if(!accumulator.includes( new_type )){
            accumulator.push(new_type)
        }
        return accumulator
    }, [] as Array<string>)

    return <div className={styles.burger_ingridients}>
        <BurgerIngridientsTabs
            ingridient_types={ingridient_types}
            currentIngridientType={currentIngridientType}
            setCurrentIngridientType={setCurrentIngridientType}
        />
        <div className={styles.burger_ingridients_container}>
        {
            ingridient_types.map( ingridient_type => (
                <BurgerIngridientsList 
                    key={`bil_${ingridient_type}`}
                    type={ingridient_type}
                    ingridients={  data.filter( ingridient => getIngridientType(ingridient) === ingridient_type) } 
                />
            ))
        }
        </div>

    </div>
}

export default BurgerIngridients