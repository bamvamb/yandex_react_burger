import AuthTemplate, {IFormState} from '../../auth-template/auth-template';
import { getLSUserInfo, useRegisterUserMutation } from '../../../services/apis/auth';
import { Navigate } from 'react-router-dom';
import { authError, authStarted, authSuccess, unauthorized } from '../../../services/slices/user';
import { useAppDispatch } from '../../../services/hooks';
import { useEffect } from 'react';

function RegisterPage() {
  const dispatch = useAppDispatch()

  const [registerUser,{
      data:response, 
      error, 
      isSuccess, 
      isError, 
      isLoading
  }] = useRegisterUserMutation()

  const handleRegisterClick = (data:IFormState) => {
    const {name, email, password} = data
    if(name && email && password){
      registerUser({ name, email, password })
      dispatch(authStarted())
    }
  }

  useEffect(() => {
    const user = getLSUserInfo()
    if(user){
      dispatch(authSuccess(user))
    } else {
      dispatch(unauthorized())
    }
  }, [])

  useEffect(() => {
    const user = getLSUserInfo()
    if(user){
      dispatch(authSuccess(user))
    }
  }, [isSuccess])

  useEffect(() => {
    if(isError){
      dispatch(authError())
    }
  }, [isError])

  if(isSuccess){
    return <Navigate to="/" replace={true}/>
  }

  return <AuthTemplate 
    variant="register" 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    handleSendRequest={handleRegisterClick}
  />
}

export default RegisterPage;
