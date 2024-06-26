import AuthTemplate, {FormState} from '../../auth-template/auth-template';
import { getLSUserInfo, useLogInMutation } from '../../../services/apis/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authError, authStarted, authSuccess, unauthorized } from '../../../services/slices/user';

function LoginPage() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [logIn, {data:response, error, isSuccess, isError, isLoading}] = useLogInMutation()

  const handleLogin = (data: FormState) => {
    const {email, password} = data
    if(email && password){
      dispatch(authStarted())
      logIn({ email, password })
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
    const { from } = location.state || {from: {pathname: "/"}}
    return <Navigate to={from} replace={true}/>
  }

  return <AuthTemplate 
    variant="login" 
    requestState={{ response, isSuccess, isError, isLoading, error}} 
    handleSendRequest={handleLogin}
  />
}

export default LoginPage;
