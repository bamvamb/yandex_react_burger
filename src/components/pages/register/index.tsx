import AuthTemplate, {FormState} from '../../auth-template/auth-template';
import { useRegisterUserMutation } from '../../../services/apis/auth';

function RegisterPage() {
  const [registerUser,{data:response, error, isSuccess, isError, isLoading}] = useRegisterUserMutation()

  const handleRegisterClick = (data:FormState) => {
    const {name, email, password} = data
    if(name && email && password){
      registerUser({ name, email, password })
    }
  }

  return <AuthTemplate 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    variant="register" 
    handleSendRequest={handleRegisterClick}
  />
}

export default RegisterPage;
