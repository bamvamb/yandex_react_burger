import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-template.module.css';
import { useState } from 'react';
import { Variants, authTemplateVariants, Inputs } from './auth-template-variants';
import { Link } from 'react-router-dom';
import { check_email_value, check_text_value } from '../../share/input_check';
import { ResponseMessage } from '../../services/apis/auth';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { getErrorMessage as getErrorMsg } from '../../services/apis/auth';
import ErrorView from '../share/error/error';

interface Props {
    variant: Variants,
    handleSendRequest?: (fs:FormState) => void,
    requestState?: {
        response: ResponseMessage|undefined,
        isSuccess: boolean,
        isError: boolean,
        isLoading: boolean,
        error: FetchBaseQueryError|SerializedError|undefined
    }
}

export interface FormState {
    name: string|null,
    password: string|null,
    email: string|null,
    code: string|null
}

export interface FormStateError {
    name: boolean,
    password: boolean,
    email: boolean,
    code: boolean
}

const getInitialState = (variant: Variants):FormState => ({
    name: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "name") ? "" : null,
    password: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "password") ? "" : null,
    email: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "email") ? "" : null,
    code: authTemplateVariants[variant].inputs.find( inp_dict => inp_dict.name === "code") ? "" : null
})

const input_error_message = "недопустимое значение"
const request_error_message = "Произошла ошибка при обработке запроса - попробуйте снова позже. Если ошибка повторится обратитесь к администратору"

const AuthTemplate:React.FC<Props> = ({variant, handleSendRequest, requestState}) => {
    const initialState = getInitialState(variant)
    const [state, setState] = useState<FormState>(initialState)
    const [checkState, setCheckState] = useState<FormStateError>({
        name: false,
        password: false,
        email: false,
        code: false
    })

    let inputs_names: (keyof FormState)[] = Object.keys(initialState) as any;
    inputs_names = inputs_names.filter( key => initialState[key] === "")

    const request_error = requestState?.isError || requestState?.response?.success === false
    
    const getErrorMessage = () => {
        if(requestState?.isError){
            const err_message = getErrorMsg(requestState.error)
            return err_message ? err_message : request_error_message
        }
        return null
    }

    const setVal = (key:Inputs, val:string) => {
        setState({...state, [key]: val})
        if(checkState[key]){ setCheckState({...checkState, [key]: false})}
    }

    const checkInputs = () => {
        const new_check_state = {...checkState}
        let fin_error = false
        inputs_names.forEach( input_name => {
            const check = input_name === "email" ? check_email_value : check_text_value
            const error = !check(state[input_name])
            new_check_state[input_name] = error
            if(error) { fin_error = error }
        })
        setCheckState(new_check_state)
        return !fin_error
    }

    const onButtonClick = () => { 
        if(handleSendRequest && checkInputs()){
            handleSendRequest(state)
        }
    }

    const template = authTemplateVariants[variant]
    return (
        <form className={styles.content}>
            <h1 className={styles.body_header}>{template.title}</h1>
            {
                template.inputs.map( input_data => {
                    return <Input 
                        key={input_data.name}
                        type={input_data.type}
                        error={checkState[input_data.name]}
                        errorText={checkState[input_data.name] ? input_error_message : undefined}
                        value={state[input_data.name] as string}
                        onChange={ev => setVal(input_data.name, ev.target.value)}
                        placeholder={input_data.placeholder}
                        name={input_data.name}
                        onPointerEnterCapture={()=>{console.log('enter')}}
                        onPointerLeaveCapture={()=>{console.log('leave')}}
                    ></Input>
                })
            }
            <Button 
                disabled={requestState?.isLoading} 
                onClick={onButtonClick} 
                htmlType="button"
            >
                {template.button}
            </Button>
            {request_error && <ErrorView text={getErrorMessage()}/>}
            <div className={styles.footer}>
            {
                template.footer.map( (footer, idx) => (
                    <span className={styles.footer_line} key={idx}>
                        {footer.text} <Link to={footer.link}>{footer.link_text}</Link>
                    </span>
                ))
            }
            </div>
        </form>
    );
}


export default AuthTemplate