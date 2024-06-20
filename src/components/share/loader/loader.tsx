import styles from './loader.module.css'

interface Props {
    children?: React.ReactNode;
    text?: string
}

const Loader:React.FC<Props> = ({children, text}) => (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      {text && <p className={styles.text}>{text}</p>}
      {children}
    </div>
)

export default Loader


