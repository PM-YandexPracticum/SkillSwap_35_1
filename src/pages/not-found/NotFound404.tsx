import { useNavigate } from 'react-router-dom';
import styles from './not-found.module.scss';
import pageNotFound from './error-404.png';
import Button from '@ui/button/Button';

export const NotFoundPage = () => {
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
        <h1 className={styles.text_title}>Страница не найдена</h1>
        <p className={styles.text_subtitle}>
          К сожалению, эта страница недоступна. Вернитесь на главную страницу
          или попробуйте позже
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
