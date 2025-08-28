// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SkillDetailsProps = {
  title: string;
  subTitle: string;
  text: string;
  images: string[];
  isLiked?: boolean;
  variant: 'can' | 'want';
  onExchangeClick?: () => void;
  onLikeClick?: () => void;
  onShareClick?: () => void;
  onMoreClick?: () => void;
  onEditClick?: () => void;
  onDoneClick?: () => void;
};
