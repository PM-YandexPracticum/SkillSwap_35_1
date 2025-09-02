import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from '../../../../app/providers/store/store';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../../entities/user/model/user-slice/userSliсe';
import LoginInfo from '../info/LoginInfo';
import LoginDataForm from '../../LoginDataForm/LoginDataForm';
import styles from './LoginForm.module.scss';

export interface TLoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm<TLoginData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: TLoginData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Ошибка при входе:', err);
    }
  };

  return (
    <div className={styles.registrationPage}>
      <FormProvider {...methods}>
        <form
          className={styles.container}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
            <LoginDataForm variant='auth' goToRegister={() => navigate('/register')} />
        </form>
      </FormProvider>
      <LoginInfo />
    </div>
  );
};

export default LoginForm;
