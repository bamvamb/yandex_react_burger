import AuthTemplate, {FormState} from '../../auth-template/auth-template';
import { useRegisterUserMutation } from '../../../services/apis/auth';
import { Navigate } from 'react-router-dom';

function RegisterPage() {
  const [registerUser,{data:response, error, isSuccess, isError, isLoading}] = useRegisterUserMutation()

  const handleRegisterClick = (data:FormState) => {
    const {name, email, password} = data
    if(name && email && password){
      registerUser({ name, email, password })
    }
  }

  if(isSuccess){
    return <Navigate to="/"/>
  }

  return <AuthTemplate 
    variant="register" 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    handleSendRequest={handleRegisterClick}
  />
}

export default RegisterPage;
