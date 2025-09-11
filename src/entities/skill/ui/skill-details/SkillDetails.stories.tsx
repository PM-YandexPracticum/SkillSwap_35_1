import type { Meta, StoryObj } from '@storybook/react';
import { SkillDetails } from './SkillDetails';
import { useState } from 'react';

const meta: Meta<typeof SkillDetails> = {
    component: SkillDetails,
};

export default meta;
type Story = StoryObj<typeof SkillDetails>;

export const SelectStory: Story = {
  render: () => {
    const [isLiked, setIsLiked] = useState(false);

    const styles = {
      paddingTop: '50px',
      paddingBottom: '50px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
    };

    const text = 'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры';
    const subTitle = 'Творчество и искусство / Музыка и звук';
    const images = [
      'https://avatars.mds.yandex.net/i?id=def217cbd781a0aba03b4fd3bd5df67567cd1e6b-5309142-images-thumbs&n=13',
      'https://avatars.mds.yandex.net/i?id=1d29546e1ee41c08e04134e2030ad0ac90e21e3a-5699445-images-thumbs&n=13',
      'https://avatars.mds.yandex.net/i?id=4c29ef1e348ae4247a8ee4dd9909852470d365c3-16403192-images-thumbs&n=13',
      'https://avatars.mds.yandex.net/i?id=031e16ffecd0ba4cc0b521ed50cd437d947a9c54-4438551-images-thumbs&n=13',
      'https://avatars.mds.yandex.net/i?id=2be283817200af1fae06ba28089beb656107b11f-6367247-images-thumbs&n=13',
      'https://avatars.mds.yandex.net/i?id=a544e8e61777043cd6f9e70aa5318d4e16750964-6579542-images-thumbs&n=13', 
    ];

    return (
      <div style={styles}>
        <SkillDetails
          variant="want"
          images={images}
          subTitle={subTitle}
          title='Игра на барабанах'
          text={text}
          isLiked={isLiked}
          onExchangeClick={() => alert('Exchange clicked')}
          onLikeClick={() => setIsLiked(!isLiked)}
          onShareClick={() => alert('Share click')}
          onMoreClick={() => alert('More click')}
        />
      </div>
    );
  },
};