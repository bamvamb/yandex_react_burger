import { 
    Logo, 
    BurgerIcon,
    ListIcon,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import AppHeaderLink from './app-header-link/app-header-link'
import style from "./app-header.module.css"

const AppHeader = () => {
    return <nav className={style.header}>
        <div className={style.link_group}>
            <AppHeaderLink text="Конструктор" Icon={BurgerIcon}/>
            <AppHeaderLink text="Лента заказов" Icon={ListIcon}/>   
        </div>  
        <Logo/>
        <AppHeaderLink text="Личный кабинет" Icon={ProfileIcon}/>
    </nav>
}

export default AppHeader