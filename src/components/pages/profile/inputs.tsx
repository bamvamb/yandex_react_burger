import { useEffect, useMemo } from 'react';
import { useGetProfileQuery, usePatchProfileMutation } from '../../../services/apis/auth';
import styles from './inputs.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setKeyValue, setKeyError, InputsNames } from '../../../services/slices/profileInputs';
import { RootStoreState } from '../../../services/store';
import ProfileInput from './Input';
import { check_email_value, check_text_value } from '../../../share/input_check';

const Inputs = () => {
    const dispatch = useDispatch()
    const inputsState = useSelector((state:RootStoreState) => state.profileInputs)
    const { name, password, email } = inputsState.values
    const {data, isLoading, isSuccess, isError} = useGetProfileQuery()

    const [patchProfile,{
        data:patchData, 
        isSuccess:patchSuccess, 
        isError:patchError, 
        isLoading:patchLoading
      }] = usePatchProfileMutation()

    const handleChangeValue = (key:InputsNames, value:string) => {
        dispatch(setKeyValue({key,value}))
        const check_fn = key === "email" ? check_email_value : check_text_value
        if(check_fn(value)){
            if(inputsState.errors[key]){
                dispatch(setKeyError({key,value:false}))
            }
        } else {
            dispatch(setKeyError({key,value:true}))
        }
    }

    const onIconClick = (key:InputsNames) => {
        const value = inputsState.values[key]
        if(data?.user && !patchLoading && !inputsState.errors[key]){
            const patchData = {
                ...data.user,
                [key]: value
            }
            patchProfile(patchData)
        } else {
            dispatch(setKeyError({key, value: true}))
        }
    }

    useEffect(() => {
        if(isSuccess){
            dispatch(setKeyValue({key: "name", value: data.user.name}))
            dispatch(setKeyValue({key: "email", value: data.user.email}))
        }
    }, [isSuccess])

    useEffect(() => {
        if(patchSuccess && patchData){
            console.log({patchData})
            dispatch(setKeyValue({key: "name", value: patchData.user.name}))
            dispatch(setKeyValue({key: "email", value: patchData.user.email}))
        }
    }, [patchSuccess])

    const inputs_data:{
        name: InputsNames,
        type: "text" | "email" | "password" | undefined,
        value: string,
        placeholder: string
    }[] = useMemo(() =>[
        {
            name: "name",
            value: name,
            type: "text",
            placeholder: "имя"
        },
        {
            name: "email",
            value: email,
            type: "email",
            placeholder: "email"
        },
        {
            name: "password",
            value: password,
            type: "password",
            placeholder: "пароль"
        },
    ], [name, email, password])

    if(isLoading) return <div>Данные о пользователе загружаются...</div>
    if(isError) return <div>Ошибка получения данных о пользователе</div>

    return data ? <div className={styles.inputs_container}>
        {
            inputs_data.map( input => (
                <ProfileInput 
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    value={input.value}
                    placeholder={input.placeholder}
                    setValue={ (key, value) => handleChangeValue(key, value)}
                    onIconClick={key => onIconClick(key)}
                    disabled={patchLoading}
                    error={inputsState.errors[input.name]}
                />
            ))
        }
        {
            patchError && <div className={styles.error}>
                Произошла ошибка обновления данных пользователя
            </div>
        }
    </div> : null
}

export default Inputs