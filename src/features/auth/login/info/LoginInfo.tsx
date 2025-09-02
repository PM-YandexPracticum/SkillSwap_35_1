import { Title } from '@ui/title';
import { Text } from '@ui/text';
import Image from '../../../../shared/assets/images/decorative/registration-step-1.png';
import styles from './LoginInfo.module.scss';

const LoginInfo = () => (
  <div className={styles.container}>
    <img
      className={styles.image}
      src={Image}
      alt='С возвращением в SkillSwap!'
    />
    <div className={styles.textWrapper}>
      <Title tag='h3' align='center'>
        С возвращением в SkillSwap!
      </Title>
      <Text tag='p' size='main' align='center'>
        Обменивайтесь знаниями и навыками с другими людьми
      </Text>
    </div>
  </div>
);

export default LoginInfo;
