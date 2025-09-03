export type SkillPreviewProps = {
  title: string;
  subTitle: string;
  text: string;
  images: string[];
  onEditClick?: () => void;
  onDoneClick?: () => void;
}