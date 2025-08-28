import { useNavigate } from 'react-router-dom';
import styles from './not-found500.module.scss';
import pageNotFound from './error-500.png';
import Button from '@ui/button/Button';

export const NotFoundPage500 = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img alt='Страница не найдена' src={pageNotFound} />
      </div>

      <div className={styles.text}>
        <h1 className={styles.text_title}>На сервере произошла ошибкаа</h1>
        <p className={styles.text_subtitle}>
          Попробуйте позже или вернитесь на главную страницу
        </p>
      </div>

      <div className={styles.button}>
        <Button style={{ width: 218, height: 48 }} variant='secondary'>
          Сообщить об ошибке
        </Button>
        <Button
          style={{ width: 218, height: 48 }}
          variant='primary'
          onClick={handleGoHome}
        >
          На главную
        </Button>
      </div>
    </div>
  );
};
