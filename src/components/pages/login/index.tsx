import AuthTemplate from '../../auth-template/auth-template';

function LoginPage() {
  return <AuthTemplate variant="login" handleSendRequest={console.log}/>
}

export default LoginPage;
