import AuthTemplate from '../../auth-template/auth-template';

function ForgotPasswordPage() {
  return <AuthTemplate variant="forgot-password" onButtonClick={console.log}/>
}

export default ForgotPasswordPage;
