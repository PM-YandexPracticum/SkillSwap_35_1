import type { OfferConfirmationProps } from './type';
import styles from './OfferConfirmation.module.scss';
import { Title } from '@ui/title';
import { Text } from '@ui/text';
import Button from '@ui/button/Button';

export const OfferConfirmation = ({
  icon,
  title,
  description,
  onEdit
}: OfferConfirmationProps) => {
  return (
    <div className={styles.container}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div  className={styles.main}>
        <Title tag='h3'>{title}</Title>
        <Text tag='p' size='main'>{description}</Text>
      </div>
      <Button style={{marginTop: 'auto'}} onClick={onEdit}>
        Готово
      </Button>
    </div>
  );
};
