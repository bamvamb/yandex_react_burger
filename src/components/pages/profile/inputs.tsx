import { useEffect, useMemo } from 'react';
import { useGetProfileQuery, usePatchProfileMutation } from '../../../services/apis/auth';
import styles from './inputs.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { InputsState, setKey } from '../../../services/slices/profileInputs';
import { RootStoreState } from '../../../services/store';
import ProfileInput from './Input';

const Inputs = () => {
    const dispatch = useDispatch()
    const inputsState = useSelector((state:RootStoreState) => state.profileInputs)
    const { name, password, email } = inputsState
    const {data, isLoading, isSuccess, isError} = useGetProfileQuery()
    const [patchProfile,{
        data:patchData, 
        isSuccess:patchSuccess, 
        isError:patchError, 
        isLoading:patchLoading
      }] = usePatchProfileMutation()

    const handleChangeValue = (key:keyof InputsState, value:string) => {
        dispatch(setKey({key,value}))
    }

    const onIconClick = (key:keyof InputsState) => {
        if(data?.user && !patchLoading){
            const patchData = {
                ...data.user,
                [key]: inputsState[key]
            }
            patchProfile(patchData)
        }
    }

    useEffect(() => {
        if(isSuccess){
            dispatch(setKey({key: "name", value: data.user.name}))
            dispatch(setKey({key: "email", value: data.user.email}))
        }
    }, [isSuccess])

    useEffect(() => {
        if(patchSuccess && patchData){
            console.log({patchData})
            dispatch(setKey({key: "name", value: patchData.user.name}))
            dispatch(setKey({key: "email", value: patchData.user.email}))
        }
    }, [patchSuccess])

    const inputs_data:{
        name: keyof InputsState,
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
                ></ProfileInput>
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