import React, { useEffect, useState } from 'react'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'
import styles from './app-header-link.module.css'
import { Link, useLocation } from 'react-router-dom'

interface IProps {
    Icon: React.ComponentType<TIconProps>
    text: string,
    url?: string
}

const AppHeaderLink: React.FC<IProps> = ({ text, Icon, url }) => {
    const location = useLocation();
    const [mouseIn, setMouseIn] = useState<boolean>(false)
    const [selected, setSelected] = useState<boolean>(location.pathname === url);

    useEffect(() => {
        setSelected(location.pathname === url);
    }, [location, url]);

    return (
        <Link
            to={url ? url: "#"}
            onMouseLeave={() => {
                setMouseIn(false)
            }}
            onMouseEnter={() => {
                setMouseIn(true)
            }}
            className={selected ? styles.selected_link: styles.link}
        >
            <Icon type={mouseIn || selected ? 'primary' : 'secondary'} />
            <span>
                {text}
            </span>
        </Link>
    )
}

export default AppHeaderLink
