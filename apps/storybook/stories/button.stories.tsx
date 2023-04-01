import type { Meta, StoryObj } from '@storybook/react';

import { PharButton } from '@phar/core';

const meta: Meta<typeof PharButton> = {
  title: 'Button',
  component: PharButton,
};

export default meta;

type Story = StoryObj<typeof PharButton>;

export const Default: Story = {
  args: {
    type: 'button',
    children: 'Basic',
    bold: 600,
  },
};
