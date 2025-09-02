import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUser } from '../../../entities/user/model/user-slice/userSlice';
import type { IRegisterData } from '../../../features/auth/types/types';

import SkillDataForm from '../../../features/auth/SkillDataForm/SkillDataForm';
import registrationSchema from '../../../features/auth/registration/form/registrationSchema';

import styles from './UserSkillsForm.module.scss';

const UserSkillsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserData);

  const methods = useForm<IRegisterData>({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      want: user?.want ?? [],
      can: user?.can ?? {
        category: '',
        subcategory: '',
        title: '',
        description: '',
        images: []
      }
    }
  });

  useEffect(() => {
    if (user) {
      methods.reset({
        want: user.want ?? [],
        can: user.can ?? {
          category: '',
          subcategory: '',
          title: '',
          description: '',
          images: []
        }
      });
    }
  }, [user, methods]);

  const onSubmit = async (data: IRegisterData) => {
    try {
      await dispatch(updateUser(data)).unwrap();
      // TODO: уведомление "Данные обновлены"
    } catch (err) {
      console.error('Ошибка при обновлении данных:', err);
    }
  };

  return (
    <div className={styles.page}>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Оставляем только форму с навыками */}
          <SkillDataForm />
        </form>
      </FormProvider>
    </div>
  );
};

export default UserSkillsForm;
