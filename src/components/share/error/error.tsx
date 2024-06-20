import { Children } from 'react';
import styles from './error.module.css'
interface Props {
    children?: React.ReactNode;
    text?: string
}

const ErrorView:React.FC<Props> = ({text, children}) => (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      {children}
    </div>
);

export default ErrorView