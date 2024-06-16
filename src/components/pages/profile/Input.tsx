import { Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { InputsState } from "../../../services/slices/profileInputs"

interface Props {
    type?: "text" | "email" | "password" | undefined,
    onIconClick: (key: keyof InputsState) => void,
    value: string,
    setValue: (key: keyof InputsState, value:string)=>void,
    placeholder: string,
    name: keyof InputsState,
    disabled: boolean
}

const ProfileInput:React.FC<Props> = ({type, onIconClick, value, setValue, placeholder, name, disabled}) => {
    return <Input 
        type={type}
        name={name}
        //error={checkState[input_data.name]}
        //errorText={checkState[input_data.name] ? input_error_message : undefined}
        value={value}
        onChange={ev => setValue(name, ev.target.value)}
        placeholder={placeholder}
        onIconClick={() => onIconClick(name)}
        disabled={disabled}
        icon={"EditIcon"}
        onPointerEnterCapture={()=>{}}
        onPointerLeaveCapture={()=>{}}
    ></Input>   
}

export default ProfileInput