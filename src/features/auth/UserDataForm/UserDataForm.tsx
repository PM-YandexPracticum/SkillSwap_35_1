import React, { useRef } from 'react';
import DefaultAvatar from '@icons/ui/user-circle.svg?react';
import AddAvatarIcon from '@icons/ui/plus-circle.svg?react';
import { InputText } from '@ui/input/Input';
import Button from '@ui/button/Button';
import { Text } from '@ui/text';
import skillCategories from '@lib/constants/skillCategories';
import { useFormContext, Controller } from 'react-hook-form';
import Dropdown from '@ui/dropDown/dropdown';
import cities from '@lib/constants/cities';
import { genderOptions } from '@lib/constants/genders';
import styles from './UserDataForm.module.scss';
import type { TFormData } from '../registration/form/RegistrationForm';
import {
  updateCategories,
  updateSubcategories
} from '../../../utils/skillSelection';

interface UserDataFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AvatarIcon = () => <DefaultAvatar className={styles.avatarIcon} />;
const AddIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <AddAvatarIcon className={styles.avatarButtonIcon} {...props} />
);

const UserDataForm = ({ nextStep, prevStep }: UserDataFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    control,
    formState,
    trigger,
    setValue,
    watch,
    setError,
    clearErrors
  } = useFormContext<TFormData>();
  const { errors } = formState;

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      file.size > 5 * 1024 * 1024 ||
      !['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
    ) {
      setError('image', {
        type: 'manual',
        message: 'Неверный формат или слишком большой файл (макс 5 МБ)'
      });
      return;
    }

    clearErrors('image');
    setValue('image', file);
  };

  const handleNextStep = async () => {
    const fieldsToValidate = [
      'name',
      'dateOfBirth',
      'gender',
      'city',
      'want'
    ] as const;
    const validationResults = await Promise.all(
      fieldsToValidate.map((field) => trigger(field))
    );

    if (validationResults.every((result) => result)) {
      nextStep();
    }
  };

  const imageFile = watch('image');

  return (
    <>
      <div className={styles.inputsWrapper}>
        {/* Загрузка аватара */}
        <div className={styles.avatarWrapper}>
          {imageFile instanceof File ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt='Аватар'
              className={styles.avatarIcon}
            />
          ) : (
            <AvatarIcon />
          )}
          <AddIcon onClick={handleAvatarClick} />
          <input
            type='file'
            accept='image/png, image/jpeg, image/jpg'
            ref={inputRef}
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Имя */}
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              placeholder='Введите ваше имя'
              label='Имя'
              status={errors.name ? 'error' : undefined}
              message={errors.name?.message}
            />
          )}
        />

        <div className={styles.row}>
          {/* Дата рождения - СЕЙЧАС ЗАГЛУШКА НУЖЕН СПЕЦ ИНПУТ ДАТЫ */}
          <Controller
            name='dateOfBirth'
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder='дд.мм.гггг'
                label='Дата рождения'
                status={errors.dateOfBirth ? 'error' : undefined}
                message={errors.dateOfBirth?.message}
                style={{ width: 206 }}
              />
            )}
          />

          {/* Пол */}
          <Controller
            name='gender'
            control={control}
            rules={{ required: 'Пол обязателен' }}
            render={({ field }) => (
              <Dropdown
                options={genderOptions}
                value={field.value}
                placeholder='Не указан'
                label='Пол'
                error={errors.gender?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Город */}
        <Controller
          name='city'
          control={control}
          rules={{ required: 'Город обязателен' }}
          render={({ field }) => (
            <Dropdown
              options={cities.map((city) => ({ label: city, value: city }))}
              value={field.value || ''}
              placeholder='Не указан'
              label='Город'
              error={errors.city?.message}
              onChange={field.onChange}
            />
          )}
        />

        {/* Категория навыка */}
        <Controller
          name='want'
          control={control}
          rules={{ required: 'Выберите хотя бы одну категорию' }}
          render={({ field }) => {
            const selectedCategories =
              field.value?.map((item: any) => item.category) || [];

            return (
              <Dropdown
                options={Object.keys(skillCategories).map((cat) => ({
                  label: cat,
                  value: cat
                }))}
                value={selectedCategories}
                placeholder='Выберите категории'
                label='Категории навыков'
                multiple
                error={errors.want?.message}
                onChange={(vals) => {
                  const newVals = updateCategories(
                    Array.isArray(vals) ? vals : [vals],
                    field.value || []
                  );
                  field.onChange(newVals);
                }}
              />
            );
          }}
        />

        {/* Подкатегория навыка */}
        <Controller
          name='want'
          control={control}
          render={({ field }) => {
            const selectedCategories = field.value || [];

            const options = Array.from(
              new Set(
                selectedCategories.flatMap(
                  (item) => skillCategories[item.category] || []
                )
              )
            ).map((sub) => ({ label: sub, value: sub }));

            const selectedValues = selectedCategories
              .map((item) => item.subcategory)
              .filter(Boolean);

            return (
              <Dropdown
                options={options}
                value={selectedValues}
                placeholder='Выберите подкатегории'
                label='Подкатегории навыков'
                multiple
                error={errors.want?.message}
                onChange={(vals) => {
                  const newVals = updateSubcategories(
                    Array.isArray(vals) ? vals : [vals],
                    field.value || [],
                    skillCategories
                  );
                  field.onChange(newVals);
                }}
              />
            );
          }}
        />
      </div>

      <div className={styles.row}>
        <Button onClick={prevStep} variant='secondary'>
          <Text tag='span' size='main' align='center'>
            Назад
          </Text>
        </Button>
        <Button onClick={handleNextStep}>
          <Text tag='span' size='main' align='center'>
            Продолжить
          </Text>
        </Button>
      </div>
    </>
  );
};

export default UserDataForm;
