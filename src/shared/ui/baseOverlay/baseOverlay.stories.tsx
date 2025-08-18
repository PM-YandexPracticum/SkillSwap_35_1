import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, createElement } from 'react';
import BaseOverlay from './baseOverlay';

const meta: Meta<typeof BaseOverlay> = {
  title: 'Shared/BaseOverlay',
  component: BaseOverlay
};

export default meta;

type Story = StoryObj<typeof BaseOverlay>;

export const Default: Story = {
  render: () =>
    createElement(() => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div>
          <button type='button' onClick={() => setIsOpen(true)}>
            Открыть Overlay
          </button>
          <BaseOverlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div style={{ padding: '24px', width: '320px' }}>
              <h2 style={{ marginBottom: '12px' }}>Модалка</h2>
              <p>Это содержимое overlay.</p>
              <button type='button' onClick={() => setIsOpen(false)}>
                Закрыть
              </button>
            </div>
          </BaseOverlay>
        </div>
      );
    })
};
