import {useState} from 'react'
import BurgerConstructorTabs from "./burger-constructor-tabs/burger-constructor-tabs"
import "./burger-constructor.css"
import { DataFrame, type_localisation } from "../../share/api"

interface Props {
    data: Array<DataFrame>
}

const BurgerConstructor: React.FC<Props> = ({data}) => {

    const [currentIngridientType, setCurrentIngridientType] = useState<string>()
    
    const ingridient_types = data.reduce((accumulator, currentValue) => {
        const new_type = currentValue.type_loc_many ? currentValue.type_loc_many : currentValue.type
        if(!accumulator.includes( new_type )){
            accumulator.push(new_type)
        }
        return accumulator
    }, [] as Array<string>)


    return <div className="burger-constructor">
        <BurgerConstructorTabs
            ingridient_types={ingridient_types}
            currentIngridientType={currentIngridientType}
            setCurrentIngridientType={setCurrentIngridientType}
        />
    </div>
}

export default BurgerConstructor