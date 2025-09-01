import { useFormContext, Controller } from 'react-hook-form';
import { InputText, InputTextArea } from '@ui/input/Input';
import Button from '@ui/button/Button';
import Dropdown from '@ui/dropDown/dropdown';
import ImageInput from '@ui/image-input/ImageInput';
import { Text } from '@ui/text';
import skillCategories from '@lib/constants/skillCategories';
import type { TFormData } from '../registration/form/RegistrationForm';
import type { SkillDataFormProps } from './types';
import styles from './SkillDataForm.module.scss';

const SkillDataForm = ({ prevStep }: SkillDataFormProps) => {
  const { control, watch, setValue, formState } = useFormContext<TFormData>();
  const selectedCategory = watch('can.category');
  const { errors } = formState;

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
              status={errors.can?.title ? 'error' : undefined}
              message={errors.can?.title?.message}
            />
          )}
        />

        {/* Категория навыка */}
        <Controller
          name='can.category'
          control={control}
          rules={{ required: 'Выберите категорию' }}
          render={({ field }) => (
            <Dropdown
              options={Object.keys(skillCategories).map((cat) => ({
                label: cat,
                value: cat
              }))}
              value={field.value || ''}
              placeholder='Выберите категорию'
              label='Категория навыка'
              error={errors.can?.category?.message ?? ''}
              onChange={(val) => {
                field.onChange(val);
                setValue('can.subcategory', '');
              }}
            />
          )}
        />

        {/* Подкатегория навыка */}
        <Controller
          name='can.subcategory'
          control={control}
          render={({ field }) => {
            const chosenCategory = watch('can.category');
            const options = chosenCategory
              ? skillCategories[selectedCategory].map((sub) => ({
                  label: sub,
                  value: sub
                }))
              : [];

            return (
              <Dropdown
                options={options}
                value={field.value || ''}
                placeholder='Выберите подкатегорию'
                label='Подкатегория навыка'
                error={errors.can?.subcategory?.message ?? ''}
                onChange={field.onChange}
              />
            );
          }}
        />

        {/* Описание навыка */}
        <Controller
          name='can.description'
          control={control}
          render={({ field }) => (
            <InputTextArea
              value={field.value}
              onChange={field.onChange}
              status={errors.can?.description ? 'error' : undefined}
              message={errors.can?.description?.message}
              placeholder='Коротко опишите, чему можете научить'
              label='Описание'
              rows={3}
              style={{ height: '96px' }}
            />
          )}
        />

        {/* Загрузка картинок навыка */}
        <Controller
          name='can.images'
          control={control}
          render={({ field }) => (
            <ImageInput
              multiple
              onFilesChange={(files) => field.onChange(files)}
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
        <Button htmlType='submit'>
          <Text tag='span' size='main' align='center'>
            Продолжить
          </Text>
        </Button>
      </div>
    </>
  );
};

export default SkillDataForm;
