import { Link, useNavigate } from 'react-router-dom';
import styles from './links.module.css'
import { useLogOutMutation } from '../../../services/apis/auth';
import { useMemo } from 'react';

const Links = () => {
    const [logOut, {isSuccess:logoutSuccess, isLoading:logoutLoading}] = useLogOutMutation()
    const navigate = useNavigate()

    const handleLogout = () => {
        logOut({})
    }

    const current_path = window.location.pathname;

    const links:{
        text:string,
        link?:string,
        onClick?:React.MouseEventHandler<HTMLAnchorElement>,
        active?:boolean
    }[] = useMemo(() => [
        {
            link: "/profile",
            text: "Профиль",
            active: current_path === "/profile"
        },
        {
            link: "/profile/orders/:number",
            text: "История заказов",
            active: current_path === "/profile/orders/:number"
        },
        {
            onClick: handleLogout,
            text: "Выход"
        }
    ], [current_path])

    if(logoutLoading){
        return <div>Разлогиниваемся...</div>
    }

    if(logoutSuccess){
        navigate("/login")
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
    </div>
}

export default Links