import AuthTemplate, {FormState} from '../../auth-template/auth-template';
import { useForgotPasswordMutation } from '../../../services/apis/auth';
import { Navigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [forgotPassword,{data:response, error, isSuccess, isError, isLoading}] = useForgotPasswordMutation()
  
  const handleForgotPassword = (data:FormState) => {
    const {email} = data
    if(email){
      forgotPassword({ email})
    }
  }

  if(isSuccess) {
    return <Navigate to="/reset-password"/>
  }
  
  return <AuthTemplate 
    variant="forgot-password" 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    handleSendRequest={handleForgotPassword}
  />
}

export default ForgotPasswordPage;
