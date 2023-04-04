import type { Meta, StoryObj } from '@storybook/react';

import { PharAlert } from '@phar/core';

const meta: Meta<typeof PharAlert> = {
  title: 'Alert',
  component: PharAlert,
  argTypes: {
    open: {
      defaultValue: false,
      type: 'boolean',
    },
    children: {
      defaultValue: '',
      description: 'Receives a component or text to be displayed on the alert',
      type: 'string',
    },
    className: {
      type: 'string',
      defaultValue: 'alert',
      description: 'Defines a class for the component',
    },
    color: {
      type: 'string',
      defaultValue: 'info',
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Defines the color and theme of the alert',
    },
    onClose: {
      type: 'function',
      defaultValue: () => {},
      description: 'Define the function executed when the alert needs to close',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PharAlert>;

export const Default: Story = {
  args: {
    open: true,
    children: 'I am a dinosaur',
    className: '',
    color: 'warning',
    onClose: () => {},
  },
};
