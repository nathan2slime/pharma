import type { Meta, StoryObj } from '@storybook/react';

import { PharButton, PharSearch, PharSelect } from '@phar/core';

const meta: Meta<typeof PharSearch> = {
  title: 'Search',
  component: PharSearch,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PharSearch>;

export const Default: Story = {
  args: {
    placeholder: 'Search',
    select: (
      <PharSelect
        options={[
          {
            key: 'key',
            title: 'Key',
          },
        ]}
        open={true}
        className="select"
        placeholder="Categoria"
      />
    ),
    value: '',
    onChange: () => {},
    button: (
      <PharButton>
        <i className="ri-search-line" />
      </PharButton>
    ),
  },
};
