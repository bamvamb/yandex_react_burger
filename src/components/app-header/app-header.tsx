import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeaderLink from './app-header-link/app-header-link'
import "./app-header.css"

const AppHeader = () => {
    return <nav className="header p-4 app-container-offset">
        <div className='link-group'>
            <AppHeaderLink text="Конструктор" Icon={BurgerIcon}/>
            <AppHeaderLink text="Лента заказов" Icon={ListIcon}/>   
        </div>  
        <Logo/>
        <AppHeaderLink text="Личный кабинет" Icon={ProfileIcon}/>
    </nav>
}

export default AppHeader