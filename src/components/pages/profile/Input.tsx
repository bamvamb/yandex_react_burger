import { useEffect, useState } from "react"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { TInputsNames, setHasChange, setKeyValue } from "../../../services/slices/profileForm"
import { useDispatch, useSelector } from "react-redux"
import { RootStoreState } from "../../../services/store"

interface IProps {
    type?: "text" | "email" | "password" | undefined,
    placeholder: string,
    name: TInputsNames
}
const inputErrorMessage = "недопустимое значение"

const ProfileInput:React.FC<IProps> = ({type, placeholder, name}) => {
    const dispatch = useDispatch()
    const {value, error, changed} = useSelector((state:RootStoreState) => state.profileForm[name])
    const [disabled, setDisabled] = useState<boolean>(true)

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setKeyValue({key: name, value: ev.target.value}))
        dispatch(setHasChange({key: name, value: true}))
    }

    useEffect(() => {
        if(!changed && !disabled){
            setDisabled( true )
        }
    }, [changed])

    return <Input 
        type={type}
        name={name}
        error={error}
        errorText={error ? inputErrorMessage : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onIconClick={() => setDisabled(false)}
        disabled={disabled}
        icon={disabled ? "EditIcon" : undefined}
        onPointerEnterCapture={()=>{}}
        onPointerLeaveCapture={()=>{}}
    ></Input>   
}

export default ProfileInput