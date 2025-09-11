import { useRef, useState } from 'react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { InputText, InputTextArea } from '@ui/input/Input';
import Dropdown from '@ui/dropDown/dropdown';
import DatePicker from '@ui/date-picker/datePicker';
import CalendarIcon from '@icons/ui/calendar.svg?react';
import InputEditIcon from '@icons/ui/edit.svg?react';
import useClickOutside from '../../../../shared/hooks/useClickOutside';
import { formatDate } from '../../../../utils/dateFormatter';
import type { PersonalInfoValues } from '../PersonalInfo';
import styles from './PersolalInfoFields.module.scss';

interface PersonalInfoFieldsProps {
  control: Control<PersonalInfoValues>;
  errors: FieldErrors<PersonalInfoValues>;
  genderOptions: { label: string; value: string }[];
  cities: readonly string[];
}

const PersonalInfoFields = ({
  control,
  errors,
  genderOptions,
  cities
}: PersonalInfoFieldsProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);
  useClickOutside(dateRef, () => setIsCalendarOpen(false));

  return (
    <>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            label='Имя'
            status={errors.name ? 'error' : undefined}
            message={errors.name?.message}
            inputSize='full'
            icon={<InputEditIcon />}
          />
        )}
      />

      <div className={styles.row}>
        <Controller
          name='dateOfBirth'
          control={control}
          render={({ field }) => {
            const selectedDate = field.value
              ? new Date(field.value.split('.').reverse().join('-'))
              : undefined;

            return (
              <div className={styles.dateWrapper} ref={dateRef}>
                <InputText
                  {...field}
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
                    onSelect={(date) => field.onChange(formatDate(date))}
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

      <Controller
        name='about'
        control={control}
        render={({ field }) => (
          <InputTextArea
            value={field.value || ''}
            onChange={field.onChange}
            status={errors.about ? 'error' : undefined}
            message={errors.about?.message}
            inputSize='full'
            label='О себе'
            rows={4}
            style={{ height: '116px' }}
            icon={<InputEditIcon />}
          />
        )}
      />
    </>
  );
};

export default PersonalInfoFields;
