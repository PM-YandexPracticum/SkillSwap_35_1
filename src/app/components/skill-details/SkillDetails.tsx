import styles from './SkillDetails.module.scss'
import IconLike from '@icons/ui/like.svg?react';
import IconShare from '@icons/ui/share.svg?react';
import IconMore from '@icons/ui/more-square.svg?react';
import { Title } from '@ui/title';
import { Text } from '@ui/text';
import Button from '@ui/button/Button';

export const SkillDetails = () => {
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <IconLike />
        <IconShare />
        <IconMore />
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          <Title as='h2'>Игра на барабанах</Title>
          <Text as='p' size='details' color='tertiaryColorDark'>Творчество и искусство / Музыка и звук</Text>
          <div className={styles.text}>
            <Text as='p' size='main'>
              Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры            
            </Text>
          </div>
          <Button style={{ marginTop: 'auto' }}>Предложить обмен</Button>
        </div>
        <div className={styles.images}>

        </div>
      </div>
    </div>
  );
}