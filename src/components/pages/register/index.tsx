import AuthTemplate from '../../auth-template/auth-template';

function RegisterPage() {
  return <AuthTemplate variant="register" onButtonClick={console.log}/>
}

export default RegisterPage;
