import React, { useState } from 'react'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'

import styles from './app-header-link.module.css'
import { Link } from 'react-router-dom'

interface Props {
    Icon: React.ComponentType<TIconProps>
    text: String,
    url?: string
}

const AppHeaderLink: React.FC<Props> = ({ text, Icon, url }) => {
    const [mouseIn, setMouseIn] = useState(false)
    return (
        <Link
            to={url ? url: "#"}
            onMouseLeave={() => {
                setMouseIn(false)
            }}
            onMouseEnter={() => {
                setMouseIn(true)
            }}
            className={styles.link}
        >
            <Icon type={mouseIn ? 'primary' : 'secondary'} />
            <span className={`text ${mouseIn ? '' : 'text_color_inactive'}`}>
                {text}
            </span>
        </Link>
    )
}

export default AppHeaderLink
