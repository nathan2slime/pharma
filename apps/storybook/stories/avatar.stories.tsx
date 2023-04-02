import type { Meta, StoryObj } from '@storybook/react';

import { PharAvatar } from '@phar/core';

const meta: Meta<typeof PharAvatar> = {
  title: 'Avatar',
  component: PharAvatar,
  argTypes: {
    avatar: {
      type: 'string',
      defaultValue: '',
      description: 'Receives the path to the avatar image',
    },
    username: {
      type: 'string',
      defaultValue: '',
      description: 'Get the username',
    },
    isLoading: {
      type: 'boolean',
      defaultValue: '',
      description: 'Define if the component will have loaders',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PharAvatar>;

export const Default: Story = {
  args: {
    avatar:
      'https://kanto.legiaodosherois.com.br/w728-h381-gnw-cfill-gcc/wp-content/uploads/2022/10/legiao_LVpk_oR9IW17.jpg.webp',
    username: 'nathan3boss',
  },
};
