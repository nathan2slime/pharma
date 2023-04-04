import type { Meta, StoryObj } from '@storybook/react';

import { PharSelect } from '@phar/core';

const meta: Meta<typeof PharSelect> = {
  title: 'Select',
  component: PharSelect,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PharSelect>;

export const Default: Story = {
  args: {
    value: {
      title: 'Jhonathan',
      key: 'username',
    },
    open: false,
    options: [
      {
        key: 'username',
        title: 'Jhonathan',
      },
      {
        key: 'password',
        title: 'Password',
      },
    ],
  },
};
