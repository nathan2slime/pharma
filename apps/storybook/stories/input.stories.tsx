import type { Meta, StoryObj } from '@storybook/react';

import { PharInput } from '@phar/core';

const meta: Meta<typeof PharInput> = {
  title: 'Input',
  component: PharInput,
  argTypes: {
    variant: {
      defaultValue: 'solid',
      options: ['solid', 'outline'],
      type: 'string',
      control: { type: 'select' },
      description: 'Defines the input style',
    },
    block: {
      defaultValue: false,
      description: 'Defines whether the input occupies all available space',
      type: 'boolean',
    },
    error: {
      defaultValue: false,
      type: 'boolean',
      description: 'Defines whether the input has an invalid state',
    },
    type: {
      type: 'string',
      defaultValue: 'text',
      options: ['text', 'email', 'password'],
      control: { type: 'select' },
      description: 'Defines the input type',
    },
    placeholder: {
      type: 'string',
      defaultValue: 'text',
      description: 'Defines a placeholder to input',
    },
    value: {
      type: 'string',
      description: 'Sets the value of the input',
      defaultValue: '',
    },
    className: {
      type: 'string',
      defaultValue: 'input',
      description: 'Defines a class for the component',
    },
    helper: {
      description: 'Defines a help text for the input',
      type: 'string',
      defaultValue: '',
    },
    label: {
      description: 'Defines a label for the input',
      defaultValue: '',
      type: 'string',
    },
    onChange: {
      description:
        'Receives a function that receives the current value of the input and is executed every time the value of the input changes',
      defaultValue: () => {},
      type: 'function',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PharInput>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'email@example.com',
    block: false,
    error: false,
    type: 'password',
    helper: '',
    className: '',
    onChange: () => {},
    value: '',
    variant: 'solid',
  },
};
