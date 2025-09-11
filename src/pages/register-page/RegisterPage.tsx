import styles from '../../shared/layouts/centered-layout/CenteredLayout.module.scss';
import RegistrationForm from '../../features/auth/registration/form/RegistrationForm';

export const RegisterPage = () => (
  <div className={styles.page}>
    <RegistrationForm />
  </div>
);