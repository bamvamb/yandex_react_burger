import { useEffect, useState } from "react"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { InputsNames, setHasChange, setKeyValue } from "../../../services/slices/profileForm"
import { useDispatch, useSelector } from "react-redux"
import { RootStoreState } from "../../../services/store"

interface Props {
    type?: "text" | "email" | "password" | undefined,
    placeholder: string,
    name: InputsNames
}
const input_error_message = "недопустимое значение"

const ProfileInput:React.FC<Props> = ({type, placeholder, name}) => {
    const dispatch = useDispatch()
    const {value, error, has_changed} = useSelector((state:RootStoreState) => state.profileForm[name])
    const [disabled, setDisabled] = useState<boolean>(true)

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setKeyValue({key: name, value: ev.target.value}))
        dispatch(setHasChange({key: name, value: true}))
    }

    useEffect(() => {
        if(!has_changed && !disabled){
            setDisabled( true )
        }
    }, [has_changed, disabled])

    return <Input 
        type={type}
        name={name}
        error={error}
        errorText={error ? input_error_message : undefined}
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