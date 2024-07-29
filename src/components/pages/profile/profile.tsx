import styles from './profile.module.css'
import Links from '../../profile/links';
import ProfileForm from './form';

const Profile = () => {
    return <div className={styles.profile_container}>
        <Links/>
        <ProfileForm/>
    </div>
}

export default Profile