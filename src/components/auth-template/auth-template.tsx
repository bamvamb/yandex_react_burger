import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-template.module.css';
import { useState } from 'react';
import { Variants, authTemplateVariants, Inputs } from './auth-template-variants';
import { Link } from 'react-router-dom';
import { checkEmailValue, checkTextValue } from '../../share/input-check';
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
    name: authTemplateVariants[variant].inputs.find( inpDict => inpDict.name === "name") ? "" : null,
    password: authTemplateVariants[variant].inputs.find( inpDict => inpDict.name === "password") ? "" : null,
    email: authTemplateVariants[variant].inputs.find( inpDict => inpDict.name === "email") ? "" : null,
    code: authTemplateVariants[variant].inputs.find( inpDict => inpDict.name === "code") ? "" : null
})

const inputErrorMessage = "недопустимое значение"
const requestErrorMessage = "Произошла ошибка при обработке запроса - попробуйте снова позже. Если ошибка повторится обратитесь к администратору"

const AuthTemplate:React.FC<Props> = ({variant, handleSendRequest, requestState}) => {
    const initialState = getInitialState(variant)
    const [state, setState] = useState<FormState>(initialState)
    const [checkState, setCheckState] = useState<FormStateError>({
        name: false,
        password: false,
        email: false,
        code: false
    })

    let inputsNames: (keyof FormState)[] = Object.keys(initialState) as any;
    inputsNames = inputsNames.filter( key => initialState[key] === "")

    const requestError = requestState?.isError || requestState?.response?.success === false
    
    const getErrorMessage = () => {
        if(requestState?.isError){
            const errMessage = getErrorMsg(requestState.error)
            return errMessage ? errMessage : requestErrorMessage
        }
        return null
    }

    const setVal = (key:Inputs, val:string) => {
        setState({...state, [key]: val})
        if(checkState[key]){ setCheckState({...checkState, [key]: false})}
    }

    const checkInputs = () => {
        const newCheckState = {...checkState}
        let finError = false
        inputsNames.forEach( inputName => {
            const check = inputName === "email" ? checkEmailValue : checkTextValue
            const error = !check(state[inputName])
            newCheckState[inputName] = error
            if(error) { finError = error }
        })
        setCheckState(newCheckState)
        return !finError
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(handleSendRequest && checkInputs()){
            handleSendRequest(state)
        }
    }

    const template = authTemplateVariants[variant]
    return (
        <form onSubmit={onSubmit} className={styles.content}>
            <h1 className={styles.body_header}>{template.title}</h1>
            {
                template.inputs.map( inputData => {
                    return <Input 
                        key={inputData.name}
                        type={inputData.type}
                        error={checkState[inputData.name]}
                        errorText={checkState[inputData.name] ? inputErrorMessage : undefined}
                        value={state[inputData.name] as string}
                        onChange={ev => setVal(inputData.name, ev.target.value)}
                        placeholder={inputData.placeholder}
                        name={inputData.name}
                        onPointerEnterCapture={()=>{console.log('enter')}}
                        onPointerLeaveCapture={()=>{console.log('leave')}}
                    ></Input>
                })
            }
            <Button 
                disabled={requestState?.isLoading} 
                htmlType="submit"
            >
                {template.button}
            </Button>
            {requestError && <ErrorView text={getErrorMessage()}/>}
            <div className={styles.footer}>
            {
                template.footer.map( (footer, idx) => (
                    <span className={styles.footer_line} key={idx}>
                        {footer.text} <Link to={footer.link}>{footer.linkText}</Link>
                    </span>
                ))
            }
            </div>
        </form>
    );
}


export default AuthTemplate