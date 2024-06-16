import styles from './profile.module.css'
import Links from './links';
import Inputs from './inputs';

const Profile = () => {
    return <div className={styles.profile_container}>
        <Links/>
        <Inputs/>
    </div>
}

export default Profile