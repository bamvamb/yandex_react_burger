import React, {useState} from 'react'
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

import "./app-link.css"

interface Props {
    Icon: React.ComponentType<TIconProps>;
    text: String
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const AppLink : React.FC<Props> = ({text, Icon, onClick}) => {
    const [mouseIn, setMouseIn] = useState(false)
    return <div onClick={onClick} onMouseLeave={()=>{setMouseIn(false)}} onMouseEnter={()=>{setMouseIn(true)}} className='link p-8'>
        <Icon type={mouseIn ? "primary" : "secondary"}/>
        <span className={`text ${mouseIn ? "": "text_color_inactive"}`}>{text}</span>
    </div>
}

export default AppLink