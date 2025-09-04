/* eslint-disable no-nested-ternary */
import { useRef } from 'react';
import {
  Controller,
  type Control,
  type UseFormSetValue
} from 'react-hook-form';
import type { SVGProps, JSX } from 'react';
import Avatar from '@ui/avatar/Avatar';
import GalleryEditIcon from '@icons/ui/gallery-edit.svg?react';
import type { PersonalInfoValues } from '../PersonalInfo';

interface AvatarUploaderProps {
  control: Control<PersonalInfoValues>;
  setValue: UseFormSetValue<PersonalInfoValues>;
}

const AvatarUploader = ({ control, setValue }: AvatarUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => inputRef.current?.click();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('image', e.target.files[0], { shouldDirty: true });
    }
  };

  return (
    <Controller
      name='image'
      control={control}
      render={({ field }) => {
        const avatarSrc =
          field.value instanceof File
            ? URL.createObjectURL(field.value)
            : typeof field.value === 'string'
              ? field.value
              : undefined;

        return (
          <>
            <Avatar
              src={avatarSrc}
              size='large'
              buttonIcon={
                GalleryEditIcon as (
                  props: SVGProps<SVGSVGElement>
                ) => JSX.Element
              }
              onButtonClick={handleAvatarClick}
            />
            <input
              type='file'
              ref={inputRef}
              style={{ display: 'none' }}
              accept='image/*'
              onChange={handleAvatarChange}
            />
          </>
        );
      }}
    />
  );
};

export default AvatarUploader;
