import { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { type TFormData } from '../../pages/auth/registration/form/RegistrationForm';

// Проверка валидности шага
export const useStepValidation = (fields: (keyof TFormData)[]) => {
  const { trigger } = useFormContext<TFormData>();
  const validateStep = async () => {
    const results = await Promise.all(fields.map((f) => trigger(f)));
    return results.every(Boolean);
  };
  return validateStep;
};

// Загрузка файлов
export const useFileUpload = (field: keyof TFormData) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setValue } = useFormContext<TFormData>();

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(field, reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return { inputRef, handleClick, handleChange };
};

// Показ/скрытие пароля
export const usePasswordToggle = () => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prev) => !prev);
  return { show, toggle };
};

// Выбор категории и подкатегории
export const useCategorySelect = (
  categoryField: keyof TFormData,
  subField: keyof TFormData
) => {
  const { watch, setValue } = useFormContext<TFormData>();
  const selectedCategory = watch(categoryField);
  const handleCategoryChange = (value: string) => {
    setValue(categoryField, value);
    setValue(subField, '');
  };
  return { selectedCategory, handleCategoryChange };
};
