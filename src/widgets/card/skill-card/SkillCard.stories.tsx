import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillCard } from './SkillCard';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof SkillCard> = {
  component: SkillCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  render: ({ ...args }) => {
    const styles = {
      paddingTop: '50px',
      paddingBottom: '50px',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fafafa'
    };
    return (
      <div style={styles}>
        <SkillCard
          {...args}
        />
      </div>
    );
  }
};

export default meta;
type Story = StoryObj<typeof SkillCard>;

export const DefaultState: Story = {
  args: {
    skillsToLearn: [
      { subcategory: 'Тайм-менеджмент', category: 'Бизнес и карьера' },
      { subcategory: 'Медитация', category: 'Здоровье и лайфстайл' },
      { subcategory: 'Скорочтение', category: 'Образование и развитие' },
      { subcategory: 'Фотография', category: 'Творчество и искусство' }
    ],

    userName: 'Маэстро',
    userCity: 'Санкт-Петербург',
    userDateofBirth: '1988-07-14',
    userSkillCategory: 'Иностранные языки',
    userSkillName: 'Английский язык',
    userPhotoUrl:
      'https://distribution.faceit-cdn.net/images/5c0cd4f9-1b09-4c0a-9061-7c2c0edd24cb.jpeg'
  }
};

export const WithDescription: Story = {
  args: {
    ...DefaultState.args,
    userAbout:
      'Великий маэстро всея Руси. Пришел исключительно учить, потому что уже все умею.'
  }
};
