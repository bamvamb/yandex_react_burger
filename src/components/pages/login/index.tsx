import AuthTemplate, {FormState} from '../../auth-template/auth-template';
import { useLogInMutation } from '../../../services/apis/auth';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const [logIn, {data:response, error, isSuccess, isError, isLoading}] = useLogInMutation()

  const handleLogin = (data: FormState) => {
    const {email, password} = data
    if(email && password){
      logIn({ email, password })
    }
  }

  if(isSuccess){
    return <Navigate to="/"/>
  }

  return <AuthTemplate 
    variant="login" 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    handleSendRequest={handleLogin}
  />
}

export default LoginPage;
