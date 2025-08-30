export interface ImageFile {
  file: File;
  preview: string;
}

export interface ImageInputProps {
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
}
