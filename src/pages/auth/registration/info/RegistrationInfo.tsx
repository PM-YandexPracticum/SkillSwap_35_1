import { Title } from '@ui/title';
import { Text } from '@ui/text';
import step1Img from '../../../../shared/assets/images/decorative/registration-step-1.png';
import step2Img from '../../../../shared/assets/images/decorative/registration-step-2.png';
import step3Img from '../../../../shared/assets/images/decorative/registration-step-3.png';
import styles from './RegistrationInfo.module.scss';
import { type RegistrationInfoProps } from './types';

const images: Record<number, string> = {
  1: step1Img,
  2: step2Img,
  3: step3Img
};

const stepDescription: Record<number, { title: string; text: string }> = {
  1: {
    title: 'Добро пожаловать в SkillSwap!',
    text: 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'
  },
  2: {
    title: 'Расскажите немного о себе',
    text: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена'
  },
  3: {
    title: 'Укажите, чем вы готовы поделиться',
    text: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!'
  }
};

const RegistrationInfo = ({ step }: RegistrationInfoProps) => (
  <div className={styles.container}>
    <img
      className={styles.image}
      src={images[step]}
      alt={stepDescription[step].title}
    />
    <div className={styles.textWrapper}>
      <Title as='h3' align='center'>
        {stepDescription[step].title}
      </Title>
      <Text as='p' size='main' align='center'>
        {stepDescription[step].text}
      </Text>
    </div>
  </div>
);

export default RegistrationInfo;
