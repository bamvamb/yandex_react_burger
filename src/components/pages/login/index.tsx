import AuthTemplate from '../../auth-template/auth-template';

function LoginPage() {
  return <AuthTemplate variant="login" onButtonClick={console.log}/>
}

export default LoginPage;
