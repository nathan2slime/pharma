import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'MyComponent',
} as Meta;

const Template: Story<any> = args => <button {...args} />;

export const WithText = Template.bind({});
WithText.args = {
  text: 'Hello, world!',
};
