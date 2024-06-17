import { Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { InputsNames } from "../../../services/slices/profileInputs"

interface Props {
    type?: "text" | "email" | "password" | undefined,
    onIconClick: (key: InputsNames) => void,
    value: string,
    setValue: (key: InputsNames, value:string)=>void,
    placeholder: string,
    name: InputsNames,
    disabled: boolean,
    error: boolean
}
const input_error_message = "недопустимое значение"

const ProfileInput:React.FC<Props> = ({type, onIconClick, value, setValue, placeholder, name, disabled, error}) => {
    return <Input 
        type={type}
        name={name}
        error={error}
        errorText={error ? input_error_message : undefined}
        value={value}
        onChange={ev => setValue(name, ev.target.value)}
        placeholder={placeholder}
        onIconClick={() => onIconClick(name)}
        disabled={disabled}
        icon={error ? undefined : "EditIcon"}
        onPointerEnterCapture={()=>{}}
        onPointerLeaveCapture={()=>{}}
    ></Input>   
}

export default ProfileInput