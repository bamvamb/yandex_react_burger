import { Link } from 'react-router-dom';
import styles from './links.module.css'
import { useLogOutMutation } from '../../../services/apis/auth';
import { useEffect, useMemo } from 'react';
import Loader from '../../share/loader/loader';

const Links = () => {
    const [logOut, {isSuccess:logoutSuccess, isLoading:logoutLoading}] = useLogOutMutation()
    const currentPath = window.location.pathname;

    const handleLogout = () => {
        logOut({})
    }

    const links:{
        text:string,
        link?:string,
        onClick?:React.MouseEventHandler<HTMLAnchorElement>,
        active?:boolean
    }[] = useMemo(() => [
        {
            link: "/profile",
            text: "Профиль",
            active: currentPath === "/profile"
        },
        {
            link: "/profile/orders/:number",
            text: "История заказов",
            active: currentPath === "/profile/orders/:number"
        },
        {
            onClick: handleLogout,
            text: "Выход"
        }
    ], [currentPath])

 
    useEffect(() => {
        if(logoutSuccess){
            window.location.reload()
        }
    },[logoutSuccess])

    if(logoutLoading){
        return <Loader text="Разлогиниваемся..."/>
    }

    return <div className={styles.links_container}>
        <ul className={styles.links_ul}>
            {
                links.map( ({text, active, onClick, link}) => <li key={text}>
                    <Link 
                        className={active ? styles.selected_link: styles.link} 
                        to={link ? link: "#"} 
                        onClick={onClick}>
                        {text}
                    </Link>
                </li>)
            }
        </ul>
        <div className={styles.footer_text}>В этом разделе вы можете изменить свои персональные данные</div>
    </div>
}

export default Links