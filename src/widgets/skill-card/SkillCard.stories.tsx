import type { Meta, StoryObj } from '@storybook/react';
import type { TSkill } from './types';
import { SkillCard } from './SkillCard';

const meta: Meta<typeof SkillCard> = {
    component: SkillCard,
};

export default meta;
type Story = StoryObj<typeof SkillCard>;

export const SelectStory: Story = {
  render: () => {
    const styles = {
      paddingTop: '50px',
      paddingBottom: '50px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fafafa',
    };

    const skillsToLearn: TSkill[] = [
      { name: 'Тайм-менеджмент', category: 'Бизнес и карьера' },
      { name: 'Медитация', category: 'Здоровье и лайфстайл' },
      { name: 'Скорочтение', category: 'Образование и развитие' },
      { name: 'Фотография', category: 'Творчество и искусство' },
    ];

    const userName = 'Маэстро';
    const userDetails = 'Санкт-петербург, 34 года';
    const userSkillCategory = 'Иностранные языки';
    const userSkillName = 'Английский язык';
    const userPhotoUrl = 'https://distribution.faceit-cdn.net/images/5c0cd4f9-1b09-4c0a-9061-7c2c0edd24cb.jpeg';

    return (
      <div style={styles}>
        <SkillCard
          userName={userName}
          userDetails={userDetails}
          userSkillCategory={userSkillCategory}
          userSkillName={userSkillName}
          userPhotoUrl={userPhotoUrl}
          skillsToLearn={skillsToLearn}
          onLikeClick={() => alert('Like clicked')}
          onDetailsClick={() => alert('Details clicked')}
        />
      </div>
    );
  },
};