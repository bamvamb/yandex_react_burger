import React, { useState } from 'react'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils'

import styles from './app-header-link.module.css'

interface Props {
    Icon: React.ComponentType<TIconProps>
    text: String
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const AppHeaderLink: React.FC<Props> = ({ text, Icon, onClick }) => {
    const [mouseIn, setMouseIn] = useState(false)
    return (
        <a
            href="#"
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
        </a>
    )
}

export default AppHeaderLink
