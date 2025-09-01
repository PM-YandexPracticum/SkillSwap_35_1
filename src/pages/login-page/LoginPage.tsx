import styles from '../../shared/layouts/centered-layout/CenteredLayout.module.scss';
import LoginForm from '../../features/auth/login/form/LoginForm';

export const LoginPage = () => (
  <div className={styles.page}>
    <LoginForm />
  </div>
);