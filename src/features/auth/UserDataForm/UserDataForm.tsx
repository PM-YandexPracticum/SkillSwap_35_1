import React, { useRef, useState, useCallback } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import skillCategories from '@lib/constants/skillCategories';
import cities from '@lib/constants/cities';
import { genderOptions } from '@lib/constants/genders';
import { InputText } from '@ui/input/Input';
import Button from '@ui/button/Button';
import { Text } from '@ui/text';
import Dropdown from '@ui/dropDown/dropdown';
import DatePicker from '@ui/date-picker/datePicker';
import DefaultAvatar from '@icons/ui/user-circle.svg?react';
import AddAvatarIcon from '@icons/ui/plus-circle.svg?react';
import CalendarIcon from '@icons/ui/calendar.svg?react';
import useClickOutside from '../../../shared/hooks/useClickOutside';
import {
  updateCategories,
  updateSubcategories
} from '../../../utils/skillSelection';
import { formatDate } from '../../../utils/dateFormatter';
import type { TFormData } from '../registration/form/RegistrationForm';
import type { UserDataFormProps } from './types';
import styles from './UserDataForm.module.scss';

const AvatarIcon = () => <DefaultAvatar className={styles.avatarIcon} />;
const AddIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <AddAvatarIcon className={styles.avatarButtonIcon} {...props} />
);

const UserDataForm = ({ nextStep, prevStep }: UserDataFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { control, formState, trigger, setValue, setError, clearErrors } =
    useFormContext<TFormData>();
  const { errors } = formState;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useClickOutside(wrapperRef, () => setIsCalendarOpen(false));

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

  const handleNextStep = useCallback(async () => {
    const fieldsToValidate = [
      'name',
      'dateOfBirth',
      'gender',
      'city',
      'want'
    ] as const;
    const isValid = await trigger(fieldsToValidate);
    if (isValid) nextStep();
  }, [trigger, nextStep]);

  const imageFile = useWatch({ control, name: 'image' });

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
          {/* Дата рождения */}
          <Controller
            name='dateOfBirth'
            control={control}
            render={({ field }) => {
              const selectedDate = field.value
                ? new Date(field.value.split('.').reverse().join('-'))
                : undefined;

              return (
                <div className={styles.dateWrapper} ref={wrapperRef}>
                  <InputText
                    {...field}
                    placeholder='дд.мм.гггг'
                    label='Дата рождения'
                    status={errors.dateOfBirth ? 'error' : undefined}
                    message={errors.dateOfBirth?.message}
                    inputSize='full'
                    onClick={() => setIsCalendarOpen((prev) => !prev)}
                    value={field.value}
                    icon={<CalendarIcon />}
                    onIconClick={() => setIsCalendarOpen((prev) => !prev)}
                  />
                  {isCalendarOpen && (
                    <DatePicker
                      selectedDate={selectedDate}
                      onSelect={(date) => {
                        field.onChange(formatDate(date));
                      }}
                      onBack={() => {
                        field.onChange('');
                        setIsCalendarOpen(false);
                      }}
                      onSave={() => setIsCalendarOpen(false)}
                    />
                  )}
                </div>
              );
            }}
          />

          {/* Пол */}
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <Dropdown
                options={genderOptions}
                value={field.value || ''}
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
                placeholder='Выберите категорию'
                label='Категория навыка, которому хотите научиться'
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
                placeholder='Выберите подкатегорию'
                label='Подкатегория навыка, которому хотите научиться'
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
