export type SkillDetailsProps = {
  title: string;
  subTitle: string;
  text: string;
  images: string[];
  isLiked: boolean;
  onExchangeClick: () => void;
  onLikeClick: () => void;
  onShareClick: () => void;
  onMoreClick: () => void;
}