import type { Meta, StoryObj } from '@storybook/react';

import { PharBadge, PharButton } from '@phar/core';

const meta: Meta<typeof PharBadge> = {
  title: 'Badge',
  component: PharBadge,
  argTypes: {
    children: {
      defaultValue: '',
      description: 'Receives a component for the badge to be attached',
      type: 'string',
    },
    color: {
      type: 'string',
      defaultValue: 'info',
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Defines the color and theme of the badge',
    },
    count: {
      type: 'number',
      defaultValue: 0,
      description: 'Defines the number to be displayed on the badge',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PharBadge>;

export const Default: Story = {
  args: {
    color: 'danger',
    count: 10,
    children: <PharButton>Shop</PharButton>
  },
};
