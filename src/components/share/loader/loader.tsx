import styles from './loader.module.css'

interface IProps {
    children?: React.ReactNode;
    text?: string|null
}

const Loader:React.FC<IProps> = ({children, text}) => (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      {text && <p className={styles.text}>{text}</p>}
      {children}
    </div>
)

export default Loader


