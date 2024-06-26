import AuthTemplate, {FormState} from '../../auth-template/auth-template';
import { useForgotPasswordMutation } from '../../../services/apis/auth';
import { Navigate, useLocation, } from 'react-router-dom';

function ForgotPasswordPage() {
  const [forgotPassword,{data:response, error, isSuccess, isError, isLoading}] = useForgotPasswordMutation()
  const locaton = useLocation()
  
  const handleForgotPassword = (data:FormState) => {
    const {email} = data
    if(email){
      forgotPassword({ email})
    }
  }

  if(isSuccess) {
    return <Navigate to="/reset-password" state={{ from: locaton.pathname }} replace={true}/>
  }
  
  return <AuthTemplate 
    variant="forgot-password" 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    handleSendRequest={handleForgotPassword}
  />
}

export default ForgotPasswordPage;
