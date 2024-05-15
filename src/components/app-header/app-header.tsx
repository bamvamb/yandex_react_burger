import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppLink from './app-header-components/app-link'
import "./app-header.css"

const AppHeader = () => {
    return <div className="header p-4">
        <div className='link-group'>
            <AppLink text="Конструктор" Icon={BurgerIcon}/>
            <AppLink text="Лента заказов" Icon={ListIcon}/>   
        </div>  
        <Logo/>
        <AppLink text="Личный кабинет" Icon={ProfileIcon}/>
    </div>
}

export default AppHeader