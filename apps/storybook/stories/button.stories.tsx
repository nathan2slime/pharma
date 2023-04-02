import type { Meta, StoryObj } from '@storybook/react';

import { PharButton } from '@phar/core';

const meta: Meta<typeof PharButton> = {
  title: 'Button',
  component: PharButton,
  argTypes: {
    block: {
      defaultValue: false,
      description: 'Defines whether the button occupies all available space',
      type: 'boolean',
    },
    children: {
      defaultValue: '',
      description: 'Receives a component or text to be displayed on the button',
      type: 'string',
    },
    className: {
      type: 'string',
      defaultValue: 'input',
      description: 'Define a class for the component',
    },
    onClick: {
      type: 'function',
      defaultValue: () => {},
      description:
        'Define a function that runs every time the button is clicked',
    },
    variant: {
      defaultValue: 'solid',
      options: ['solid', 'outline'],
      type: 'string',
      control: { type: 'select' },
      description: 'Defines the input style',
    },
    disabled: {
      defaultValue: false,
      type: 'boolean',
      description: "Set a button's disabled state",
    },
    type: {
      type: 'string',
      defaultValue: 'button',
      description: 'Defines the button type',
    },
    bold: {
      description: 'Set the button font bold',
      defaultValue: 400,
      type: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PharButton>;

export const Default: Story = {
  args: {
    type: 'button',
    block: false,
    className: 'button',
    children: 'Basic',
    bold: 600,
    disabled: false,
    variant: 'solid',
    onClick: () => {},
  },
};
