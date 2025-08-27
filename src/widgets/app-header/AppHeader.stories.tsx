import { type Meta, type StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { type IUser } from "src/entities/user/model/types/types";
import { AppHeader } from './AppHeader';

const currentUser = {
  name: 'User',
  image: 'https://i.pravatar.cc/40'
} as IUser;

const meta: Meta<typeof AppHeader> = {
  title: 'App/Components/AppHeader',
  component: AppHeader,
  decorators: [
    (Story, { parameters }) => (
      <div
        style={{
          width: '1440px'
        }}
      >
        <MemoryRouter
          initialEntries={parameters?.reactRouter?.initialEntries || ['/']}
        >
          <Routes>
            <Route path='*' element={<Story />} />
          </Routes>
        </MemoryRouter>
      </div>
    )
  ],
  argTypes: {
    user: {
      control: 'object',
      description: 'Данные текущего пользователя (имя и аватар)'
    }
  }
};

export default meta;

type Story = StoryObj<typeof AppHeader>;

export const HeaderGuest: Story = {
  args: {
    user: undefined
  }
};

export const HeaderLoggedIn: Story = {
  args: {
    user: currentUser
  }
};

export const HeaderRegistration: Story = {
  args: {
    user: undefined,
    isRegistrationHeader: true
  },
  parameters: {
    reactRouter: {
      initialEntries: ['/register']
    }
  }
};
