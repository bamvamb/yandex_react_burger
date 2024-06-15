import AuthTemplate from '../../auth-template/auth-template';

function ResetPasswordPage() {
  return <AuthTemplate variant="reset-password" handleSendRequest={console.log}/>
}

export default ResetPasswordPage;
