import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../app/components/atoms/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Orange: Story = {
  args: {
    className: '',
    value: 'Login',
  },
};
