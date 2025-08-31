/* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useRef } from 'react';
import { InputText, InputTextArea } from '@ui/input/Input';
import Button from '@ui/button/Button';
import { Text } from '@ui/text';
import skillCategories from '@lib/constants/skillCategories';
import { useFormContext, Controller } from 'react-hook-form';
import type { TFormData } from '../../RegistrationForm';
import styles from './StepThree.module.scss';

interface StepThreeProps {
  prevStep: () => void;
  onReady: () => void; // для последующего открытия модалки
}

const StepThree = ({ prevStep, onReady }: StepThreeProps) => {
  const { control, watch, setValue, trigger } = useFormContext<TFormData>();
  const selectedCategory = watch('can.category');

  // для последующей реализации загрузки картинки навыка, используется после добавления компонента

  // const inputRef = useRef<HTMLInputElement | null>(null);
  // const handleSkillImageClick = () => {
  //   inputRef.current?.click();
  // };

  // const handleSkillImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.[0]) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setValue('can.images', [reader.result as string], {
  //         shouldValidate: false
  //       });
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleNextStep = async () => {
    const fieldsToValidate = [
      'can.title',
      'can.category',
      'can.subcategory',
      'can.description'
    ] as const;
    const validationResults = await Promise.all(
      fieldsToValidate.map((field) => trigger(field))
    );

    if (validationResults.every(Boolean)) {
      // Можно открыть модальное окно
      if (onReady) onReady();
    }
  };

  return (
    <>
      <div className={styles.inputsWrapper}>
        {/* Название навыка */}
        <Controller
          name='can.title'
          control={control}
          render={({ field }) => (
            <InputText
              value={field.value}
              onChange={field.onChange}
              placeholder='Введите название вашего навыка'
              label='Название навыка'
            />
          )}
        />

        {/* Категория СЕЙЧАС ЗАГЛУШКА НУЖЕН КОМПОНЕНТ ВЫПАДАЮЩИЙ СПИСОК */}
        <label htmlFor='can-category'>Категория навыка</label>
        <Controller
          name='can.category'
          control={control}
          render={({ field }) => (
            <select
              id='can-category'
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                setValue('can.subcategory', '');
              }}
              style={{
                height: '42px',
                width: '100%'
              }}
            >
              <option value=''>Выберите категорию навыка</option>
              {Object.keys(skillCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        />

        {/* Подкатегория СЕЙЧАС ЗАГЛУШКА НУЖЕН КОМПОНЕНТ ВЫПАДАЮЩИЙ СПИСОК */}
        <label htmlFor='can-subcategory'>Подкатегория навыка</label>
        <Controller
          name='can.subcategory'
          control={control}
          render={({ field }) => (
            <select
              id='can-subcategory'
              value={field.value}
              onChange={field.onChange}
              disabled={!selectedCategory}
              style={{
                height: '42px',
                width: '100%'
              }}
            >
              <option value=''>Выберите подкатегорию навыка</option>
              {selectedCategory &&
                skillCategories[selectedCategory]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          )}
        />

        {/* Описание навыка */}
        <Controller
          name='can.description'
          control={control}
          render={({ field }) => (
            <InputTextArea
              value={field.value}
              onChange={field.onChange}
              placeholder='Коротко опишите, чему можете научить'
              label='Описание'
              rows={3}
              style={{ height: '96px' }}
            />
          )}
        />

        {/* Стоит заглушка в виде обычного инпута, нужен спец инпут для загрузки картинок */}
        <Controller
          name='can.images'
          control={control}
          render={({ field }) => (
            <InputTextArea
              value={field.value?.join(', ') ?? ''}
              onChange={(e) =>
                field.onChange([(e.target as HTMLTextAreaElement).value])
              }
              placeholder='Перетащите или выберите изображения навыка (необязательно)'
              rows={3}
              style={{ height: '96px' }}
            />
          )}
        />
      </div>

      <div className={styles.row}>
        <Button onClick={prevStep} variant='secondary'>
          <Text tag='span' size='main' align='center'>
            Назад
          </Text>
        </Button>
        <Button onClick={handleNextStep} htmlType='button'>
          <Text tag='span' size='main' align='center'>
            Далее
          </Text>
        </Button>
      </div>
    </>
  );
};

export default StepThree;
