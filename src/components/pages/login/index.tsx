import AuthTemplate, {IFormState} from '../../auth-template/auth-template';
import { getLSUserInfo, useLogInMutation } from '../../../services/apis/auth/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../services/hooks';
import { authError, authStarted, authSuccess, unauthorized } from '../../../services/slices/user/user';

function LoginPage() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [logIn, {data:response, error, isSuccess, isError, isLoading}] = useLogInMutation()

  const handleLogin = (data: IFormState) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const user = getLSUserInfo()
    if(user){
      dispatch(authSuccess(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if(isError){
      dispatch(authError())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
