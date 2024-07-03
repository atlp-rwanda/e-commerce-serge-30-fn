import { Loading, LoadingProps } from '../../utils/Loading';

export default {
  title: 'utils/Loading',
  component: Loading,
};

const Template = (args: LoadingProps) => <Loading {...args} />;

export const Primary = Template.bind({});
