import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromSelect: Story = {
  args: {
    className: 'role-select',
    type: 'role',
    optionList: ['admin', 'user'],
    changeFunc: () => {},
    hasLabel: true,
  },
};
