import AuthTemplate from '../../auth-template/auth-template';

function ForgotPasswordPage() {
  return <AuthTemplate variant="forgot-password" handleSendRequest={console.log}/>
}

export default ForgotPasswordPage;
