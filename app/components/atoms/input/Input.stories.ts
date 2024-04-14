import { Inter } from 'next/font/google';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormInput: Story = {
  args: {
    hasLabel: true,
    labelText: 'EMAIL',
    changeFunc: () => {},
    type: 'email',
    placeholder: 'Insert email',
    className: 'input',
    required: true,
  },
};
