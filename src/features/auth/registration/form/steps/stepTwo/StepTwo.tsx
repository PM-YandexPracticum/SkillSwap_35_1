/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import DefaultAvatar from '@icons/ui/user-circle.svg?react';
import AddAvatarIcon from '@icons/ui/plus-circle.svg?react';
import { InputText } from '@ui/input/Input';
import Button from '@ui/button/Button';
import { Text } from '@ui/text';
import skillCategories from '@lib/constants/skillCategories';
import { useFormContext, Controller } from 'react-hook-form';
import styles from './StepTwo.module.scss';
import type { TFormData } from '../../RegistrationForm';

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AvatarIcon = () => <DefaultAvatar className={styles.avatarIcon} />;
const AddIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <AddAvatarIcon
    className={styles.avatarButtonIcon}
    {...props}
  />
);

const StepTwo = ({ nextStep, prevStep }: StepTwoProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { control, formState, trigger, setValue, watch } =
    useFormContext<TFormData>();
  const { errors } = formState;

  const handleAvatarClick = () => {
    inputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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

  const selectedCategory = watch('want.0.category');

  return (
    <>
      <div className={styles.inputsWrapper}>
        {/* Загрузка аватара */}
        <div className={styles.avatarWrapper}>
          <AvatarIcon />
          <AddIcon onClick={handleAvatarClick} />
          <input
            type='file'
            accept='image/*'
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

          {/* Пол СЕЙЧАС ЗАГЛУШКА НУЖЕН КОМПОНЕНТ ВЫПАДАЮЩИЙ СПИСОК */}
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder='Не указан'
                label='Пол'
                status={errors.gender ? 'error' : undefined}
                message={errors.gender?.message}
                style={{ width: 206 }}
              />
            )}
          />
        </div>

        {/* Город СЕЙЧАС ЗАГЛУШКА НУЖЕН КОМПОНЕНТ ВЫПАДАЮЩИЙ СПИСОК */}
        <Controller
          name='city'
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              placeholder='Не указан'
              label='Город'
              status={errors.city ? 'error' : undefined}
              message={errors.city?.message}
            />
          )}
        />

        {/* Категория навыка  СЕЙЧАС ЗАГЛУШКА НУЖЕН КОМПОНЕНТ ВЫПАДАЮЩИЙ СПИСОК */}
        <label htmlFor='want-category' style={{ fontSize: '18px' }}>
          Категория навыка, которому хотите научиться
        </label>
        <Controller
          name='want.0.category'
          control={control}
          render={({ field }) => (
            <select
              style={{
                height: '42px',
                width: '100%',
                border: errors.want?.[0]?.category ? '1px solid red' : undefined
              }}
              id='want-category'
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setValue('want.0.subcategory', '');
              }}
            >
              <option value=''>Выберите категорию</option>
              {Object.keys(skillCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        />
        {errors.want?.[0]?.category && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {errors.want[0].category.message}
          </span>
        )}

        {/* Подкатегория навыка СЕЙЧАС ЗАГЛУШКА НУЖЕН КОМПОНЕНТ ВЫПАДАЮЩИЙ СПИСОК */}
        <label htmlFor='want-subcategory' style={{ fontSize: '18px' }}>
          Подкатегория навыка, который хотите изучить
        </label>
        <Controller
          name='want.0.subcategory'
          control={control}
          render={({ field }) => (
            <select
              style={{
                height: '42px',
                width: '100%',
                border: errors.want?.[0]?.subcategory
                  ? '1px solid red'
                  : undefined
              }}
              id='want-subcategory'
              {...field}
              disabled={!selectedCategory}
            >
              <option value=''>Выберите подкатегорию</option>
              {selectedCategory &&
                skillCategories[selectedCategory]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          )}
        />
        {errors.want?.[0]?.subcategory && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {errors.want[0].subcategory.message}
          </span>
        )}
      </div>

      <div className={styles.row}>
        <Button onClick={prevStep} variant='secondary'>
          <Text as='span' size='main' align='center'>
            Назад
          </Text>
        </Button>
        <Button onClick={handleNextStep}>
          <Text as='span' size='main' align='center'>
            Продолжить
          </Text>
        </Button>
      </div>
    </>
  );
};

export default StepTwo;
