import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './links.module.css'
import { useLogOutMutation } from '../../../services/apis/auth';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unauthorized } from '../../../services/slices/user';

const Links = () => {
    const dispatch = useDispatch()
    const [logOut, {isSuccess:logoutSuccess, isLoading:logoutLoading}] = useLogOutMutation()
    const current_path = window.location.pathname;
    const [link, setLink] = useState<string>(current_path)

    const handleLogout = () => {
        setLink(current_path)
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

 
    useEffect(() => {
        if(logoutSuccess){
            window.location.reload()
        }
    },[logoutSuccess])

    if(logoutLoading){
        return <div>Разлогиниваемся...</div>
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