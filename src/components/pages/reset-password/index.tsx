import AuthTemplate, {IFormState} from '../../auth-template/auth-template';
import { useResetPasswordMutation } from '../../../services/apis/auth/auth';

function ResetPasswordPage() {
  const [resetPassword,{
    data:response, 
    error, 
    isSuccess, 
    isError, 
    isLoading
  }] = useResetPasswordMutation()

  const handleResetPasswordClick = (data:IFormState) => {
    const {password, code:token} = data
    if(token && password){
      resetPassword({ token, password })
    }
  }

  return <AuthTemplate 
    variant="reset-password" 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    handleSendRequest={handleResetPasswordClick}
  />
}

export default ResetPasswordPage;
