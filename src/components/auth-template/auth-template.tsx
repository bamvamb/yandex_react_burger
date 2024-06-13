import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-template.module.css';
import { useState } from 'react';
import { Variants, authTemplateVariants, Inputs } from './auth-template-variants';
import { Link } from 'react-router-dom';

interface Props {
    variant: Variants,
    onButtonClick?: (fs:FormState) => void 
}

interface FormState {
    name: string|null,
    password: string|null,
    email: string|null,
    code: string|null
}

const getInitialState = (variant: Variants):FormState => ({
    name: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "name") ? "" : null,
    password: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "password") ? "" : null,
    email: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "email") ? "" : null,
    code: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "code") ? "" : null
})

const AuthTemplate:React.FC<Props> = ({variant, onButtonClick}) => {
    const [state, setState] = useState<FormState>(getInitialState(variant))
    const setVal = (key:Inputs, val:string) => {
        setState({...state, [key]: val})
    }

    const template = authTemplateVariants[variant]
    return (
        <div className={styles.content}>
            <h1 className={styles.body_header}>{template.title}</h1>
            {
                template.inputs.map( input_data => {
                    
                    return <Input 
                        key={input_data.name}
                        type={input_data.type}
                        value={state[input_data.name] as string}
                        onChange={ev => setVal(input_data.name, ev.target.value)}
                        placeholder={input_data.placeholder}
                        name={input_data.name}
                        onPointerEnterCapture={()=>{console.log('enter')}}
                        onPointerLeaveCapture={()=>{console.log('leave')}}
                    ></Input>
                })
            }
            <Button onClick={onButtonClick ? () => onButtonClick(state) : undefined} htmlType="button">{template.button}</Button>
            <div className={styles.footer}>
            {
                template.footer.map( (footer, idx) => (
                    <span className={styles.footer_line} key={idx}>
                        {footer.text} <Link to={footer.link}>{footer.link_text}</Link>
                    </span>
                ))
            }
            </div>
        </div>
    );
}


export default AuthTemplate