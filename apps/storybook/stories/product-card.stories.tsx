import type { Meta, StoryObj } from '@storybook/react';

import { PharProductCard } from '@phar/core';

const meta: Meta<typeof PharProductCard> = {
  title: 'Product Card',
  component: PharProductCard,
  argTypes: {
    price: {
      defaultValue: '0',
      description: 'Defines the price of the product',
      type: 'string',
    },
    thumb: {
      type: 'string',
      defaultValue: '',
      description: 'Set product image cover',
    },
    name: {
      type: 'string',
      defaultValue: '',
      description: 'Set the product name',
    },
  },
};

export default meta;

type Story = StoryObj<typeof PharProductCard>;

export const Default: Story = {
  args: {
    name: 'Product',
    isLoading: true,
    price: '239.02',
    thumb:
      'https://a-static.mlcdn.com.br/280x210/jeep-eletrico-infantil-amarelo-bandeirante-jeep-wrang-com-controle-remoto-2-marchas/magazineluiza/230425600/aa95104dc9681055fd95bafafcddc3ca.jpg',
  },
};
