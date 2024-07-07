import { useEffect, useMemo } from 'react';
import { useGetProfileQuery, usePatchProfileMutation } from '../../../services/apis/auth';
import styles from './inputs.module.css'
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { setKeyValue, TInputsNames, clearForm } from '../../../services/slices/profileForm';
import ProfileInput from './Input';
import Loader from '../../share/loader/loader';
import ErrorView from '../../share/error/error';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfileForm = () => {
    const dispatch = useAppDispatch()
    const {data, isLoading, isSuccess, isError} = useGetProfileQuery()
    const { name, password, email } = useAppSelector(state => state.profileForm)

    const [patchProfile,{
        data:patchData, 
        isSuccess:patchSuccess, 
        isError:patchError, 
        isLoading:patchLoading
    }] = usePatchProfileMutation()

    useEffect(() => {
        if(isSuccess){
            dispatch(setKeyValue({key: "name", value: data.user.name}))
            dispatch(setKeyValue({key: "email", value: data.user.email}))
            dispatch(clearForm())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])


    useEffect(() => {
        if(patchSuccess && patchData){
            dispatch(setKeyValue({key: "name", value: patchData.user.name}))
            dispatch(setKeyValue({key: "email", value: patchData.user.email}))
            dispatch(clearForm())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patchSuccess])

    const inputsData = useMemo<{
        name: TInputsNames,
        type: "text" | "email" | "password" | undefined,
        placeholder: string
    }[]>(() =>[
        {
            name: "name",
            type: "text",
            placeholder: "имя"
        },
        {
            name: "email",
            type: "email",
            placeholder: "email"
        },
        {
            name: "password",
            type: "password",
            placeholder: "пароль"
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
    ], [name, email, password])

    const onCancelClick = () => {
        if(data?.user) {
            dispatch(setKeyValue({key: "name", value: data.user.name}))
            dispatch(setKeyValue({key: "email", value: data.user.email}))
            dispatch(setKeyValue({key: "password", value: ""}))
            dispatch(clearForm())
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(data?.user && !patchLoading){
            const patchData = {
                name: name.value,
                email: email.value,
                password: password.value
            }
            patchProfile(patchData)
        }
    }

    if(isLoading) return <Loader text="Данные о пользователе загружаются..."/>
    if(isError) return <ErrorView text="Ошибка получения данных о пользователе"/>

    const hasChanges = email.changed || password.changed || name.changed

    return data ? <form onSubmit={onSubmit} className={styles.inputs_container}>
        {
            inputsData.map( input => (
                <ProfileInput 
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                />
            ))
        }
        {
            patchError && <ErrorView text="Произошла ошибка обновления данных пользователя"/>
        }
        {
            hasChanges && (
                <div className={styles.btns_container}>
                    <Button onClick={onCancelClick} htmlType='button'>Отменить</Button>
                    <Button htmlType='submit'>Сохранить</Button>
                </div>
            )
        }
    </form> : null
}

export default ProfileForm