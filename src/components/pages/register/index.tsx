import AuthTemplate, {FormState} from '../../auth-template/auth-template';
import { get_ls_user_info, useRegisterUserMutation } from '../../../services/apis/auth';
import { Navigate } from 'react-router-dom';
import { authError, authStarted, authSuccess, unauthorized } from '../../../services/slices/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function RegisterPage() {
  const dispatch = useDispatch()

  const [registerUser,{
      data:response, 
      error, 
      isSuccess, 
      isError, 
      isLoading
  }] = useRegisterUserMutation()

  const handleRegisterClick = (data:FormState) => {
    const {name, email, password} = data
    if(name && email && password){
      registerUser({ name, email, password })
      dispatch(authStarted())
    }
  }

  useEffect(() => {
    const user = get_ls_user_info()
    console.log(user)
    if(user){
      dispatch(authSuccess(user))
    } else {
      dispatch(unauthorized())
    }
  }, [])

  useEffect(() => {
    const user = get_ls_user_info()
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
