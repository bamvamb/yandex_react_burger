import styles from './error.module.css'
interface IProps {
    children?: React.ReactNode;
    text?: string|null
}

const ErrorView:React.FC<IProps> = ({text, children}) => (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      {children}
    </div>
);

export default ErrorView