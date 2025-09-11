// src/features/auth/login/LoginForm/LoginForm.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from '../../../../app/providers/store/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../../../entities/user/model/user-slice/userSliсe';
import LoginInfo from '../info/LoginInfo';
import LoginDataForm from '../../LoginDataForm/LoginDataForm';
import loginSchema from './loginSchema';
import styles from './LoginForm.module.scss';

export interface TLoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<TLoginData>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { setError } = methods;

  const onSubmit = async (data: TLoginData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (err) {
      setError('password', {
        type: 'manual',
        message: 'Неправильные почта или пароль'
      });
    }
  };

  return (
    <div className={styles.registrationPage}>
      <FormProvider {...methods}>
        <form
          className={styles.container}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <LoginDataForm
            variant='auth'
            goToRegister={() =>
              navigate('/register', {
                state: { from: location.state?.from || '/' }
              })
            }
          />
        </form>
      </FormProvider>
      <LoginInfo />
    </div>
  );
};

export default LoginForm;
