import { useGetProfileQuery } from '../../../services/apis/auth';

function ProfilePage() {
  const {data, isLoading, isError} = useGetProfileQuery()

  if(isLoading) return <div>Данные о пользователе загружаются...</div>
  if(isError) return <div>Ошибка получения данных о пользователе</div>
  
  return data ? <div>
    <span>email: {data.user.email}</span>
    <span>name: {data.user.name}</span>
  </div> : null
}

export default ProfilePage;
