import React, { useRef, useState, useCallback } from 'react';
import { Text } from '@ui/text';
import type { ImageFile, ImageInputProps } from '@ui/image-input/types';
import Button from '@ui/button/Button';
import styles from './ImageInput.module.scss';
import IconUploadImage from '../../assets/icons/ui/gallery-add.svg?react';
import IconClose from '../../assets/icons/ui/cross.svg?react';

export const ImageInput: React.FC<ImageInputProps> = ({
  multiple = true,
  onFilesChange
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const newFiles: ImageFile[] = [];
      const filesArray = Array.from(files);

      filesArray.forEach((file) => {
        const preview = URL.createObjectURL(file);
        newFiles.push({ file, preview });
      });

      const updatedFiles = [...selectedFiles, ...newFiles];
      setSelectedFiles(updatedFiles);
      onFilesChange?.(updatedFiles.map((f) => f.file));
    },
    [selectedFiles, onFilesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const { files } = e.dataTransfer;
      handleFileSelect(files);
    },
    [handleFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
      if (e.target) e.target.value = '';
    },
    [handleFileSelect]
  );

  const removeFile = useCallback(
    (index: number) => {
      URL.revokeObjectURL(selectedFiles[index].preview);
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(newFiles);
      onFilesChange?.(newFiles.map((f) => f.file));
    },
    [selectedFiles, onFilesChange]
  );

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  React.useEffect(
    () => () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [selectedFiles]
  );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.container__upload} ${isDragging ? styles.dragging : ''} `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        onKeyDown={(e) => {
          // Добавляем обработку клавиш Enter и Space
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
        role='button'
        tabIndex={0}
        aria-label='Загрузить изображения'
      >
        <div className={styles.upload__content}>
          <Text size={'main'} tag={'p'} color={'tertiaryColorDark'}>
            Перетащите или выберите изображения навыка
          </Text>
          <div className={styles.upload__content__wrapper}>
            <IconUploadImage className={styles.upload__icon} />
            <Text tag={'p'} size={'main'} color={'accentColorDark'}>
              Выбрать изображения
            </Text>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type='file'
          multiple={multiple}
          onChange={handleInputChange}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className={styles.preview}>
          <Text tag={'p'} size={'main'} color={'mainColorText'}>
            Выбранные файлы:
          </Text>
          <div className={styles.preview__grid}>
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.file.name}-${file.file.size}`}
                className={styles.preview__items}
              >
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className={styles.preview__items_img}
                />
                <div className={styles.preview__items__text}>
                  <Text tag={'p'} size={'details'} color={'mainColorText'}>
                    {file.file.name}
                  </Text>
                </div>
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  aria-label='Удалить файл'
                >
                  <IconClose />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
