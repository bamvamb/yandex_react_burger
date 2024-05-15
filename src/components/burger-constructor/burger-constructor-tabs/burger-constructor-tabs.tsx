import {Dispatch, SetStateAction} from 'react'
import "./burger-constructor-tabs.css"
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

interface Props {
    ingridient_types: Array<string>;
    currentIngridientType?: string;
    setCurrentIngridientType?: Dispatch<SetStateAction<string|undefined>>;
}

const BurgerConstructorTabs: React.FC<Props>  = ({ingridient_types, currentIngridientType, setCurrentIngridientType}) => (
    <div className="constructor-tabs">
        <div className="constructor-tabs-container">
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

export default BurgerConstructorTabs